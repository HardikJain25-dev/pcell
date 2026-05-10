import { NextResponse } from "next/server";
import { teamDb } from "@/lib/db-team";
import { nanoid } from "nanoid";

const normalize = (v: any) =>
  v === undefined || v === null || v === "" ? null : v;

/* =========================
   GET — list team members
========================= */
export async function GET() {
  const result = await teamDb.execute(`
    SELECT * FROM student_team
    ORDER BY order_index ASC
  `);

  return NextResponse.json(result.rows);
}

/* =========================
   POST — add new member
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = nanoid();

    await teamDb.execute({
      sql: `
        INSERT INTO student_team (
          id, name, position, year, course, about,
          image, linkedin, email,
          order_index, active
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        body.name,
        body.position,
        normalize(body.year),
        normalize(body.course),
        normalize(body.about),
        normalize(body.image),
        normalize(body.linkedin),
        normalize(body.email),
        body.order_index ?? 0,
        body.active ?? 1,
      ],
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("POST team error:", err);
    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT — update member
========================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("API PUT /api/admin/team: payload received", body);

    if (!body.id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await teamDb.execute({
      sql: `
        UPDATE student_team
        SET
          name = ?,
          position = ?,
          year = ?,
          course = ?,
          about = ?,
          image = ?,
          linkedin = ?,
          email = ?,
          order_index = ?,
          active = ?
        WHERE id = ?
      `,
      args: [
        body.name,
        body.position,
        normalize(body.year),
        normalize(body.course),
        normalize(body.about),
        normalize(body.image),
        normalize(body.linkedin),
        normalize(body.email),
        body.order_index ?? 0,
        body.active ?? 1,
        body.id,
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT team error:", err);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE — remove member
========================= */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await teamDb.execute({
      sql: `DELETE FROM student_team WHERE id = ?`,
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE team error:", err);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
