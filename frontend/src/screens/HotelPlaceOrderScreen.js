import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HotelSteps from '../components/HotelSteps'
import { diffDays, listHotelDetails } from '../actions/hotelActions'
import { createBooking } from '../actions/bookingHotelAction'


const HotelPlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const booking = useSelector(state => state.booking)
    const hotelDetails = useSelector(state => state.hotelDetails)
    const { hotel } = hotelDetails

    //calculation
    booking.itemPrice = Number(diffDays(localStorage.getItem("From"), localStorage.getItem("To")) * hotel.price)
    booking.taxPrice = Number((0.01 * booking.itemPrice))
    booking.totalPrice = Number(booking.itemPrice) + Number(booking.taxPrice)

    useEffect(() => {
        dispatch(listHotelDetails(localStorage.getItem("PId")))
    }, [dispatch])

    const bookingCreate = useSelector(state => state.bookingCreate)
    const { order, success} = bookingCreate

    useEffect(() => {
        if(success) {
            history.push(`/hotelorder/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const hotelPlaceOrderHandler = () => {
        dispatch(createBooking({
            bookingItems: hotel.title,
            from: localStorage.getItem("From"),
            to: localStorage.getItem("To"),
            durations: diffDays(localStorage.getItem("From"), localStorage.getItem("To")),
            fullName: booking.bookingHotel.fullName,
            email: booking.bookingHotel.email,
            phoneNumber: booking.bookingHotel.phoneNumber,
            paymentMethod: booking.paymentMethod,
            itemPrice: booking.itemPrice,
            taxPrice: booking.taxPrice,
            totalPrice: booking.totalPrice,
        }))
    }
    return (
        <>
            <HotelSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Booking Details</h3>
                            <p>
                                <strong>Name : </strong>
                                {booking.bookingHotel.fullName}
                            </p>
                            <p>
                                <strong>E-mail: </strong>
                                {booking.bookingHotel.email}
                            </p>
                            <p>
                                <strong>Phone number: </strong>
                                {booking.bookingHotel.phoneNumber}
                            </p>
                            <p>
                                <strong>From : </strong>
                                {localStorage.getItem("From")}
                            </p>
                            <p>
                                <strong>To : </strong>
                                {localStorage.getItem("To")}
                            </p>
                            <p>
                                <strong>Durations : </strong>
                                {diffDays(localStorage.getItem("From"), localStorage.getItem("To"))} {diffDays(localStorage.getItem("From"), localStorage.getItem("To")) <= 1 ? ' day' : ' days'}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {booking.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Details</h3>
                            <Row>
                                <Col md={2}>
                                    <Image src={hotel.image} alt={""} width={100} rounded />
                                </Col>
                                <Col>
                                    {hotel.title}
                                </Col>
                                <Col md={5}>
                                    {diffDays(localStorage.getItem("From"), localStorage.getItem("To"))} x Rp.{hotel.price} = Rp.{diffDays(localStorage.getItem("From"), localStorage.getItem("To")) * hotel.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Sumamary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col><NumberFormat
                                        value={booking.itemPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col><NumberFormat
                                        value={booking.taxPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col><NumberFormat
                                        value={booking.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <br />
                    <Button
                        type='button'
                        className='w-100'
                        onClick={hotelPlaceOrderHandler}
                    >Place Order</Button>
                </Col>
            </Row>
        </>
    )
}

export default HotelPlaceOrderScreen
