import { NextResponse } from "next/server";
import { drivesDb } from "@/lib/db-drives";
import { Drive, Company } from "@/types/drive";

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
   GET — get past/completed drives
========================= */
export async function GET() {
  try {
    const now = new Date().toISOString();
    
    // Get all completed drives or drives where end_date has passed
    const drivesResult = await drivesDb.execute({
      sql: `
        SELECT * FROM drives 
        WHERE status = 'completed' 
        OR end_date < ?
        ORDER BY end_date DESC
      `,
      args: [now],
    });

    const drives: Drive[] = [];

    for (const driveRow of drivesResult.rows) {
      const drive = await getDriveWithCompanies(String(driveRow.id));
      if (drive) drives.push(drive);
    }

    return NextResponse.json({ drives });
   } catch (err) {
     return NextResponse.json(
       { error: "Failed to fetch past drives" },
       { status: 500 }
     );
   }
}