import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_organization",
  title: "Get organization info",
  description:
    "Returns public institutional info about PRODESAR: name, tagline, mission, vision, and strategic pillars.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = {
      name: "PRODESAR – Fundación Proyectos y Desarrollo",
      tagline: "Transformando ideas en desarrollo sostenible",
      mission:
        "Impulsar proyectos que integren crecimiento económico, inclusión social y conservación ambiental para generar oportunidades en las comunidades.",
      vision:
        "Ser una organización líder en la formulación y ejecución de proyectos de impacto social, ambiental y económico.",
      pillars: [
        "Desarrollo social",
        "Sostenibilidad ambiental",
        "Crecimiento económico",
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
