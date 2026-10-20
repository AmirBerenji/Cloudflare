import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Person } from "../types";

export class PersonCreate extends OpenAPIRoute {
  schema = {
    tags: ["People"],
    summary: "Add a person",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string().min(1),
              email: z.string().email(),
              age: z.number().int().min(0).max(150).optional(),
            }),
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Person created",
        content: { "application/json": { schema: Person } },
      },
    },
  };

  async handle(c: any) {
    const { body } = await this.getValidatedData<typeof this.schema>();
    const row = await c.env.DB.prepare(
      "INSERT INTO people (name, email, age) VALUES (?, ?, ?) RETURNING *"
    )
      .bind(body.name, body.email, body.age ?? null)
      .first();
    return c.json(row, 201);
  }
}
