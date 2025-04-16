import { Server } from "npm:@modelcontextprotocol/sdk@1.9.0/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ToolSchema,
  CallToolRequest,
} from "npm:@modelcontextprotocol/sdk@1.9.0/types.js";
import { z } from "npm:zod@3.24.2";
import { zodToJsonSchema } from "npm:zod-to-json-schema@3.24.5";

const ToolInputSchema = ToolSchema.shape.inputSchema;
type ToolInput = z.infer<typeof ToolInputSchema>;

const server = new Server(
  {
    name: "hello",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const GetStringLengthSchema = z.object({ input: z.string() });

server.setRequestHandler(ListToolsRequestSchema, () => ({
  tools: [
    {
      name: "getStringLength",
      description: "文字列の長さを取得する",
      inputSchema: zodToJsonSchema(GetStringLengthSchema) as ToolInput,
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, (request: CallToolRequest) => {
  const name = request.params.name;
  const args = request.params.arguments ?? {};
  switch (name) {
    case "getStringLength": {
      const parsedArgs = GetStringLengthSchema.safeParse(args);
      if (!parsedArgs.success) {
        throw new Error(
          `Invalid arguments for getStringLength: ${parsedArgs.error}`
        );
      }
      const { input } = parsedArgs.data;
      return {
        content: [
          {
            type: "text",
            text: `${Array.from(input).length}`,
          },
        ],
        isError: false,
      };
    }
    default: {
      throw new Error(`Unknown tool: ${name}`);
    }
  }
});

export default server;
