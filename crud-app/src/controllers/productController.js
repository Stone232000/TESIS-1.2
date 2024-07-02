const pool = require('../db');

const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products  ');
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, site_type } = req.body;
  const userId = req.user.userId;
  try {
    const newProduct = await pool.query(
      'INSERT INTO products (name, description, price, image_url, user_id,site_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, imageUrl, userId, site_type]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  const userId = req.user.userId;
  try {
    const updatedProduct = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [name, description, price, imageUrl, id, userId]
    );
    if (updatedProduct.rows.length === 0) return res.status(404).json({ message: 'Product not found or not authorized' });
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const deletedProduct = await pool.query(
      'DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    if (deletedProduct.rows.length === 0) return res.status(404).json({ message: 'Product not found or not authorized' });
    res.json(deletedProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  

};
const getProductsByType = async (req, res) => {
  const { site_type } = req.params;
  try {
    const products = await pool.query(
      'SELECT * FROM products WHERE site_type = $1',
      [site_type]
    );
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct,getProductsByType  };
