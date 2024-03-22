const api = require('./api')
// const lane = require('./lane')
const router = require('express').Router()

//車道
// router.post('/v1/lane', lane)

router.get('/set', api.autoSendSetting)




router.get('/media/data', api.getData)

router.put('/media/message', api.setData)

router.post('/media/carousel', api.UpdateImage)

router.delete('/media/carousel/:index', api.DeleteImage)

router.post('/media/carousel2', api.UpdateImage2)

router.delete('/media/carousel2/:index', api.DeleteImage2)


router.get('/img/:file', api.ShowImage)



module.exports = router