import express from "express";
import getHomePage from "../controller/HomeController";
import getAboutPage from "../controller/AboutController";
import notFound from "../controller/NotFoundController";
import UserController from "../controller/UserController";
import productController from "../controller/productController";
import newsController from "../controller/newsController";

const router = express.Router();

const initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/about", getAboutPage);

  // user
  router.get("/createnewuser", UserController.createUser);
  router.post("/createnewuser", UserController.createUser);
  router.get("/listuser", UserController.getAllUser);
  router.get("/login", UserController.login);
  router.post("/login", UserController.login);
  router.get("/listuser/:username", UserController.detailUser);
  router.get("/updateuser/:username", UserController.updateuser);
  router.post("/updateuser", UserController.updateuser);
  router.get("/delUser/:username", UserController.delUser);
  router.get("/logout", UserController.logout);

  // product
  router.get("/listproduct", productController.getAllProduct);
  router.get("/listproduct/:id", productController.detailProduct);
  router.get("/updateproduct/:id", productController.updateProduct);
  router.post("/updateproduct", productController.updateProduct);
  router.get("/delProduct/:id", productController.delProduct);
  router.get("/addNewProduct", productController.addNewProduct);
  router.post("/addNewProduct", productController.addNewProduct);

  // news
  router.get("/listnews", newsController.getAllNews);
  router.get("/detailnews/:id", newsController.detailNews);
  router.get("/updatenews/:id", newsController.updateNews);
  router.post("/updatenews", newsController.updateNews);
  router.get("/deletenews/:id", newsController.delNews);
  router.get("/addmorenews", newsController.addMoreNews);
  router.post("/addmorenews", newsController.addMoreNews);

  //khong tim thay trang
  router.get("*", notFound);
  return app.use("/", router);
};
export default initWebRoute;
