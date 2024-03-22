const { fetch } = require('./tools')
const { getPath, readFile } = require('./tools')
const SETTING_PATH = getPath(__dirname, '../media_setting.txt')

module.exports = (req, res) => {

    const body = req.body
    console.log(body)
    // const ip = req.connection.remoteAddress
    // let CAR_DATA = {}
    // if (Object.keys(body).includes('plate')) {
    //     // push_imgid, push_title, plate, fee, push_msg, lane_name, lane_id
    //     let { push_imgid, push_title, plate, fee, push_msg, lane_name, lane_id } = body
    //     if (push_imgid) {
    //         let url = `http://${ip.split('::ffff:').join('')}/lpr-image/${push_imgid}.jpg`
    //         CAR_DATA['plate'] = plate
    //         CAR_DATA['image'] = url
    //         CAR_DATA['message'] = !fee ? push_title : push_title ? `${push_title} / 應繳 ${fee} 元` : `應繳 ${fee} 元`
    //     }

    // } else {
    //     // push_imgid, push_title, push_msg, lane_name, lane_id
    //     let { push_imgid, push_title, push_msg, lane_name, lane_id } = body
    //     if (push_imgid) {
    //         let url = `http://${ip.split('::ffff:').join('')}/lpr-image/${push_imgid}.jpg`
    //         let { welcome } = readFile(SETTING_PATH)
    //         CAR_DATA['plate'] = push_title
    //         CAR_DATA['image'] = url
    //         CAR_DATA['message'] = welcome
    //     } else { //辨識中...
    //         CAR_DATA['message'] = push_title
    //     }
    // }
    // fetch('http://localhost/lane/', 'POST', CAR_DATA)

    res.send('ok')
}