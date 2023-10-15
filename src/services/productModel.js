import pool from "./../config/connectDB";
const getAllProduct = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `products`");
  return rows;
};

const detailProduct = async (pro) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `products` where `id`=?",
    [pro]
  );
  return rows[0];
};
const addNewProduct = async ( name, price, branch, maloai) => {
  await pool.execute(
    "INSERT INTO `products` ( name, price, branch, maloai) values ( ?, ?, ?, ?)",
    [ name, price, branch, maloai]
  );
};
const updateProduct = async (id, price, branch, maloai) => {
  return await pool.execute(
    "update `products` set  `price` =?, `branch` =?, `maloai` =? where `id` =?",
    [price, branch, maloai, id]
  );
};
const delProduct = async (pro) => {
  await pool.execute("delete from `products` where `id`=?", [pro]);
};

export default {
  getAllProduct,
  delProduct,
  detailProduct,
  addNewProduct,
  updateProduct,
};
