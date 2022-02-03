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

const getBookingById = asyncHandler(async (req, res) => {
    const order = await Booking.findById(req.params.id)

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found') 
    }
})

const updateBookingToPaid = asyncHandler(async (req, res) => {
    const order = await Booking.findById(req.params.id)

    if(order){
        order.isPaid = true 
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedBooking = await order.save()

        res.json(updatedBooking)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

const getMyBookings = asyncHandler(async (req, res) => {
    const orders = await Booking.find({ user: req.user._id})
    res.json(orders)
})

const getBookings = asyncHandler(async (req, res) => {
    const keydate = req.query.keydate ? {
        fullName: {
            $regex: req.query.keydate,
            $options: 'i'
        }
    } : {}
    const orders = await Booking.find({ ...keydate }).populate('user', 'id name') 
    res.json(orders) 
})

export {addBookingItems, getBookingById, updateBookingToPaid, getMyBookings, getBookings}