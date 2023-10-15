import userModel from "./../services/userModel";
import bcrypt from "bcryptjs";
// tạo mới người dùng
let session = {};
const createUser = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  } else {
    delete session.user;
  }
  if (req.method == "POST") {
    const userInfo = req.body;
    if (userInfo.username != "" && userInfo.password != "") {
      const username = userInfo.username;
      const password = userInfo.password;
      const address = userInfo.address;
      const fullname = userInfo.fullname;
      const sex = userInfo.sex;
      const email = userInfo.email;
      let groupid = "user";
      if (await userModel.detailUser(username)) {
        return res.render("home", {
          data: { title: "Tạo tài Khoản", page: "newUser", session: session },
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        if (req.session.user) {
          if (req.session.user.groupid == "admin") {
            groupid = userInfo.groupid;
          }
        }
        await userModel.addNewUser(
          username,
          hash,
          fullname,
          address,
          sex,
          email,
          groupid
        );
      }
      return res.redirect("/");
    }
    return res.render("home", {
      data: { title: "Tạo tài Khoản", page: "newUser", session: session },
    });
  }
  if (req.session.user && req.session.user.groupid == "admin") {
    return res.render("home", {
      data: {
        title: "Tạo tài Khoản",
        page: "newUser",
        session: session,
        quyen: [{ name: "user" }, { name: "admin" }],
      },
    });
  }
  return res.render("home", {
    data: { title: "Tạo tài Khoản", page: "newUser", session: session },
  });
};

// lấy all user
const getAllUser = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  } else {
    if (session.user) {
      delete session.user;
    }
  }
  if (req.session.user) {
    let userList = await userModel.getAllUser();
    if (req.session.user.groupid == "admin") {
      return res.render("home", {
        data: {
          title: "Danh sach tai khoan",
          page: "listUser",
          rows: userList,
          session: session,
        },
      });
    } else {
      return res.render("home", {
        data: {
          title: "Danh sach tai khoan",
          page: "listUser",
          rows: userList,
          session: session,
        },
      });
    }
  } else {
    return res.redirect("/");
  }
};

//login
const login = async (req, res) => {
  if (req.session.user) {
    session = req.session;
    res.redirect("/");
  }
  if (req.method == "POST") {
    const { username, password } = req.body;
    if (username != null && password != null) {
      if (await userModel.detailUser(username)) {
        let user = await userModel.detailUser(username);
        if (bcrypt.compareSync(password, user.password) == true) {
          req.session.user = user;
          session = req.session;
          return res.render("home", {
            data: { title: "Trang chu", page: "main", session: session },
          });
        }
      }
    }
  }
  return res.render("home", {
    data: { title: "Dang Nhap", page: "login", session: session },
  });
};
//logout
const logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  } else {
    delete session.user;
  }
  res.redirect("/");
};

// chi tiết người dùng
const detailUser = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  // if(isAuthentication(req,res)==true){
  let username = req.params.username;
  if (await userModel.detailUser(username)) {
    let dataUser = await userModel.detailUser(username);
    return res.render("home", {
      data: {
        title: "detail user",
        page: "detailUser",
        rows: dataUser,
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

// update user
const updateuser = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  // thuc hien chuc nang cap nhat du lieu nguoi dung
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
        return res.redirect("/listuser");
      }
    } else {
      return res.redirect("/listuser");
    }
  }
  // render form update
  if (req.params.username) {
    const username = req.params.username;
    if (await userModel.detailUser(username)) {
      const user = await userModel.detailUser(username);
      const gender = ["Nam", "Nu", "Khac"];
      return res.render("home", {
        data: {
          title: "update user",
          page: "updateUser",
          gender: gender,
          user: user,
          session: session,
        },
      });
    } else {
      return res.redirect("/");
    }
  } else {
    return res.redirect("/listuser");
  }
};
// delUser
const delUser = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  let username = req.params.username;
  if (await userModel.detailUser(username)) {
    await userModel.delUser(username);
    return res.redirect("/listuser");
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
export default {
  createUser,
  getAllUser,
  login,
  detailUser,
  updateuser,
  delUser,
  logout,
};
