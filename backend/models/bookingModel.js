import mongoose from 'mongoose' 

const orderSchema = mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    bookingItems: {
        type: String,
        required: true
    },
    from:{
        type:Date,
        required: true,
    },
    to:{
        type:Date,
        required: true,
    },
    durations:{
        type:Number,
        required: true,
    },
    fullName:{
        type: String,
        required: true
    },
    email:{
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

const Booking = mongoose.model('Booking',orderSchema)

export default Booking