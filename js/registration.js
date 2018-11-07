odule.exports = function (pool){

var insertReg = async function(registration){

let regTag = registration.split(" ")[0].trim();

let townPlates = await pool.query('select id from towns where reg_tag = $1',[regTag])

if (townPlates.rowCount == 1){
let regi = await pool.query('select id from registration where regNo = $1',[regTag])


if (regi.rowCount == 0) {
    await pool.query('insert into registration (town_id, regNo) values($1 , $2)', [towntags.rows[0].id, regNumber])
  }
}
}

async function showplate() {

let regi = await pool.query('select * from registration')

return regi.rows;
};
async function showplateNo() {

let regi = await pool.query('select regNo from registration')
return regi.rows;
};

async function selectedTown() {
let results = await pool.query('select * from towns');
return results.rows;
};

async function deleteregi() {
await pool.query('delete from registration')
};

async function check(regNumber) {
let regi = await pool.query('select * from registration where regNo= $1', [regNumber])
return regi.rows;
}
async function filter(townId) {
const filterSQL = `SELECT regNo FROM registration WHERE town_id = $1`;
 
   
 
   
 

let regi = await pool.query(filterSQL, [townId])
return regi.rows;
}

return {
plateNoAdded,
check,
showplate,
deleteregi,
filter,
selectedTown,
showplateNo
}
}
  
