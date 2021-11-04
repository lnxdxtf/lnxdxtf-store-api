var config = require('../config')
var sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = async (to, subject, body) =>{
    try{
        await sendgrid.send ({
            to: to,
            from : 'gabrielramos386@gmail.com',
            subject: subject,
            html: body
    })
    } catch(e){
        console.log(e)
    }
}