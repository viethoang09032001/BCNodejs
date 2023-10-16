import pool from "./../config/connectDB";
const getAllNews = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `news`");
  return rows;
};

const detailNews = async (news) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `news` where `id`=?",
    [news]
  );
  return rows[0];
};
const addMoreNews = async (title, content) => {
  await pool.execute(
    "INSERT INTO `news` ( title, content) values ( ?, ?)",
    [title, content]
  );
};
const updateNews = async (id, title, content) => {
  return await pool.execute(
    "update `news` set  `title` =?, `content` =? where `id` =?",
    [title, content, id]
  );
};
const delNews = async (news) => {
  await pool.execute("delete from `news` where `id`=?", [news]);
};

export default {
  getAllNews,
  detailNews,
  addMoreNews,
  updateNews,
  delNews,
};
