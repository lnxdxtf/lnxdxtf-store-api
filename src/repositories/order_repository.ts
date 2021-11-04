
const mongooseRepositoryOrder = require('mongoose')
const Order = mongooseRepositoryOrder.model('Order')


exports.get = async(data:any) => {
    var res = await Order.find({}, 'number status customer items')
        .populate('customer','name')
        .populate('items.product','title')
    return res
}
exports.create = async(data:any) => {
    var order = new Order(data) 
    await  order.save()
} 