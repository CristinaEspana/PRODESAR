import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Returns public contact channels for PRODESAR (how to reach out for alliances, volunteering or donations).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = {
      organization: "PRODESAR – Fundación Proyectos y Desarrollo",
      website_section: "#contacto",
      note: "Use the contact form on the PRODESAR website to reach the foundation for partnerships, volunteering or donations.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
