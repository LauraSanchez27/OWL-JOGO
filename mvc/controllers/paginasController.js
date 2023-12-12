module.exports = (app) => {
    app.get("/indexDev", (req, res) => {
        res.render('../indexDev.ejs', {})
    })
    app.get("/equipe", (req, res) => {
        res.render('../equipe.ejs', {})
    })
    app.get("/", (req, res) => {
        res.render('../index.ejs', {})
    })
    app.get("/erro", (req, res) => {
        res.render('../erro.ejs', {})
    })
    app.get("/ems", (req, res) => {
        res.render('../ems.ejs', {})
    })
    app.get("/login", (req, res) => {
        res.render('../login.ejs', {})
    })
    app.get("/loginDev", (req, res) => {
        res.render('../login_adm.ejs', {})
    })
    app.get("/rs", (req, res) => {
        res.render('../rs.ejs', {})
    })
    app.get("/sobreGame", (req, res) => {
        res.render('../sobre-jogo.ejs', {})
    })
    app.get("/sobrePortal", (req, res) => {
        res.render('../sobre-portal.ejs', {})
    })
    app.get("/cadDev", (req, res) => {
        res.render('../cad_adm.ejs', {})
    })
    app.get("/cadJogador", (req, res) => {
        res.render('../cadJogador.ejs', {})
    })
    app.get("/mapa", (req, res) => {
        res.render('../mapa.ejs', {})
    })
}
