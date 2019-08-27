const shoppingList = require("../src/shopping-list-service");
const knex = require("knex");

let testItems = [
  {
    id: 1,
    name: "Test 1",
    price: "2",
    category: "Lunch",
    date_added: new Date("2019-08-22T16:28:32.615Z"),
    checked: true
  },
  {
    id: 2,
    name: "Test 2",
    price: "4",
    category: "Breakfast",
    date_added: new Date("2019-08-21T16:28:32.615Z"),
    checked: false
  }
];
describe("Shopping Service object", () => {
  let db;
  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.DATABASE_URL
    });
  });

  before(() => db("shopping_list").truncate());

  afterEach(() => db("shopping_list").truncate());

  after(() => db.destroy());

  context("The table has items in it", () => {
    before(() => {
      return db
      .into("shopping_list")
      .insert(testItems)
    });
    it("returns items with getItems()", () => {
      return shoppingList.getItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });
  });
  context("Table is empty", () => {
    it("returns empty array with getItems()", () => {
      return shoppingList.getItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    })
    it('inserts new items with insertItems()', () => {
      return shoppingList.insertItems(db, testItems)
        .then(res=> {
          expect(res).to.eql(testItems);
        })
    })
  })
});
