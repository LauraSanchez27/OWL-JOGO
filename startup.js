//Este arquivo guarda as configurações do servidor
const express = require("express")

const app = express()
const consign = require('consign')


app.set('view engine','ejs')
app.set('views','mvc/views/ctrldev')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('mvc/views/public'))


consign().include('mvc/controllers').into(app)

app.listen(3000, () => console.log("Parabéns! Você conseguiu entrar no servidor!"))

module.exports = app 
