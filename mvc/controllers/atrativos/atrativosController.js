const AtrativoDAO = require('../../DAO/atrativos/atrativosDAO')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const { url } = require('inspector')
const fs = require('fs').promises

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'views', 'public', 'images', 'upload'))
    },
    filename: function (req, file, cb) {
        const extensao = path.extname(file.originalname)
        const nomeArquivo = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest('hex') + extensao
        cb(null, nomeArquivo)
    }
})
const upload = multer({ storage: storage })
module.exports = (app) => {

    app.get("/atrativos", async (req, res) => {
        const atrativoDAO = new AtrativoDAO()

        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(await atrativoDAO.consultarTodos())
    })

    app.post("/atrativo", upload.single('fileatrat'), async (req, res) => {
        const atrativoDAO = new AtrativoDAO()
        try {
            const extensao = path.extname(req.file.originalname)
            const nomeArquivo = crypto.createHash('md5').update(req.file.originalname + Date.now().toString()).digest('hex') + extensao

            const caminhoDestino = path.join(__dirname, '../', '../', 'views', 'public', 'images', 'upload', nomeArquivo)
            await fs.rename(req.file.path, caminhoDestino)

            console.log('Upload bem-sucedido')
            const {
                txtid: id,
                txtnomeatrat: nome,
                txtlatperson: lat,
                txtlongperson: long,
                txtdescatrat: desc
            } = req.body
            let status;

            if (!id) {
                status = await atrativoDAO.cadastrar(nome, lat, long, desc, nomeArquivo)
            }
            else {
                status = await atrativoDAO.atualizar(id, nome, lat, long, desc, nomeArquivo)
            }
            res.redirect("/listatrativos")
        }
        catch (error) {
            console.log(error)
            res.status(500).send('Erro ao realizar upload')
        }
    })

    app.delete("/atrativo/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const atrativoDAO = new AtrativoDAO()

        const status = await atrativoDAO.apagar(req.params.id)

        res.json({
            status
        })
    })
    app.put("/atrativo/:id",  async (req, res) => {
        const atrativoDAO = new AtrativoDAO()

        const {
            nome,
            lat,
            long,
            desc,
            image,
            id
        } = req.body;

        if (id == req.params.id) {
            const r = await atrativoDAO.atualizar(nome, lat, long, desc, image, id)
            res.json({ msg: "O total de linhas alteradas: " + r })
        }
        else {
            res.json({ msg: "Problema." })
        }

    })

    app.get("/listatrativos", (req, res) => {
        res.render('atrativos/listatrativos.ejs', {})
    })

    app.get("/alteratrativo/:id", async (req, res) => {

        const atrativo = new AtrativoDAO()
        const r = await atrativo.consultarUm(req.params.id)
        console.log(r)
        res.render('atrativos/alteratrativo.ejs', { r })
    })

    app.get("/addatrativo", (req, res) => {
        res.render('atrativos/addatrativo.ejs', {})

    })

}