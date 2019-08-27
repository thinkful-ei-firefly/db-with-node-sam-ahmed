require('dotenv').config();

// const knex = require('knex');

// const knexInstance =knex({
//   client: 'pg',
//   connection: process.env.DATABASE_URL
// });

function getItems(db) {
  return db
    .select('*')
    .from('shopping_list')
    .finally(() => db.destroy());
}

function insertItems(db, newItem) {
  return db
    .into('shopping_list')
    .insert(newItem)
    .returning('*')
    .finally(() => db.destroy());
}

function updateItem(db, id, newInfo) {
  return db('shopping_list')
    .where({ id })
    .update(newInfo)
    .returning('*')
    .finally(() => db.destroy());
}

function deleteItem(db, id) {
  return db('shopping_list')
    .where({ id })
    .delete()
    .finally(() => db.destroy());
}