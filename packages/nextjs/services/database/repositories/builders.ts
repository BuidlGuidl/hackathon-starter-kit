import { InferInsertModel, eq } from "drizzle-orm";
import { db } from "~~/services/database/config/postgresClient";
import { builders } from "~~/services/database/config/schema";

export type BuilderInsert = InferInsertModel<typeof builders>;

export async function getAllBuilders() {
  return await db.select().from(builders);
}

export async function getBuilderById(id: string) {
  return await db.query.builders.findFirst({ where: eq(builders.id, id) });
}

export async function createBuilder(builder: BuilderInsert) {
  return await db.insert(builders).values(builder);
}
