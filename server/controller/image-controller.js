const grid = require('gridfs-stream');
const mongoose = require('mongoose');

const url = 'http://localhost:5000/blog/';

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
    console.log("GridFS initialized.");
});

const uploadImage = (request, response) => {
    if (!request.file) {
        console.error("File not found in the request.");
        return response.status(404).json("File not found");
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    console.log("File uploaded successfully:", imageUrl);

    return response.status(200).json(imageUrl);
};

const getImage = async (request, response) => {

    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });
        if (!file) {
            console.error("File not found:", request.params.filename);
            return response.status(404).json("File not found");
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        console.error("Error retrieving file:", error.message);
        return response.status(500).json({ msg: error.message });
    }
};

module.exports = { uploadImage, getImage };
