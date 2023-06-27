const fs = require("fs");
const path = require("path");

const NAME = process.argv[2];
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const PATH_API = path.join(__dirname, "../src/api");

const TYPES_CONTENT = `
import type { Success, Failure } from "./shared";

`;

const HANDLER_CONTENT = `
import { AxiosWrapper } from "../axios";
import { ENDPOINTS } from "../endpoints";

export const ${capitalize(NAME)} = async () => {

  return await AxiosWrapper({})
}

`;

const HOOKS_CONTENT = `
import { useQuery, useMutation } from "@tanstack/react-query";

/* API */
import { ${capitalize(NAME)} } from "../handlers/${NAME}";
`;

// Create new handler file.
fs.writeFileSync(`${PATH_API}/handlers/${NAME}.ts`, HANDLER_CONTENT);

// Create new hook file.
fs.writeFileSync(`${PATH_API}/hooks/use${capitalize(NAME)}.ts`, HOOKS_CONTENT);

// Create new types file.
fs.writeFileSync(path.join(PATH_API, "types", `${NAME}.ts`), TYPES_CONTENT);

// Update types/index.ts
fs.appendFileSync(
  `${PATH_API}/types/index.ts`,
  `export type * from "./${NAME}";\n`
);

// Update hooks/index.ts
fs.appendFileSync(
  `${PATH_API}/hooks/index.ts`,
  `export * from "./use${capitalize(NAME)}";\n`
);
