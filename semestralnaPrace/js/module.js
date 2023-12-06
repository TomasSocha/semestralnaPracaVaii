const productsdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

  return db;
};

const bulkcreate = (dbtable, data) => {
  if (empty(data)) {
    dbtable.bulkAdd([data]);
    console.log("Dáta sa podarilo nahrať!");
    return true;
  } else {
    console.log("Prosím nahrajte dáta!");
    return false;
  }
};


const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};


const empty = object => {
  return Object.values(object).every(value => value !== "");
};


const getData = (dbname, fn) => {
  dbname.count(count => {
    if (count) {
      let index = 0;
      dbname.each(table => fn(SortObj(table), index++));
    } else {
      fn(0);
    }
  });
};
const SortObj = sortobj => ({
  id: sortobj.id,
  name: sortobj.name,
  seller: sortobj.seller,
  price: sortobj.price
});


export default productsdb;
export {
  bulkcreate,
  createEle,
  getData,
  SortObj
};