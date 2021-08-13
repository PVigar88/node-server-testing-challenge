const db = require("../../data/dbConfig.js");

function getAll() {
  return db("resources");
}

function getById(id) {
  return db("resources").where({ id }).first();
}

async function insert(resource) {
  const [id] = await db("resources").insert(resource);

  return getById(id);
}

async function update(id, changes) {
  await db("resources").where({ id }).update(changes);

  return getById(id);
}

function remove(id) {
  return db("resources").where({ id }).del();
}

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};
