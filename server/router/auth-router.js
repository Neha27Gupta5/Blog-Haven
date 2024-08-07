const express = require('express');
const router = express.Router();

const authController = require('../controller/auth-controller');
const zodSchema = require('../validator/userValidation');
const validate = require('../middleware/validate-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const { uploadImage, getImage } = require('../controller/image-controller');
const upload = require('../middleware/upload');
const {postPublish,postUpdate ,postDelete} = require('../controller/Post-controller');
const { PopularPost ,postDataWithId ,postDataWithFilter ,fetchCategories,PostDateWithKeyWord } = require('../controller/PostSelection'); 
const {addComment ,getComment ,deleteComment } =require('../controller/comment-controller');

// Define routes
router.post('/signup', validate(zodSchema), authController.signupController);
router.post('/login', authController.loginController);
router.get('/User', authMiddleware, authController.user);
router.post('/create', postPublish);
router.get('/PopularPost', PopularPost);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.get('/detail/post' , postDataWithId);

router.put('/post/update',postUpdate);
router.delete('/post/delete', postDelete);
router.post('/comment/new' ,addComment);
router.get('/comment/all',getComment);
router.delete('/comment/delete' ,deleteComment);
router.get('/post/category',postDataWithFilter);
router.get('/fetch/category' , fetchCategories);
router.get('/post/keyword',PostDateWithKeyWord );

module.exports = router;
