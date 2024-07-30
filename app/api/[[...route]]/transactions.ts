import { db } from "@/db/drizzle";
import { transactions, insertTransactionSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
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
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertTransactionSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401);
      }
      // using drizzle ORM
      const [data] = await db
        .insert(transactions)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();
      return c.json({ data });
    }
  );

export default app;
