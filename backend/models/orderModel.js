import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            order: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            image: { type: String, required: true },
        }
    ],
    date:{
        type:Date,
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