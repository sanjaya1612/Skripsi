import React, { useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import { listProductDetails } from '../actions/productActions'
import { createOrder } from '../actions/orderActions'

const ActivityPlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { product } = productDetails
    const booking = useSelector((state) => state.cart.booking)
    const cart = useSelector((state) => state.cart)

    //calculation
    booking.itemPrice = Number(localStorage.Qty * product.price)
    booking.taxPrice = Number((0.10 * booking.itemPrice))
    booking.totalPrice = Number((localStorage.Qty * product.price) + booking.taxPrice)


    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success } = orderCreate

    

     useEffect(() => {
         if (success) {
             history.push(`/order/${order._id}`)
         }
         //eslint-disable-next-line
    }, [history, success])

    const activityPlaceOrderHandler = () => {
        dispatch(createOrder({
            orderItems: product.name,
            qty: localStorage.Qty,
            date: localStorage.getItem("Date"), 
            phoneNumber: booking.phoneNumber,
            fullName: booking.fullName,
            paymentMethod: cart.paymentMethod,
            itemPrice: booking.itemPrice,
            taxPrice: booking.taxPrice,
            totalPrice: booking.totalPrice,
        }))

    }
    useEffect(() => {
        dispatch(listProductDetails(localStorage.getItem("PId")))
    }, [dispatch])


    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Booking</h3>
                            <p>
                                <strong>Name: </strong>
                                {booking.fullName}
                            </p>
                            <p>
                                <strong>E-mail: </strong>
                                {booking.email}
                            </p>
                            <p>
                                <strong>Phone number: </strong>
                                {booking.phoneNumber}
                            </p>
                            <p>
                                <strong>Date: </strong>
                                {localStorage.getItem("Date")}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Details</h3>
                            <Row>
                                <Col md={2}>
                                    <Image src={product.image} alt={""} width={100} rounded />
                                </Col>
                                <Col>
                                    {product.name}

                                </Col>
                                <Col md={5}>
                                    {localStorage.Qty} x Rp.{product.price} = Rp.{localStorage.Qty * product.price}
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
                                    <Col>Rp.{localStorage.Qty * product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rp.{booking.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rp.{booking.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <br />
                    <Button
                        type='button'
                        className='w-100'
                        onClick={activityPlaceOrderHandler}
                    >Place Order</Button>
                </Col>
            </Row>
        </>
    )
}

export default ActivityPlaceOrderScreen
