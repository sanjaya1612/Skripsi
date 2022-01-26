import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getBookingDetails, payBooking } from '../actions/bookingHotelAction'
import { diffDays } from '../actions/hotelActions'
import NumberFormat from 'react-number-format'
import { PayPalButton } from 'react-paypal-button-v2' 
import { BOOKING_PAY_RESET } from '../constants/bookingHotelConstants'

const HotelOrderScreen = ({ match }) => {
    const bookingId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const bookingDetails = useSelector(state => state.bookingDetails)
    const { order, loading, error } = bookingDetails

    const bookingPay = useSelector(state => state.bookingPay)
    const { loading: loadingPay, success: successPay } = bookingPay

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay){
            dispatch({ type: BOOKING_PAY_RESET })
            dispatch(getBookingDetails(bookingId))
        }else if (!order.isPaid){
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch,bookingId,successPay,order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payBooking(bookingId, paymentResult))
    }


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : <>
            <h1>Booking ID : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Booking Details</h3>
                            <p>
                                <strong>Name : </strong>
                                {order.fullName}
                            </p>
                            <p>
                                <strong>E-mail: </strong>
                                {order.email}
                            </p>
                            <p>
                                <strong>Phone number: </strong>
                                {order.phoneNumber}
                            </p>
                            <p>
                                <Row>
                                    <Col>
                                        <strong>From : </strong>
                                        {order.from.substring(0, 10)}
                                        {" "}{" "}
                                        <strong>To : </strong>
                                        {order.to.substring(0, 10)}
                                    </Col>
                                </Row>
                                <strong>Durations : </strong>
                                {diffDays(localStorage.getItem("From"), localStorage.getItem("To"))} {diffDays(localStorage.getItem("From"), localStorage.getItem("To")) <= 1 ? ' day' : ' days'}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Details</h3>
                            <Row>
                                <Col>
                                    {order.bookingItems}
                                </Col>
                                <Col md={5}>
                                    {diffDays(localStorage.getItem("From"), localStorage.getItem("To"))} x <NumberFormat
                                        value={order.itemPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp. '} /> = <NumberFormat
                                        value={diffDays(localStorage.getItem("From"), localStorage.getItem("To")) * order.itemPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp. '} />
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
                                        value={order.itemPrice}
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
                                        value={order.taxPrice}
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
                                        value={order.totalPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && ( 
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default HotelOrderScreen 