import { defineMcp } from "@lovable.dev/mcp-js";
import getOrganization from "./tools/get-organization";
import listFocusAreas from "./tools/list-focus-areas";
import listProjects from "./tools/list-projects";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "prodesar-mcp",
  title: "PRODESAR MCP",
  version: "0.1.0",
  instructions:
    "Public tools that expose institutional information about PRODESAR – Fundación Proyectos y Desarrollo: mission and pillars, focus areas, featured projects, and contact info.",
  tools: [getOrganization, listFocusAreas, listProjects, getContact],
});
