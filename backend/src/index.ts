import sequelize from './config/database'

async function testdatabase(){
try{
        sequelize.authenticate()
}
catch{
console.error("")
}
}
testdatabase()