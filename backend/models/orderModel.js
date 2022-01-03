import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderItems:{
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
    },
    itemPrice:{
        type: String,
        required: true
    },
    taxPrice:{
        type: String,
        required: true,
    },
    totalPrice:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required :true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
},{
    timestamps: true
})

const Order = mongoose.model('Order',orderSchema)

export default Order