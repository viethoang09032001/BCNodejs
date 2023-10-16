import express from "express";
import APIController from "../controller/APIController/APIController";
// import {createUser, getAllUser} from "./../controller/UserController"
const router = express.Router();
const initApiRoute = (app) => {
  router.get("/get-list-user", APIController.getListUser);
  router.get('/detailuser/:username', APIController.getDetailUser)
  router.post('/login', APIController.login)
  // router.get('/logout', APIController.logout)
  router.get('/deluser/:username',APIController.deleteUser)
  router.post('/createuser',APIController.createUser)
  router.post('/updateuser',APIController.updateUser)
  router.get('/getAllProduct',APIController.getAllProduct)
  router.get('/detailProduct/:id',APIController.detailProduct)
  router.post('/updateProduct',APIController.updateProduct)
  router.get('/delProduct/:id',APIController.delProduct)
  router.post('/addNewProduct',APIController.addNewProduct)
  // router.get("*", notFound);
  return app.use("/api/v1", router);
};
export default initApiRoute;
