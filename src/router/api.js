import express from 'express';
import APIHomeController from '../controller/Apis/homeController';
let router = express.Router();


const initialApiRoute = (app) =>{
    //app.METHOD(PATH, HANDLER);
    router.get('/users', APIHomeController.getAllUsers);
    router.post('/users', APIHomeController.createNewUser);
    router.put('/users/:idUser', APIHomeController.updateUser);
    router.delete('/users/:idUser',APIHomeController.deleteUser);
    // nhiều router ghi vào đây
    return app.use('/api/v1/',router);
}

export default initialApiRoute;