import userModel from "../../services/userModel";
import productModel from "../../services/productModel";
import bcrypt from "bcryptjs";
const getListUser = async (req, res) => {
  const listUser = await userModel.getAllUser();
  return res.status(200).json({
    message: "Get is successed!",
    data: listUser,
  });
};

const getDetailUser = async (req, res) => {
  let username = req.params.username;
  if (await userModel.detailUser(username)) {
    return res.status(200).json({
      message: "Get is successed!",
      data: await userModel.detailUser(username),
    });
  } else {
    return res.status(200).json({
      message: "User has not created",
    });
  }
};

const login = async (req, res) => {
  if (req.method == "POST") {
    const { username, password } = req.body;
    if (username != null && password != null) {
      if (await userModel.detailUser(username)) {
        let user = await userModel.detailUser(username);
        if (bcrypt.compareSync(password, user.password) == true) {
          return res.status(200).json({
            message: "Logged is success",
          });
        }
      } else {
        return res.status(200).json({
          message: "User has not created",
        });
      }
    } else {
      return res.status(200).json({
        message: "Please, fill in all fields",
      });
    }
  }
  return res.status(200).json({
    message: "Method not match",
  });
};
// const logout = (req, res) => {
//   if (req.session.user) {
//     req.session.destroy();
//     return res.status(200).json({
//       message: "User has loggouted",
//     });
//   }
// };
const createUser = async (req, res) => {
  if (req.method == "POST") {
    const userInfo = req.body;
    if (userInfo.username != "" && userInfo.password != "") {
      const username = userInfo.username;
      const password = userInfo.password;
      const address = userInfo.address;
      const fullname = userInfo.fullname;
      const sex = userInfo.sex;
      const email = userInfo.email;
      const groupid = userInfo.groupid;
      if (await userModel.detailUser(username)) {
        return res.status(200).json({
          message: "User is existed",
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await userModel.addNewUser(
          username,
          hash,
          fullname,
          address,
          sex,
          email,
          groupid
        );
        return res.status(200).json({
          message: "Add successfully",
        });
      }
    }
    return res.res.status(200).json({
      message: "Missing fields require",
    });
  }
};
const deleteUser = async (req, res) => {
  let username = req.params.username;
  if (await userModel.detailUser(username)) {
    await userModel.delUser(username);
    return res.status(200).json({ message: "The account was deleted" });
  } else {
    return res.status(400).json({
      message: "The account was not exit",
    });
  }
};
const updateUser = async (req, res) => {
  if (req.method == "POST") {
    const user = req.body;
    if (user.username != null) {
      if (await userModel.detailUser(user.username)) {
        await userModel.updateuser(
          user.username,
          user.fullname,
          user.address,
          user.sex,
          user.email
        );
        res.status(200).json({
          message: "cap nhat thanh cong",
        });
      } else {
        return res.status(400).json({
          message: "Tai khoan khong ton tai",
        });
      }
    } else {
      return res.status(400).json({
        message: "thieu truong du lieu",
      });
    }
  }
};
const getAllProduct = async (req, res) => {
  let productList = await productModel.getAllProduct();
  return res.status(200).json({
    message: "Get all product successed!",
    data: productList,
  });
};
const detailProduct = async (req, res) => {
  let pro = req.params.id;
  if (await productModel.detailProduct(pro)) {
    return res.status(200).json({
      message: "Get is successed!",
      data: await productModel.detailProduct(pro),
    });
  } else {
    return res.status(200).json({
      message: "product has not created",
    });
  }
};
// chau xong update product
const updateProduct = async (req, res) => {
  if (req.method == "POST") {
    const proinfo = req.body;
    if (proinfo.id != null) {
      if (await productModel.detailProduct(proinfo.id)) {
        await productModel.updateProduct(
          proinfo.id,
          proinfo.name,
          proinfo.price,
          proinfo.branch,
          proinfo.maloai
        );
        return res.status(200).json({
          message: "cap nhat thanh cong",
        });
      } else {
        return res.status(400).json({
          message: "san pham khong ton tai",
        });
      }
    } else {
      return res.status(400).json({
        message: "thieu truong du lieu",
      });
    }
  }
};
const delProduct = async (req, res) => {
  let proinfo = req.params.id;
  if (await productModel.detailProduct(proinfo)) {
    await productModel.delProduct(proinfo);
    return res.status(200).json({ message: "The product was deleted" });
  } else {
    return res.status(400).json({
      message: "The product was not exit",
    });
  }
};
const addNewProduct = async (req, res) => {
  if(req.method == "POST"){
    const proinfo = req.body;
    if( proinfo.name != "" && proinfo.price != "" && proinfo.branch != "" &&proinfo.maloai != "" ){
      let replacePro = false;
      let listPro = await productModel.getAllProduct()
      for (let i =0; i < listPro.length; i++) {
        if (listPro[i].name== proinfo.name) {
          replacePro = true;
          break;
        }
      }
      if (
        replacePro == false
      ) {
        await productModel.addNewProduct(
          proinfo.name,
          proinfo.price,
          proinfo.branch,
          proinfo.maloai
          );
        }
      return res.status(200).json({
        message: "Them moi san pham thanh cong!"
      })
    }else{
      return res.status(400).json({
        message: "Them moi san pham thanh cong that bai, thieu truong du lieu!"
      })
    }
  }
};
export default {
  getListUser,
  getDetailUser,
  createUser,
  deleteUser,
  updateUser,
  login,
  // logout,
  getAllProduct,
  detailProduct,
  updateProduct,
  delProduct,
  addNewProduct,
};
