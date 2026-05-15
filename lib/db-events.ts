import { createClient, Client } from "@libsql/client";

let eventsDb: Client;

if (process.env.TURSO_EVENTS_DATABASE_URL && process.env.TURSO_EVENTS_AUTH_TOKEN) {
  console.log("Using real Turso client for events database");
  eventsDb = createClient({
    url: process.env.TURSO_EVENTS_DATABASE_URL,
    authToken: process.env.TURSO_EVENTS_AUTH_TOKEN,
  });
} else {
  console.warn("Turso events database credentials not found. Using mock client.");
  // Create a mock client for build time when env vars aren't available
  eventsDb = {
    execute: async () => ({ rows: [] }),
    batch: async () => [],
    transaction: async () => ({
      execute: async () => ({ rows: [] }),
      commit: async () => {},
      rollback: async () => {},
      close: async () => {},
    }),
    close: async () => {},
  } as unknown as Client;
}

export { eventsDb };
