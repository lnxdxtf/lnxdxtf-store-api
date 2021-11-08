import Express,{Request,Response} from "express";
const authService = require('../services/auth_service')

const guid = require('guid')
//============== repository
const repository = require('../repositories/order_repository')

exports.get = async(request: Request, response: Response)=>{
    try{ 
    const data = await repository.get() 
    response.status(200).send(data)
    console.log('---HTTP-GET-200-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-GET-FAILED")
    }
};

exports.post = async(request: Request, response:Response)=>{
    try{
        const token = request.body.token || request.query.token || request.headers['x-access-token'] 
        const data = await authService.decodeToken(token)

        await repository.create({
            customer:data.id,
            number: guid.raw().substring(0,6),
            items: request.body.items
        })
        response.status(201).send({message: "Pedido cadastrado com sucesso!"})
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
        console.log(e)
    }
};