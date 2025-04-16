import { Client } from "npm:@modelcontextprotocol/sdk@1.9.0/client/index.js";
import { InMemoryTransport } from "npm:@modelcontextprotocol/sdk@1.9.0/inMemory.js";
import type { Server } from "npm:@modelcontextprotocol/sdk@1.9.0/server/index.js";

export async function callServerTool(
  server: Server,
  toolName: string,
  args: Record<string, unknown>
) {
  const client = new Client({
    name: "test client",
    version: "1.0",
  });
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  const result = await client.callTool({
    name: toolName,
    arguments: args,
  });
  return result;
}
