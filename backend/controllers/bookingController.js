import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'

const addBookingItems = asyncHandler(async (req, res) => {
    const {
        bookingItems,
        from,
        to,
        durations,
        fullName,
        email,
        phoneNumber,
        paymentMethod,
        itemPrice,
        taxPrice,
        totalPrice,
    } = req.body

    if (bookingItems && bookingItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const booking = new Booking({
            user: req.user._id,
            bookingItems,
            from,
            to,
            durations,
            fullName,
            email,
            phoneNumber,
            paymentMethod,
            itemPrice,
            taxPrice,
            totalPrice,
        })

        const createdBooking = await booking.save()

        res.status(201).json(createdBooking)
    }
})

export {addBookingItems}