import asyncHandler from 'express-async-handler'
import Hotel from '../models/hotelModel.js'


const getHotels = asyncHandler (async (req, res) => {
    const keyword = req.query.keyword ? {
        location: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const hotels = await Hotel.find({ ...keyword })

    res.json(hotels)
}) 

const getHotelById = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)
    if (hotel) { 
        res.json(hotel)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)
    if (hotel) {
        await hotel.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createHotel = asyncHandler(async (req, res) => {
    const hotel = new Hotel({
        title: 'Sample Title',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        star: 0,
        location: '',
        from: '',
        to: '',
        bed: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdHotel = await hotel.save()
    res.status(201).json(createdHotel)
})

const updateHotel = asyncHandler(async (req, res) => {
    
    const {
        title, 
        price, 
        description, 
        image, 
        star, 
        location, 
        from, 
        to, 
        bed, 
    } = req.body

    const hotel = await Hotel.findById(req.params.id)

    if(hotel) {
        hotel.title = title
        hotel.price = price
        hotel.description = description
        hotel.image = image
        hotel.star = star
        hotel.location = location
        hotel.from = from
        hotel.to = to
        hotel.bed = bed

        const updatedHotel = await hotel.save()
        res.json(updatedHotel)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})

const createHotelReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const hotel = await Hotel.findById(req.params.id)

    if (hotel) {
        const alreadyReviewd = hotel.reviews.find(r => r.user.toString()
            === req.user._id.toString())
        if (alreadyReviewd) {
            res.status(400)
            throw new Error('Already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        hotel.reviews.push(review)

        hotel.numReviews = hotel.reviews.length

        hotel.rating = hotel.reviews.reduce((acc, item) => item.rating + acc, 0) / hotel.reviews.length

        await hotel.save()
        res.status(201).json({ message: 'review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getHotels, getHotelById, deleteHotel, createHotel, updateHotel, createHotelReview} 