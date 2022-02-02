import mongoose from 'mongoose'

const orderFoodSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            food: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Food'
            },
            image: { type: String, required: true },
        }
    ],
    fullName: {
        type: String,
        required: true,
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    taxPrice: {
        type: String,
        required: true,
    },
    shippingPrice: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true
})

const OrderFood = mongoose.model('OrderFood', orderFoodSchema)

export default OrderFood