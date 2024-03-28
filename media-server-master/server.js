const path = require('path')
const cors = require('cors')
const fs = require('fs')
const express = require('express')

const routes = require('./routes')

const app = express()

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api', routes)


const router = express.Router()
/* 非本地端連線設定架構使用
const { getIp } = require('./tools')
router.get('/', (req, res, next) => {
    if (fs.existsSync(path.resolve(__dirname, './dist/js'))) {
        let LOCAL_IP = getIp()
        fs.readdirSync(path.resolve(__dirname, './dist/js/')).filter(n => n.includes('app')).forEach(name => {
            let file = ((fs.readFileSync(path.resolve(__dirname, `./dist/js/${name}`))).toString())
                .replace('localhost', LOCAL_IP)
                .replace(/192.168.[0-9]{1,3}.[0-9]{1,3}/, LOCAL_IP)
            fs.writeFileSync(path.resolve(__dirname, `./dist/js/${name}`), file)
        })
    }
    return next()
})
*/
router.use(express.static(path.resolve(__dirname, './dist')))
router.get('*', (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
app.use('/', router)

const server = app.listen(5200, () => {
    let port = server.address().port
    console.log(`server on port: ${port}`)
})
