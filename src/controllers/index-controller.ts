import Express,{Request,Response} from "express";

//============== validator
const ValidationContract = require('../validators/fluent-validator')
//============== repository
const repository = require('../repositories/product_repository')

//=============================================================================
//===========================GET===============================================
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

exports.getBySlug = async(request: Request, response: Response)=>{
    try{
        var data = await repository.getBySlug(request.params.slug)   
        response.status(200).send(data)
        console.log('---HTTP-GET_BY_SLUG-200-OK')  
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-GET_BY_SLUG-FAILED")
    }
}

exports.getById = async(request: Request, response: Response)=>{
    try {
        var data = await repository.getById(request.params.id)
        response.status(200).send(data)
        console.log('---HTTP-GET_BY_ID-200-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-GET_BY_ID-FAILED")
    }
};
exports.getByTag = async(request: Request, response: Response)=>{
    try{
        const data = await repository.getByTag(request.params.tag)
        response.status(200).send(data)
        console.log('---HTTP-GET_BY_TAG-200-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-GET_BY_TAG-FAILED")
    }
};
//=============================================================================
//==========================POST===============================================
exports.post = async(request: Request, response:Response)=>{
    let contract = new ValidationContract()
    contract.hasMinLen(request.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(request.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
    contract.hasMinLen(request.body.description, 3, 'A description deve conter pelo menos 3 caracteres')
    if (!contract.isValid()){
        response.status(400).send(contract.errors()).end()
    }
    try{
        await repository.create(request.body)
        response.status(201).send({message: "Produto cadastrado com sucesso!"})
        console.log('---HTTP-POST-201-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-POST-FAILED")
    }
};
//=============================================================================
//===============================PUT===========================================
exports.put = async(request: Request, response:Response)=>{
   try{
        await repository.update(request.params.id, request.body)
        response.status(201).send({message: 'Produto atualizado com sucesso!'})
        console.log('---HTTP-PUT-201-OK')
   } catch(e) {
    response.status(500).send({message: "Falha ao processar sua requisição!"})
    console.log("xxx - HTTP-PUT-FAILED")
}
};
//===============================================================================
//===================================DELETE======================================
exports.delete = async(request: Request, response:Response)=>{
    try{
        await repository.delete(request.body.id) 
        response.status(201).send({message: 'Produto REMOVIDO com sucesso!'})
        console.log('---HTTP-DELETE_BY_ID-200-OK')
    } catch(e) {
        response.status(500).send({message: "Falha ao processar sua requisição!"})
        console.log("xxx - HTTP-DELETE-FAILED")
    }
};



