import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderFoodDetails, payFoodOrder, deliverFoodOrder } from '../actions/oderFoodActions'
import { ORDER_FOOD_PAY_RESET, ORDER_FOOD_DELIVER_RESET } from '../constants/foodOrderConstants'
import NumberFormat from 'react-number-format'


const FoodOrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()


    const orderFoodDetails = useSelector(state => state.orderFoodDetails)
    const { order, loading, error } = orderFoodDetails

    const orderFoodPay = useSelector(state => state.orderFoodPay)
    const { loading: loadingPay, success: successPay } = orderFoodPay

    const orderFoodDeliver = useSelector(state => state.orderFoodDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderFoodDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
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
        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_FOOD_PAY_RESET })
            dispatch({ type: ORDER_FOOD_DELIVER_RESET })
            dispatch(getOrderFoodDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order, userInfo, history])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payFoodOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverFoodOrder(order))
    }


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h2>Order {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping to : </h2>
                            <>
                                <strong>Name:</strong> {order.user.name}
                                <br />
                                <strong>Addres: </strong>
                                {order.shippingAddress.address},
                                {' '}{order.shippingAddress.city},
                                {' '}{order.shippingAddress.province},
                                {' '}{order.shippingAddress.postalCode}
                            </>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not deliverd</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>No Order</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    {item.name}
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x <NumberFormat
                                                        value={item.price}
                                                        displayType={'text'}
                                                        thousandSeparator={"."}
                                                        decimalSeparator=","
                                                        prefix={'Rp.'} /> = <NumberFormat
                                                        value={item.qty * item.price}
                                                        displayType={'text'}
                                                        thousandSeparator={"."}
                                                        decimalSeparator=","
                                                        prefix={'Rp.'} />

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col><NumberFormat
                                        value={order.itemsPrice}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col><NumberFormat
                                        value={order.shippingPrice}
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
                                    <Col>Total Price</Col>
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
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='w-100'
                                        onClick={deliverHandler}>
                                        Mark As Deliver
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default FoodOrderScreen
