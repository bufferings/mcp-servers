import server from "./server.ts";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk@1.9.0/server/stdio.js";

await server.connect(new StdioServerTransport());
