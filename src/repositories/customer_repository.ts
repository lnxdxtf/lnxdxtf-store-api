
const mongooseRepository = require('mongoose')
const Customer = mongooseRepository.model('Customer')

exports.get = async(data:any)=>{
    const response = await Customer.find()
    return response
}


exports.create = async(data:any) => {
    var customer = new Customer(data) 
    await  customer.save()
}

exports.authenticate = async (data:any) => {
    const response= await Customer.findOne({
        email: data.email,
        password: data.password
        })
    return response
}

exports.getById = async (id:any) => {
    const response= await Customer.findById(id)
    return response
}