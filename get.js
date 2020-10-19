const db = require('./mongo');
const tablename = 'test';

const getAll = async () => {
   const a = await db.get().collection(tablename).find().toArray();
   console.log(a,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    return a;

}

module.exports={
    getAll
}