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
  )
  .post(
    "/bulk-delete-transactions",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.string().array(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401);
      }

      const data = await db
        .delete(transactions)
        .where(
          and(
            //only user can delete its own account
            eq(transactions.userId, auth.userId),
            inArray(transactions.id, values.ids)
          )
        )
        .returning({ id: transactions.id });
      return c.json({ data });
    }
  )
  .post(
    "/update-transactions",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauhorized" }, 401);
      }
      const values = c.req.valid("json");

      const data = await db
        .update(transactions)
        .set({ name: values.name })
        .where(
          and(eq(transactions.userId, auth.userId), eq(transactions.id, values.id))
        )
        .returning({ id: transactions.id });
      return c.json({ data });
    }
  );

export default app;
