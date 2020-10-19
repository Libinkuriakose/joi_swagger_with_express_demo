const db = require('../../config/mongo');
const tablename = 'logEvents';

const find = async (data) => await db.get().collection(tablename).aggregate(data).toArray();

const findOne = async (data) => await db.get().collection(tablename).findOne(data);

const insert = async (body) => await db.get().collection(tablename).insert(body);

module.exports={
    find,
    findOne,
    insert
}