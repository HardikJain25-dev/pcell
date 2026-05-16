import { NextResponse } from "next/server";
import { drivesDb } from "@/lib/db-drives";
import { nanoid } from "nanoid";
import { Drive, Company } from "@/types/drive";

const normalize = (v: any) =>
  v === undefined || v === null || v === "" ? null : v;

async function getDriveWithCompanies(driveId: string): Promise<Drive | null> {
  const driveResult = await drivesDb.execute({
    sql: `SELECT * FROM drives WHERE id = ?`,
    args: [driveId],
  });

  if (driveResult.rows.length === 0) return null;

  const driveRow = driveResult.rows[0];
  
  const companiesResult = await drivesDb.execute({
    sql: `SELECT * FROM drive_companies WHERE drive_id = ?`,
    args: [driveId],
  });

  const companies: Company[] = companiesResult.rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    logoUrl: row.logo_url ? String(row.logo_url) : null,
    logoImage: row.logo_image ? String(row.logo_image) : null,
  }));

  return {
    id: String(driveRow.id),
    title: String(driveRow.title),
    description: driveRow.description ? String(driveRow.description) : null,
    startDate: String(driveRow.start_date),
    endDate: String(driveRow.end_date),
    location: driveRow.location ? String(driveRow.location) : null,
    type: String(driveRow.type) as Drive["type"],
    status: String(driveRow.status) as Drive["status"],
    imageUrl: driveRow.image_url ? String(driveRow.image_url) : null,
    registrationLink: driveRow.registration_link ? String(driveRow.registration_link) : null,
    companies,
    createdAt: String(driveRow.created_at),
    updatedAt: String(driveRow.updated_at),
  };
}

/* =========================
    GET — list all drives
======================= */
export async function GET() {
  try {
    const drivesResult = await drivesDb.execute(`
      SELECT * FROM drives 
      ORDER BY start_date DESC
    `);

    const drives: Drive[] = [];

    for (const driveRow of drivesResult.rows) {
      const drive = await getDriveWithCompanies(String(driveRow.id));
      if (drive) drives.push(drive);
    }

    return NextResponse.json(drives);
   } catch (err) {
     // Return empty array instead of error to prevent crashing the UI
     return NextResponse.json([]);
   }
}

/* =========================
    POST — create new drive
======================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const driveId = nanoid();
    const now = new Date().toISOString();

    // Insert drive
    await drivesDb.execute({
      sql: `
        INSERT INTO drives (
          id, title, description, start_date, end_date, location,
          type, status, image_url, registration_link, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        driveId,
        body.title,
        normalize(body.description),
        body.startDate,
        body.endDate,
        normalize(body.location),
        body.type || "placement",
        body.status || "upcoming",
        normalize(body.imageUrl),
        normalize(body.registrationLink),
        now,
        now,
      ],
    });

    // Insert companies
    if (body.companies && body.companies.length > 0) {
      for (const company of body.companies) {
        await drivesDb.execute({
          sql: `
            INSERT INTO drive_companies (id, drive_id, name, logo_url, logo_image)
            VALUES (?, ?, ?, ?, ?)
          `,
          args: [
            nanoid(),
            driveId,
            company.name,
            normalize(company.logoUrl),
            normalize(company.logoImage),
          ],
        });
      }
    }

    const drive = await getDriveWithCompanies(driveId);
    return NextResponse.json({ success: true, drive });
   } catch (err) {
     return NextResponse.json(
       { error: "Failed to create drive" },
       { status: 500 }
     );
   }
}

/* =========================
    PUT — update drive
======================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Update drive
    await drivesDb.execute({
      sql: `
        UPDATE drives
        SET
          title = ?,
          description = ?,
          start_date = ?,
          end_date = ?,
          location = ?,
          type = ?,
          status = ?,
          image_url = ?,
          registration_link = ?,
          updated_at = ?
        WHERE id = ?
      `,
      args: [
        body.title,
        normalize(body.description),
        body.startDate,
        body.endDate,
        normalize(body.location),
        body.type || "placement",
        body.status || "upcoming",
        normalize(body.imageUrl),
        normalize(body.registrationLink),
        now,
        body.id,
      ],
    });

    // Delete existing companies and re-insert
    await drivesDb.execute({
      sql: `DELETE FROM drive_companies WHERE drive_id = ?`,
      args: [body.id],
    });

    if (body.companies && body.companies.length > 0) {
      for (const company of body.companies) {
        await drivesDb.execute({
          sql: `
            INSERT INTO drive_companies (id, drive_id, name, logo_url, logo_image)
            VALUES (?, ?, ?, ?, ?)
          `,
          args: [
            nanoid(),
            body.id,
            company.name,
            normalize(company.logoUrl),
            normalize(company.logoImage),
          ],
        });
      }
    }

    const drive = await getDriveWithCompanies(body.id);
    return NextResponse.json({ success: true, drive });
   } catch (err) {
     return NextResponse.json(
       { error: "Failed to update drive" },
       { status: 500 }
     );
   }
}

/* =========================
    DELETE — remove drive
======================= */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Companies will be deleted automatically due to ON DELETE CASCADE
    await drivesDb.execute({
      sql: `DELETE FROM drives WHERE id = ?`,
      args: [id],
    });

    return NextResponse.json({ success: true });
   } catch (err) {
     return NextResponse.json(
       { error: "Failed to delete drive" },
       { status: 500 }
     );
   }
}
