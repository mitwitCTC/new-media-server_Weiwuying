const { checkFile, readFile, writeFile, mkdir, fetch, fetchGroup, showImg, uploadMiddle, getCustomTime, getIp, getDir, getPath } = require('./tools')

const SETTING_PATH = getPath(__dirname, '../media_setting.txt')

const IMAGE_PATH = getDir('../MEDIA_IMG/')

const IMG_URL = `http://${getIp()}:5200/api/img/`

const getSetting = path => {
    if (!checkFile(path)) {
        let setting_data = { parkName: '停車場', code: '汽車 20/半小時，入場10小時最高200元', seconds: '5',welcome: '歡迎光臨', carousel: [], carousel2: [] }
        writeFile(path, setting_data)
    }
    return readFile(path)
}
getSetting(SETTING_PATH)
const sendSetting = (data,ip) => {
    let { carousel, carousel2, ...other } = data
    if (carousel.length) other = { ...data }
    fetch(`http://${ip}/set`, 'POST', other)
}

module.exports = {

    /**
     * 多媒體端
     */

    // 多媒體端直接請求設定
    autoSendSetting: (req, res) => {
        const ip = req.connection.remoteAddress.replace('::ffff:', '')
        let SETTING_DATA = getSetting(SETTING_PATH)
        sendSetting(SETTING_DATA, ip)
        res.json({ success: 'ok' })
    },


    /**
     * 前端API
     */

    // 取得設定
    getData: (req, res) => {
        let SETTING_DATA = getSetting(SETTING_PATH)
        res.json(SETTING_DATA)
    },
    // 設定更新
    setData: (req, res) => {
        let { parkName, code, seconds, welcome } = req.body
        let SETTING_DATA = getSetting(SETTING_PATH)
        let UPDATE_DATA = Object.assign(SETTING_DATA, { parkName, code, seconds, welcome })
        writeFile(SETTING_PATH, UPDATE_DATA)
        sendSetting(UPDATE_DATA)
        res.json({ success: true })
    },
    // 取得圖片原檔(顯示用)
    ShowImage: (req, res) => {
        let { file } = req.params
        let fileName = file
        if (!file.toLowerCase().includes('.jpg')) {
            fileName += '.jpg'
        }
        let filePath = getPath(IMAGE_PATH, fileName)

        if (!checkFile(filePath)) {
            return res.send('image not exist')
        }

        showImg(res, filePath)
    },
    // 上傳顯示照片 
    UpdateImage: [
        uploadMiddle,
        (req, res) => {
            let adImg = ''
            let files = req.files

            if (files) {
                for (let file of files) {
                    let { fieldname, buffer } = file
                    if (buffer) {
                        let fileName = `${getCustomTime('yMdhms')}.jpg`
                        try {
                            mkdir(IMAGE_PATH)
                            writeFile(getPath(IMAGE_PATH, fileName), buffer, false)
                            adImg = `${IMG_URL}${fileName}`
                        } catch (err) {
                            return res.json({ message: '圖片上傳失敗', success: false })
                        }
                    }
                }
            }
            console.log(`照片網址${adImg}`)
            if (!adImg) return res.json({ message: '圖片上傳失敗', success: false })

            let SETTING_DATA = getSetting(SETTING_PATH)
            let carousel = [...SETTING_DATA.carousel, adImg]
            let UPDATE_DATA = Object.assign(SETTING_DATA, { carousel })
            writeFile(SETTING_PATH, UPDATE_DATA)
            sendSetting(UPDATE_DATA)
            return res.json({ message: '圖片上傳成功', adImg, carousel, success: true })
        }
    ],
    // 取消顯示照片
    DeleteImage: (req, res) => {
        let { index } = req.params
        let SETTING_DATA = getSetting(SETTING_PATH)
        let carousel = [...SETTING_DATA.carousel]
        carousel.splice(index, 1)
        let UPDATE_DATA = Object.assign(SETTING_DATA, { carousel })
        writeFile(SETTING_PATH, UPDATE_DATA)
        sendSetting(UPDATE_DATA)
        return res.json({ success: true })
    },
    // 上傳顯示照片2
    UpdateImage2: [
        uploadMiddle,
        (req, res) => {
            let adImg = ''
            let files = req.files

            if (files) {
                for (let file of files) {
                    let { fieldname, buffer } = file
                    if (buffer) {
                        let fileName = `${getCustomTime('yMdhms')}.jpg`
                        try {
                            mkdir(IMAGE_PATH)
                            writeFile(getPath(IMAGE_PATH, fileName), buffer, false)
                            adImg = `${IMG_URL}${fileName}`
                        } catch (err) {
                            return res.json({ message: '圖片上傳失敗', success: false })
                        }
                    }
                }
            }
            console.log(`照片網址${adImg}`)
            if (!adImg) return res.json({ message: '圖片上傳失敗', success: false })

            let SETTING_DATA = getSetting(SETTING_PATH)
            let carousel2 = [...SETTING_DATA.carousel2, adImg]
            let UPDATE_DATA = Object.assign(SETTING_DATA, { carousel2 })
            writeFile(SETTING_PATH, UPDATE_DATA)
            sendSetting(UPDATE_DATA)
            return res.json({ message: '圖片上傳成功', adImg, carousel2, success: true })
        }
    ],
    // 取消顯示照片2
    DeleteImage2: (req, res) => {
        let { index } = req.params
        let SETTING_DATA = getSetting(SETTING_PATH)
        let carousel2 = [...SETTING_DATA.carousel2]
        carousel2.splice(index, 1)
        let UPDATE_DATA = Object.assign(SETTING_DATA, { carousel2 })
        writeFile(SETTING_PATH, UPDATE_DATA)
        sendSetting(UPDATE_DATA)
        return res.json({ success: true })
    },


    // SendSync: (req, res) => {
    //     let SETTING_DATA = getSetting(SETTING_PATH)
    //     let ips = (getIp()).slip('.')
    //     let IP_HEAD = `${ips[0]}.${ips[1]}.${ips[2]}`
    //     for (let i = 170; i < 255; i++) {
    //         fetchGroup(`http://${IP_HEAD}.${i}:5200/api/sync`, { setting: SETTING_DATA })
    //     }
    //     res.json('ok')
    // },

    // DoSync: (req, res) => {
    //     let { setting } = req.body
    //     if (setting) {
    //         writeFile(SETTING_PATH, setting)
    //         fetch('http://localhost/set', 'POST', setting)
    //     }
    //     res.send('done')
    // }

}