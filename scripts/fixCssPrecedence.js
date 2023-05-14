const fs = require("fs");

const PATH = "./node_modules/@stitches/react/dist/index.mjs";

try {
  let content = fs.readFileSync(PATH);
  content = String(content);
  content = content.replace(
    '(e.head||e).appendChild(document.createElement("style"))',
    '(e.head||e).insertBefore(document.createElement("style"),(e.head||e).firstChild)'
  );

  fs.writeFileSync(PATH, content);
} catch (e) {
  if (e.code == "ENOENT") console.log("Couldn't find file");
}
