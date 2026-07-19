import { defineTool } from "@lovable.dev/mcp-js";

const areas = [
  { title: "Desarrollo comunitario", description: "Fortalecimiento del tejido social y la organización de las comunidades." },
  { title: "Educación y capacitación", description: "Formación que abre oportunidades y construye capacidades locales." },
  { title: "Medio ambiente y conservación", description: "Protección de ecosistemas y restauración de la biodiversidad." },
  { title: "Emprendimiento y fortalecimiento económico", description: "Acompañamiento a iniciativas productivas sostenibles." },
  { title: "Innovación social", description: "Soluciones creativas a los retos sociales más urgentes." },
  { title: "Gestión de proyectos sostenibles", description: "Formulación, ejecución y evaluación con altos estándares." },
];

export default defineTool({
  name: "list_focus_areas",
  title: "List focus areas",
  description: "Lists PRODESAR's areas of action with a short description of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(areas, null, 2) }],
    structuredContent: { areas },
  }),
});
