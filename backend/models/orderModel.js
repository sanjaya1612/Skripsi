import mongoose from 'mongoose' 

const orderSchema = mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    orderItems: {
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    date:{
        type:Date,
        required: true,
    },
    fullName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
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