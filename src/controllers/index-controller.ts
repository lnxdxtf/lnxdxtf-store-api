import Express,{Request,Response} from "express";


//==============
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
//=============================================================================
//===========================GET===============================================
exports.get = (request: Request, response: Response)=>{
    Product.find({active: true},'id title price slug')
        .then( (data: any) =>{
            response.status(200).send(data)
        }).catch((e: any) => {
            response.status(400).send(e)
        })
    return console.log('---HTTP-GET-200-OK')
};

exports.getBySlug = (request: Request, response: Response)=>{
    Product.findOne({slug: request.params.slug,
                  active: true
                },'id title description price slug tags')
        .then( (data: any) =>{
            response.status(200).send(data)
        }).catch((e: any) => {
            response.status(400).send(e)
        })
    return console.log('---HTTP-GET_BY_SLUG-200-OK')
};

exports.getById = (request: Request, response: Response)=>{
    Product.findById({
        tags: request.params.id,
        active: true
    },'id title description price slug tags')
        .then( (data: any) =>{
            response.status(200).send(data)
        }).catch((e: any) => {
            response.status(400).send(e)
        })
    return console.log('---HTTP-GET_BY_ID-200-OK')
};

exports.getByTag = (request: Request, response: Response)=>{
    Product.find({tags: request.params.tag,
                active: true
            },'title tags')
        .then( (data: any) =>{
            response.status(200).send(data)
        }).catch((e: any) => {
            response.status(400).send(e)
        })
    return console.log('---HTTP-GET_BY_TAG-200-OK')
};
//=============================================================================
//==========================POST===============================================
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
    return console.log('---HTTP-POST-201-OK')
};
//=============================================================================
//===============================PUT===========================================
exports.put = (request: Request, response:Response)=>{
    Product
        .findByIdAndUpdate(request.params.id, {
            $set: {
                title: request.body.title,
                description: request.body.description,
                price: request.body.price,
                slug: request.body.slug,
                active: request.body.active
            }
        }).then( (x: any)=>{
            response.status(201).send({
                message: 'Produto atualizado com sucesso!'
            })
        }).catch((e: any)=> {
            response.status(400).send({
                message: 'Falha ao atualizar o produto!',
                data: e
            })
        })
    
    return console.log('---HTTP-PUT_BY_ID_AND_UPDATE-201-OK')
};
//===============================================================================
//===================================DELETE======================================
exports.delete = (request: Request, response:Response)=>{
    Product
        .findOneAndRemove(request.body.id)
            .then( (x: any)=>{
                response.status(201).send({
                    message: 'Produto REMOVIDO com sucesso!'
                })
            }).catch((e: any)=> {
                response.status(400).send({
                    message: 'Falha ao REMOVER o produto!',
                    data: e
                })
        })
    return console.log('---HTTP-DELETE_BY_ID-200-OK')
};



