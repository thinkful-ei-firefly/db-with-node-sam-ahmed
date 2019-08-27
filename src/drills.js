const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: 'postgressql://dunder-mifflin@localhost/knex_practice'
})

const getTextItems = (searchTerm) => {
  db.select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(data => console.log(data))
    .finally(()=>db.destroy());
}

getTextItems('burger');