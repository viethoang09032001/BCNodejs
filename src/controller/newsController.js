import newsModel from "./../services/newsModel";
import bcrypt from "bcryptjs";

let session = {};

const getAllNews = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  } else {
    if (session.user) {
      delete session.user;
    }
  }
  if (req.session.user) {
    let newsList = await newsModel.getAllNews();
    if (req.session.user.groupid == "admin") {
      return res.render("home", {
        data: {
          title: "Danh sách tin tức",
          page: "listnews",
          rows: newsList,
          session: session,
        },
      });
    } else {
      return res.render("home", {
        data: {
          title: "Danh sách tin tức",
          page: "listnews",
          rows: newsList,
          session: session,
        },
      });
    }
  } else {
    return res.redirect("/");
  }
};

const detailNews = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }

  let id = req.params.id;
  if (await newsModel.detailNews(id)) {
    let dataNews = await newsModel.detailNews(id);
    return res.render("home", {
      data: {
        title: "detail news",
        page: "detailnews",
        rows: dataNews,
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

const updateNews = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  // thuc hien chuc nang cap nhat du lieu nguoi dung
  if (req.method == "POST") {
    const news = req.body;
    if (news.id != null) {
      if (await newsModel.detailNews(news.id)) {
        await newsModel.updateNews(news.id, news.title, news.content);
        return res.redirect("/listnews");
      }
    } else {
      return res.redirect("/listnews");
    }
  }
  // render form update
  if (req.params.id) {
    const news = req.params.id;
    if (await newsModel.detailNews(news)) {
      const newNews = await newsModel.detailNews(news);
      return res.render("home", {
        data: {
          title: "update news",
          page: "updatenews",
          news: newNews,
          session: session,
        },
      });
    } else {
      return res.redirect("/");
    }
  } else {
    return res.redirect("/listnews");
  }
};

const delNews = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  let id = req.params.id;
  if (await newsModel.delNews(id)) {
    await newsModel.delNews(id);
    return res.redirect("/listnews");
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
const addMoreNews = async (req, res) => {
  if (req.session.user) {
    session = req.session;
  }
  if (req.method == "POST") {
    const newsinfo = req.body;
    if (newsinfo.title != "" && newsinfo.content != "") {
      let replaceNews = false;
      let listNews = await newsModel.getAllNews();
      for (let i = 0; i < listNews.length; i++) {
        if (listNews[i].title == newsinfo.content) {
          replaceNews = true;
          break;
        }
      }
      if (replaceNews == false) {
        await newsModel.addMoreNews(newsinfo.title, newsinfo.content);
      }
      return res.redirect("/listnews");
    } else {
      return res.render("home", {
        data: {
          title: "Thêm mới tin tức",
          page: "addmorenews",
          session: session,
        },
      });
    }
  }
  return res.render("home", {
    data: {
      title: "Thêm mới tin tức",
      page: "addmorenews",
      session: session,
    },
  });
};

export default {
  getAllNews,
  detailNews,
  updateNews,
  delNews,
  addMoreNews,
};
