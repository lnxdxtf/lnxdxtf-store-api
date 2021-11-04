
const mongooseRepository = require('mongoose')
const Customer = mongooseRepository.model('Customer')


exports.create = async(data:any) => {
    var customer = new Customer(data) 
    await  customer.save()
}