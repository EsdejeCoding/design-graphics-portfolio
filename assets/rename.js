const fs = require("fs");
const path = require("path");

const dirF = [
  ["tshirt", "tsh"],
  ["stofmap", "map"],
  ["sticker", "stk"],
  ["stand", "std"],
  ["merch", "merch"],
  ["banner", "bann"],
];

dirF.forEach((dr) => {
  const targetFolder = path.join(__dirname, "works", dr[0]);
  const baseName = dr[1];
  fs.readdir(targetFolder, (err, files) => {
    if (err) {
      return console.error("Gagal membaca folder:", err);
    }

    files.forEach((file) => {
      const match = file.match(new RegExp(`${dr[1]}_(\\d+)\\.png`, "i"));
      if (match) {
        const number = match[1];
        const oldPath = path.join(targetFolder, file);
        const newFilename = `${baseName}_${number}.jpg`;
        const newPath = path.join(targetFolder, newFilename);

        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(
              `[ERROR] Gagal rename ${file} → ${newFilename}:`,
              err
            );
          } else {
            console.log(`[OK] ${file} → ${newFilename}`);
          }
        });
      }
    });
  });
});
