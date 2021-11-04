import Express,{Request,Response} from "express";
//============== validator
const ValidationContract = require('../validators/fluent-validator')
//============== repository
const repository = require('../repositories/customer_repository')

const md5 = require('md5')
//services
const emailService = require('../services/email_service')

exports.post = async(request: Request, response:Response)=>{
    let contract = new ValidationContract()
    contract.hasMinLen(request.body.name, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.isEmail(request.body.email, 'E-mail inválido')
    contract.hasMinLen(request.body.password, 6, 'A description deve conter pelo menos 6 caracteres')
    if (!contract.isValid()){
        response.status(400).send(contract.errors()).end()
    }
    try{
        await repository.create({
            name: request.body.name,
            email: request.body.email,
            password: md5(request.body.password + global.SALT_KEY)
        })

        emailService.send(
            request.body.email,
            'Bem Vindo á LNXDXTF STORE',
            global.EMAIL_TMPL.replace('{0}', request.body.name)
        )

        response.status(201).send({message: "Cliente cadastrado com sucesso!"})
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
        console.log(e)
    }
};