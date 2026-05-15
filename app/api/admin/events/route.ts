import { NextResponse } from "next/server";
import { eventsDb } from "@/lib/db-events";
import { nanoid } from "nanoid";
import { Event } from "@/types/event";

const normalize = (v: any) =>
  v === undefined || v === null || v === "" ? null : v;

async function getEvent(eventId: string): Promise<Event | null> {
  try {
    console.log(`Fetching event with ID: ${eventId}`);
    const eventResult = await eventsDb.execute({
      sql: `SELECT * FROM events WHERE id = ?`,
      args: [eventId],
    });

    if (eventResult.rows.length === 0) {
      console.warn(`No event found with ID: ${eventId}`);
      return null;
    }

    const eventRow = eventResult.rows[0];
    console.log(`Fetched event: ${eventRow.title}`);
    
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
  } catch (err) {
    console.error(`Error fetching event with ID ${eventId}:`, err);
    throw err;
  }
}

/* =========================
    GET — list all events
======================= */
export async function GET() {
  try {
    console.log("Fetching all events");
    const eventsResult = await eventsDb.execute(`
      SELECT * FROM events 
      ORDER BY start_date DESC
    `);

    console.log(`Found ${eventsResult.rows.length} events in database`);

    const events: Event[] = [];

    for (const eventRow of eventsResult.rows) {
      try {
        const event = await getEvent(String(eventRow.id));
        if (event) events.push(event);
      } catch (err) {
        console.error(`Error processing event ${eventRow.id}:`, err);
        // Continue processing other events
      }
    }

    console.log(`Returning ${events.length} events`);
    return NextResponse.json(events);
  } catch (err) {
    console.error("GET events error:", err);
    return NextResponse.json(
      { error: "Failed to fetch events", details: String(err) },
      { status: 500 }
    );
  }
}

/* =========================
    POST — create new event
======================= */
export async function POST(req: Request) {
  try {
    console.log("Creating new event");
    const body = await req.json();
    console.log("Received body:", body);
    
    const eventId = nanoid();
    const now = new Date().toISOString();

    // Insert event
    console.log(`Inserting event with ID: ${eventId}`);
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

    console.log(`Event inserted successfully with ID: ${eventId}`);
    const event = await getEvent(eventId);
    return NextResponse.json({ success: true, event });
  } catch (err) {
    console.error("POST event error:", err);
    return NextResponse.json(
      { error: "Failed to create event", details: String(err) },
      { status: 500 }
    );
  }
}

/* =========================
    PUT — update event
======================= */
export async function PUT(req: Request) {
  try {
    console.log("Updating event");
    const body = await req.json();
    console.log("Received body:", body);

    if (!body.id) {
      console.warn("PUT request missing ID");
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Update event
    console.log(`Updating event with ID: ${body.id}`);
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

    console.log(`Event updated successfully with ID: ${body.id}`);
    const event = await getEvent(body.id);
    return NextResponse.json({ success: true, event });
  } catch (err) {
    console.error("PUT event error:", err);
    return NextResponse.json(
      { error: "Failed to update event", details: String(err) },
      { status: 500 }
    );
  }
}

/* =========================
    DELETE — remove event
======================= */
export async function DELETE(req: Request) {
  try {
    console.log("Deleting event");
    const { id } = await req.json();
    console.log("Received ID:", id);

    if (!id) {
      console.warn("DELETE request missing ID");
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    console.log(`Deleting event with ID: ${id}`);
    await eventsDb.execute({
      sql: `DELETE FROM events WHERE id = ?`,
      args: [id],
    });

    console.log(`Event deleted successfully with ID: ${id}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE event error:", err);
    return NextResponse.json(
      { error: "Failed to delete event", details: String(err) },
      { status: 500 }
    );
  }
}
