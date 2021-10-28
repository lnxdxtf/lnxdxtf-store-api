
const mongooseRepository = require('mongoose')
const Product = mongooseRepository.model('Product')

exports.get = async () => {
    const response= await Product.find({active: true}, 'id title price slug')
    return response
}

exports.getBySlug = async(slug:any)=>{
    const response = await Product.findOne({slug: slug, active: true}, 'id title description price slug tags')
    return response
}

exports.getById = async(id:any)=>{
    const response = Product.findById(id)
    return response
}

exports.getByTag =async(tag:any)=>{
    const response =  Product.find({tags:tag, active: true},'title tags')
    return response
}

exports.create = async(data:any) => {
    var product = new Product(data) 
    await  product.save()
}

exports.update = async(id:any, data:any) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug,
                active: data.active
            }
        })
}

exports.delete = async(id:any) => {
    await Product.findOneAndRemove(id)
}