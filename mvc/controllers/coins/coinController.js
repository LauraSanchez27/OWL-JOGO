const CoinsDao = require('../../DAO/coins/coinsDAO')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
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

    app.get("/coins", async (req, res) => {
        const coinsDao = new CoinsDao()

        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(await coinsDao.consultarTodos())
    })

    app.delete("/coin/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const coinsDAO = new CoinsDao()

        const status = await coinsDAO.apagar(req.params.id)

        res.json({
            status
        })
    })

    app.post("/coin", upload.single('filecoin'), async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const coinsDAO = new CoinsDao()
        console.log(req.file)
        var nomeArquivo = ''
        try {

            const extensao = path.extname(req.file.originalname)
            nomeArquivo = crypto.createHash('md5').update(req.file.originalname + Date.now().toString()).digest('hex') + extensao

            const caminhoDestino = path.join(__dirname, '../', '../', 'views', 'public', 'images', 'upload', nomeArquivo)
            await fs.rename(req.file.path, caminhoDestino)

            console.log('Upload bem-sucedido')




            const {
                txtid: id,
                txtnamecoin: nome,
                txtvaluecoin: value,
            } = req.body

            let status;

            if (!id) {
                console.log(req.file)
                status = await coinsDAO.cadastrar(nome, value, nomeArquivo)
            }
            else {
                console.log(req.file)
                status = await coinsDAO.atualizar(id, nome, value, nomeArquivo)
            }
            res.redirect("/listcoins")
        } catch (error) {
            console.log(error)
            res.status(500).send('Erro ao realizar upload')
        }
    })

    app.put("/coin/:id", async (req, res) => {
        const coinsDAO = new CoinsDao()

        const {
            nome,
            value,
            image,
            id
        } = req.body;

        if (id == req.params.id) {
            const r = await coinsDAO.atualizar(nome, value, image, id)
            res.json({ msg: "O total de linhas alteradas: " + r })
        }
        else {
            res.json({ msg: "Problema." })
        }

    })

    app.get("/listcoins", (req, res) => {
        res.render('coins/listcoins.ejs', {})
    })

    app.get("/altercoin/:id", async (req, res) => {

        const coin = new CoinsDao()
        const r = await coin.consultarUm(req.params.id)
        res.render('coins/altercoin.ejs', { r })
    })

    app.get("/addcoins", (req, res) => {
        res.render('coins/addcoin.ejs', {})
    })

}