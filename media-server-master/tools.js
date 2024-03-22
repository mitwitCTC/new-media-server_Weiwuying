const fs = require('fs')
const fetch = require('node-fetch')
const multer = require('multer')
const os = require('os')
const path = require('path')

const timeFactory = (str, set = null, default_time = null, padding = false) => {
    let date = default_time ? new Date(default_time) : new Date()
    if (set) {
        let [sY = 0, sM = 0, sD = 0, sh = 0, sm = 0, ss = 0, sf = 0] = set
        date.setFullYear(date.getFullYear() + sY + (padding ? (date.getFullYear().toString().length < 4) ? 1911 : 0 : 0))
        date.setMonth(date.getMonth() + sM)
        date.setDate(date.getDate() + sD)
        date.setHours(date.getHours() + sh)
        date.setMinutes(date.getMinutes() + sm)
        date.setSeconds(date.getSeconds() + ss)
        date.setMilliseconds(date.getMilliseconds() + sf)
    }
    const add_0 = (times, length = 2) => {
        if (times.toString().length < length) {
            return add_0('0' + times, length)
        }
        return times
    }
    let pool = {
        Y: date.getFullYear(),
        y: date.getFullYear() - 1911,
        M: add_0(date.getMonth() + 1),
        d: add_0(date.getDate()),
        h: add_0(date.getHours()),
        m: add_0(date.getMinutes()),
        s: add_0(date.getSeconds()),
        f: add_0(date.getMilliseconds(), 3),
        X: `${date.getFullYear()}`.slice(-2),
        x: `${date.getFullYear() - 1911}`.slice(-2),
        P: (date.getMonth() + 1).toString(16).toUpperCase(),
        p: (date.getMonth() + 1).toString(16),
        Z: date.getFullYear(),
        z: (date.getMonth() + 1),
        n: date.getDate()
    }
    return str.split('').map(name => pool[name] || name).join('')
}


module.exports = {
    checkFile: path => {
        return fs.existsSync(path)
    },
    readFile: path => {
        let data = fs.readFileSync(path)
        return JSON.parse(data)
    },
    writeFile: (path, data, force = true) => {
        if (force) data = JSON.stringify(data)
        fs.writeFileSync(path, data)
    },

    mkdir: (path) => {
        if (!fs.existsSync(path))
            fs.mkdirSync(path)
    },
    fetch: (url, method = 'GET', body = null) => {
        let option = { headers: { 'content-type': 'application/json' }, method }
        if (body) option['body'] = JSON.stringify(body)
        fetch(url, option)
    },

    fetchGroup: (group, body) => {
        let option = { headers: { 'content-type': 'application/json' }, method: 'post', timeout: 5000 }
        if (body) option['body'] = JSON.stringify(body)
        group.forEach(url => {
            fetch(url, option)
        })
    },

    showImg: (res, filePath) => {
        fs.stat(filePath, function (error, stat) {
            if (error) {
                return res.send('image break')
            }
            res.writeHead(200, {
                'Content-Type': 'image/jpg',
                'Content-Length': stat.size
            });
        });

        var fileStream = fs.createReadStream(filePath);

        fileStream.on('data', function (data) {
            res.write(data)
        })

        fileStream.on('end', function () {
            res.end()
        })
    },

    uploadMiddle: multer().any(),

    getCustomTime: (format = 'Y-M-d h:m:s', { set = null, def = null, padding = false } = {}) => timeFactory(format, set, def, padding),

    getIp: () => {
        let ifaces = os.networkInterfaces()
        let ip = ''
        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                }
                if (iface.address.includes('192.168')) {
                    console.log(iface.address)
                    ip = iface.address
                }
            })
        })
        return ip
    },
    getDir: (route) => {
        return path.resolve(__dirname, route)
    },
    getPath: (dir, route) => {
        return path.resolve(dir, route)
    }

}