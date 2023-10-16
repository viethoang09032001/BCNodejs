import pool from "./../config/connectDB";
const getAllUser = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return rows;
};
const detailUser = async (user) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `users` where `username`=?",
    [user]
  );
  return rows[0];
};
const addNewUser = async (
  username,
  password,
  fullname,
  address,
  sex,
  email,
  groupid
) => {
  await pool.execute(
    "INSERT INTO `users` (username, password, fullname, address, sex, email, groupid) values (?, ?, ?, ?, ?, ?, ?)",
    [username, password, fullname, address, sex, email, groupid]
  );
};
const updateuser = async (username, fullname, address, sex, email) => {
  return await pool.execute(
    "update `users` set `fullname`=?,`address`=?,`sex`=?,`email`=? where `username`=? ",
    [fullname, address, sex, email, username]
  );
};
const delUser = async (user) => {
  await pool.execute("delete from `users` where `username`=?", [user]);
};

export default {
  getAllUser,
  detailUser,
  addNewUser,
  updateuser,
  delUser,
};
