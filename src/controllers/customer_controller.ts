import Express,{request, Request,Response} from "express";
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer_repository')
const md5 = require('md5')
const emailService = require('../services/email_service')
const authService = require('../services/auth_service')



exports.get = async(request:Request, response:Response)=>{
    try{ 
        const data = await repository.get() 
        response.status(200).send(data)
        console.log('---HTTP-GET-200-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log(e)
        console.log("xxx - HTTP-GET-FAILED")
    }
};

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
            password: md5(request.body.password + global.SALT_KEY),
            roles:['user']
        })

        emailService.send(
            request.body.email,
            'Bem Vindo á LNXDXTF STORE',
            global.EMAIL_TMPL.replace('{0}', request.body.name),
            
        )

        response.status(201).send({message: "Cliente cadastrado com sucesso!"})
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
        console.log(e)
    }
};

exports.authenticate = async(request: Request, response:Response)=>{
    try{
        const customer = await repository.authenticate({
            email: request.body.email,
            password: md5(request.body.password + global.SALT_KEY)
        })
        //console.log(customer)
        if(!customer){
            response.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
            return
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        emailService.send(
            customer.email,
            `Aqui está o seu token ${customer.name}, para autenticar na LNXDXTF STORE`,
            `Seu token:\n ${token}`,
        ) 

        response.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        })
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
        console.log(e)
    }
};

exports.refreshToken = async(request: Request, response:Response)=>{
    try{
        const token = request.body.token || request.query.token || request.headers['x-access-token']
        const data = await authService.decodeToken(token)

        const customer = await repository.getById(data.id)
        if(!customer){
            response.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
            return
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })
        emailService.send(
            customer.email,
            `Token Refresh - LNXDXTF STORE`,
            `Seu token:\n ${token}`,
        ) 
        response.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        })
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
        console.log(e)
    }
};