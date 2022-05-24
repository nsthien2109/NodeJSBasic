import express from 'express';
import HomeController from '../controller/homeController';

import helperImage from '../helpers/image_helper';

let router = express.Router();

const initialWebRoute = (app) =>{
    //app.METHOD(PATH, HANDLER);
    router.get('/', HomeController.getHomePage);
    router.get('/detail/user/:idUser', HomeController.getDetailPage);
    router.post('/create-user', HomeController.createUser);
    router.post('/delete/user/:idUser',HomeController.deleteUser);
    router.get('/update/user/:idUser',HomeController.getEditPage);
    router.post('/updating/user',HomeController.updateUser);
    router.get('/upload-file',HomeController.getUploadFilePage);
    router.post('/upload-single-file',helperImage.upload.single('file_upload'), HomeController.handleUploadSingleFile);
    router.post('/upload-multiple-file', HomeController.handleUploadMultipleFile)
    // nhiều router ghi vào đây
    return app.use('/',router);
}

export default initialWebRoute;