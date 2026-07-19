import { defineTool } from "@lovable.dev/mcp-js";

const projects = [
  {
    name: "Reforestando el Páramo",
    location: "Boyacá, Colombia",
    description: "Restauración ecológica de zonas degradadas con especies nativas y participación comunitaria.",
    objective: "Plantar 50.000 árboles en 3 años",
    results: "12.500 árboles sembrados · 8 veredas vinculadas",
  },
  {
    name: "Aulas Conectadas",
    location: "Cauca, Colombia",
    description: "Educación digital y conectividad para escuelas rurales con docentes capacitados.",
    objective: "Llegar a 30 escuelas rurales",
    results: "18 escuelas equipadas · 1.200 estudiantes",
  },
  {
    name: "Café con Propósito",
    location: "Huila, Colombia",
    description: "Fortalecimiento de cooperativas cafeteras con prácticas sostenibles y comercio justo.",
    objective: "Acompañar 200 familias productoras",
    results: "150 familias activas · +35 % ingreso promedio",
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "Lists PRODESAR's featured projects with location, objective and current results.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    structuredContent: { projects },
  }),
});
