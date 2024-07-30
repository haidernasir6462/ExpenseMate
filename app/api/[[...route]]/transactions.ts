import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  // using drizzle ORM structure
  const data = await db
    .select({
      id: transactions.id,
      name: transactions.name,
    })
    .from(transactions)
    .where(eq(transactions.userId, auth?.userId));

  return c.json({
    data,
  });
});

export default app;
