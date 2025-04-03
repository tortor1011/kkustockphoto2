import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolder = "public/images/album/";
const outputFolder = "public/images/album_thumbnail/";

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach(file => {
    const inputPath = path.join(inputFolder, file);

    const ext = path.extname(file); 
    const fileName = path.basename(file, ext);

    // สร้างชื่อไฟล์ใหม่
    const newFileName = `${fileName}-thumbnail${ext}`;
    const outputPath = path.join(outputFolder, newFileName);

    sharp(inputPath)
        .resize({ width: 700 }) // ปรับขนาด Thumbnail
        .toFile(outputPath, (err, info) => {
            if (err) console.error(err);
            else console.log("Created thumbnail:", newFileName);
        });
});
