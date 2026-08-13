import sequelize from './config/database'
import express  from 'express'

const  app = express()
const port = 3001


app.use(express.json())
app.use()
async function testdatabase(){
try{
    await sequelize.authenticate()
    console.log(' Connection has been established successfully ')
}
catch{
console.error("")
}
}
testdatabase()