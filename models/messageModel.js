const pool = require('../config/db');

const createMessage = async (userId, text) => {
  const result = await pool.query(
    'INSERT INTO messages (user_id, text) VALUES ($1, $2) RETURNING *',
    [userId, text]
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    `SELECT messages.id, messages.text, messages.created_at, users.name
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.created_at ASC`
  );
  return result.rows;
};

module.exports = { createMessage, getAllMessages };