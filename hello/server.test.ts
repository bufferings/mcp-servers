import server from "./server.ts";
import { callServerTool } from "../utils/test-utils.ts";
import { expect } from "jsr:@std/expect@1.0.15/expect";

Deno.test("getStringLength", async () => {
  const result = await callServerTool(server, "getStringLength", {
    input: "Hello, world!",
  });
  expect(result).toEqual({
    content: [{ type: "text", text: "13" }],
    isError: false,
  });
});
