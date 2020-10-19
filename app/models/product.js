const db = require('../../config/mongo');
const tablename = 'products';

const find = async (data) => await db.get().collection(tablename).aggregate(data).toArray();

const insert = async (body) => await db.get().collection(tablename).insert(body);

const findOneAndUpdate = async (query) => await db.get().collection(tablename).findOneAndUpdate(query[0],query[1],query[2]);

const deleteOne = async (query) => await db.get().collection(tablename).deleteOne(query);

module.exports={
    find,
    insert,
    findOneAndUpdate,
    deleteOne
}