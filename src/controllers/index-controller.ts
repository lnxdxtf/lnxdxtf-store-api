import Express,{Request,Response} from "express";


//==============
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
//==============

exports.get = (request: Request, response: Response)=>{
   response.status(200).send({
        title:"testando express com ts",
        version:"4.4.4"
    });
    return console.log('HTTP-GET-200-OK')
};

exports.post = (request: Request, response:Response)=>{

    var product = Product(request.body) 
    product
        .save()
        .then( (x: any) =>{
            response.status(201).send({
                message: "Produto cadastrado com sucesso!"
            })
        }).catch((e: any) => {
            response.status(400).send({
                message: "Erro ao cadastrar o produto!",
                data: e
            })
        })
    return console.log('HTTP-POST-201-OK')
};

exports.put = (request: Request, response:Response)=>{
    const id = request.params.id
    response.status(201).send({
        id: id,
        item: request.body,
        status: "ATUALIZADO COM SUCESSO!"
    })
    return console.log('HTTP-PUT-201-OK')
};

exports.delete = (request: Request, response:Response)=>{
    const id = request.params.id
    response.status(200).send({id:id+" Apagado com sucesso!"})
    return console.log('HTTP-DELETE-200-OK')
};