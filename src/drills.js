const knex = require("knex");

const db = knex({
  client: "pg",
  connection: "postgressql://dunder-mifflin@localhost/knex_practice"
});

const getTextItems = searchTerm => {
  db.select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then(data => console.log(data))
    .finally(() => db.destroy());
};

// getTextItems('burger');

function paginateItems(pageNum) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNum - 1);
  db.select("*")
    .from("shopping_list")
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    })
    .finally(() => db.destroy());
}

// paginateItems(3);

function addedAfter(daysAgo) {
  const date = db.raw(`now() - '?? days':: INTERVAL`, daysAgo);
  db.from("shopping_list")
    .where("date_added", ">", date)
    .then(result => {
      console.log(result);
    })
    .finally(() => db.destroy());
}

addedAfter(5)