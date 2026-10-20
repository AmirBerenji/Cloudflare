import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

export class Add extends OpenAPIRoute {
  schema = {
    tags: ["Demo"],
    summary: "Add two numbers",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({ a: z.number(), b: z.number() }),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Sum of a and b",
        content: {
          "application/json": {
            schema: z.object({ result: z.number() }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const { body } = await this.getValidatedData<typeof this.schema>();
    return { result: body.a + body.b };
  }
}
