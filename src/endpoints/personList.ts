import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Person } from "../types";

export class PersonList extends OpenAPIRoute {
  schema = {
    tags: ["People"],
    summary: "List all people",
    responses: {
      "200": {
        description: "List of people",
        content: {
          "application/json": {
            schema: z.object({ count: z.number(), people: z.array(Person) }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM people ORDER BY id DESC"
    ).all();
    return { count: results.length, people: results };
  }
}
