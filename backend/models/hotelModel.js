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

const hotelSchema = mongoose.Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    star:{
        type: Number,
        required: true,
        default: 0
    },
    location:{
        type: String,
    },
    description:{
        type: String,
        required: true,
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
    from:{
        type: Date,
    },
    to:{
        type: Date,
    },
    bed:{
        type: Number,
    },
},{
    timestamps: true
})

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel