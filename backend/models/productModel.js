import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {type: String,required : true},
    rating: {type: Number,required : true},
    comment: {type: String,required : true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps : true
})


const productSchema = mongoose.Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    itinerary1:{
        type: String,
    },
    itinerary2:{
        type: String,
    },
    itinerary3:{
        type: String,
    },
    itinerary4:{
        type: String,
    },
    itinerary5:{
        type: String,
    },
    reviews:[reviewSchema],
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    numReviews:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    },
},{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product