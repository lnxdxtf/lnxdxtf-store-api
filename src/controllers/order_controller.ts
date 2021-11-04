import Express,{Request,Response} from "express";

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
    let req = {
        customer:request.body.customer,
        number: guid.raw().substring(0,6),
        items: request.body.items
    }
    try{
        await repository.create(req)
        response.status(201).send({message: "Pedido cadastrado com sucesso!"})
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
        console.log(e)
    }
};