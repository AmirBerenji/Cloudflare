import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

export class Hello extends OpenAPIRoute {
  schema = {
    tags: ["Demo"],
    summary: "Say hello",
    request: {
      query: z.object({
        name: z.string().optional().default("World"),
      }),
    },
    responses: {
      "200": {
        description: "Greeting",
        content: {
          "application/json": {
            schema: z.object({ message: z.string(), time: z.string() }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const { query } = await this.getValidatedData<typeof this.schema>();
    return { message: `Hello, ${query.name}!`, time: new Date().toISOString() };
  }
}
