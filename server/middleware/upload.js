const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.MONGODBURI,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
            contentType: file.mimetype,
        };
    }
});

const upload = multer({ storage });

module.exports = upload;
