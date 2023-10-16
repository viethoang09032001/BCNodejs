import productModel from "./../services/productModel";
import bcrypt from "bcryptjs";
// tạo mới người dùng
let session = {};

//lấy all product
const getAllProduct = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  } else {
    if (session.user) {
      delete session.user;
    }
  }
  if (req.session.user) {
    let productList = await productModel.getAllProduct();
    if (req.session.user.groupid == "admin") {
      return res.render("home", {
        data: {
          title: "Danh sách sản phẩm",
          page: "listproduct",
          rows: productList,
          session: session,
        },
      });
    } else {
      return res.render("home", {
        data: {
          title: "Danh sách sản phẩm",
          page: "listproduct",
          rows: productList,
          session: session,
        },
      });
    }
  } else {
    return res.redirect("/");
  }
};

// // chi tiết sản phẩm
const detailProduct = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }

  let id = req.params.id;
  if (await productModel.detailProduct(id)) {
    let dataPro = await productModel.detailProduct(id);
    return res.render("home", {
      data: {
        title: "detail product",
        page: "detailproduct",
        rows: dataPro,
        session: session,
      },
    });
  } else {
    return res.render("home", {
      data: {
        title: "404",
        page: "pagenotfound",
        content: "404",
        session: session,
      },
    });
  }
  // }
};

// update product
const updateProduct = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  // thuc hien chuc nang cap nhat du lieu nguoi dung
  if (req.method == "POST") {
    const pro = req.body;
    if (pro.id != null) {
      if (await productModel.detailProduct(pro.id)) {
        await productModel.updateProduct(
          pro.id,
          pro.name,
          pro.price,
          pro.branch,
          pro.maloai
        );
        return res.redirect("/listproduct");
      }
    } else {
      return res.redirect("/listproduct");
    }
  }
  // render form update
  if (req.params.id) {
    const pro = req.params.id;
    if (await productModel.detailProduct(pro)) {
      const product = await productModel.detailProduct(pro);
      return res.render("home", {
        data: {
          title: "update Product",
          page: "updateproduct",
          pro: product,
          session: session,
        },
      });
    } else {
      return res.redirect("/");
    }
  } else {
    return res.redirect("/listproduct");
  }
};
// // Deleted product
const delProduct = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  let id = req.params.id;
  if (await productModel.detailProduct(id)) {
    await productModel.delProduct(id);
    return res.redirect("/listproduct");
  } else {
    return res.render("home", {
      data: {
        title: "404",
        page: "pagenotfound",
        content: "404",
        session: session,
      },
    });
  }
};
// add new product
const addNewProduct = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  if (req.method == "POST") {
    const proinfo = req.body;
    if (
      proinfo.name != "" &&
      proinfo.price != "" &&
      proinfo.branch != "" &&
      proinfo.maloai != ""
    ) {
      let replacePro = false;
      let listPro = await productModel.getAllProduct();
      for (let i = 0; i < listPro.length; i++) {
        if (listPro[i].name == proinfo.name) {
          replacePro = true;
          break;
        }
      }
      if (replacePro == false) {
        await productModel.addNewProduct(
          proinfo.name,
          proinfo.price,
          proinfo.branch,
          proinfo.maloai
        );
      }
      return res.redirect("/listproduct");
    } else {
      return res.render("home", {
        data: {
          title: "Thêm mới sản phẩm",
          page: "addNewProduct",
          session: session,
        },
      });
    }
  }
  return res.render("home", {
    data: {
      title: "Thêm mới sản phẩm",
      page: "addNewProduct",
      session: session,
    },
  });
};
export default {
  getAllProduct,
  detailProduct,
  updateProduct,
  delProduct,
  addNewProduct,
};
