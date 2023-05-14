const base64toFile = require('node-base64-to-file');
const path = require("path")
const { v4: uuid } = require("uuid")

exports.image = async (img) => {
    let imagePath = "";
    const folder = path.join(__dirname, "..", "public", "images")
    const filename = `${uuid()}`
    const fileUrl = `${folder}\\${filename}`

    const base64String = img;

    try {

        imagePath = await base64toFile(base64String, { filePath: folder, fileName: filename, types: ['jpg'], fileMaxSize: 3145728 });
        console.log("path" + fileUrl);
    } catch (error) {
        return error;
    }

}
