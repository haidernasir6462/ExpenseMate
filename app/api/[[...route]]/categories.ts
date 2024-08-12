import { db } from "@/db/drizzle";
import { categories, insertCategorySchema } from "@/db/schema";
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
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(eq(categories.userId, auth?.userId));

    return c.json({
      data,
    });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCategorySchema.pick({
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
        .insert(categories)
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
    "/bulk-delete-categories",
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
        .delete(categories)
        .where(
          and(
            //only user can delete its own account
            eq(categories.userId, auth.userId),
            inArray(categories.id, values.ids)
          )
        )
        .returning({ id: categories.id });
      return c.json({ data });
    }
  )
  .post(
    "/update-category",
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
        .update(categories)
        .set({ name: values.name })
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, values.id)
          )
        )
        .returning({ id: categories.id });
      return c.json({ data });
    }
  )
  .post(
    "/delete-category",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: "Unauhorized" }, 401);
      }
      const values = c.req.valid("json");

      const data = await db
        .delete(categories)
        .where(
          and(
            //only user can delete its own account
            eq(categories.userId, auth.userId),
            eq(categories.id, values.id)
          )
        )
        .returning({ id: categories.id });
      return c.json({ data });
    }
  );

export default app;
