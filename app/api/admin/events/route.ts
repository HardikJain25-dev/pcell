import { NextResponse } from "next/server";
import { eventsDb } from "@/lib/db-events";
import { nanoid } from "nanoid";
import { Event } from "@/types/event";

const normalize = (v: any) =>
  v === undefined || v === null || v === "" ? null : v;

async function getEvent(eventId: string): Promise<Event | null> {
  const eventResult = await eventsDb.execute({
    sql: `SELECT * FROM events WHERE id = ?`,
    args: [eventId],
  });

  if (eventResult.rows.length === 0) return null;

  const eventRow = eventResult.rows[0];
  
  return {
    id: String(eventRow.id),
    title: String(eventRow.title),
    description: eventRow.description ? String(eventRow.description) : null,
    startDate: String(eventRow.start_date),
    endDate: String(eventRow.end_date),
    location: eventRow.location ? String(eventRow.location) : null,
    type: String(eventRow.type) as Event["type"],
    status: String(eventRow.status) as Event["status"],
    imageUrl: eventRow.image_url ? String(eventRow.image_url) : null,
    registrationLink: eventRow.registration_link ? String(eventRow.registration_link) : null,
    createdAt: String(eventRow.created_at),
    updatedAt: String(eventRow.updated_at),
  };
}

/* =========================
    GET — list all events
======================= */
export async function GET() {
  try {
    const eventsResult = await eventsDb.execute(`
      SELECT * FROM events 
      ORDER BY start_date DESC
    `);

    const events: Event[] = [];

    for (const eventRow of eventsResult.rows) {
      const event = await getEvent(String(eventRow.id));
      if (event) events.push(event);
    }

    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

/* =========================
    POST — create new event
======================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventId = nanoid();
    const now = new Date().toISOString();

    // Insert event
    await eventsDb.execute({
      sql: `
        INSERT INTO events (
          id, title, description, start_date, end_date, location,
          type, status, image_url, registration_link, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        eventId,
        body.title,
        normalize(body.description),
        body.startDate,
        body.endDate,
        normalize(body.location),
        body.type || "flagship",
        body.status || "upcoming",
        normalize(body.imageUrl),
        normalize(body.registrationLink),
        now,
        now,
      ],
    });

    const event = await getEvent(eventId);
    return NextResponse.json({ success: true, event });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

/* =========================
    PUT — update event
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

    // Update event
    await eventsDb.execute({
      sql: `
        UPDATE events
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
        body.type || "flagship",
        body.status || "upcoming",
        normalize(body.imageUrl),
        normalize(body.registrationLink),
        now,
        body.id,
      ],
    });

    const event = await getEvent(body.id);
    return NextResponse.json({ success: true, event });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

/* =========================
    DELETE — remove event
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

    await eventsDb.execute({
      sql: `DELETE FROM events WHERE id = ?`,
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
