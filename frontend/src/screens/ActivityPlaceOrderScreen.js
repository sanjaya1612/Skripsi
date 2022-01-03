import React, { useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import { listProductDetails } from '../actions/productActions'
import { createOrder } from '../actions/orderActions'

const ActivityPlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    // const [orderItems, setItems] = useState("")
    // const [paymentMethod, setPaymentMethod] = useState("")
    // const [itemPrice, setPrice] = useState("")
    // const [taxPrice, setTaxPrice] = useState("")
    // const [totalPrice, setTotalPrice] = useState("")
    // const [userId, setUserId] = useState("")
    const productDetails = useSelector(state => state.productDetails)
    const { product } = productDetails
    const cart = useSelector((state) => state.cart)

    // const orderCreate = useSelector(state => state.orderCreate)
    // const { order, success, error } = orderCreate

    // useEffect(() => {
    //     if (success) {
    //         history.push(`/order/${order._id}`)
    //     }
    //     // eslint-disable-next-line
    // }, [history, success])
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            console.log(order._id)
        }
        //eslint-disable-next-line
    }, [history, success])
    const activityPlaceOrderHandler = () => {
        dispatch(createOrder({
            orderItems: product.name,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            userId: localStorage.getItem("userId")
        }))
        // setItems(product.name)
        // setPaymentMethod(cart.paymentMethod)
        // setPrice(cart.itemPrice)
        // setTaxPrice(cart.taxPrice)
        // setTotalPrice(cart.totalPrice)
        // setUserId(localStorage.getItem("userId"))
        // console.log(product.name)
        // history.push(`/order/${order._id}`)
        // dispatch(createOrder(product.name,cart.paymentMethod,cart.itemPrice,cart.taxPrice,cart.totalPrice,localStorage.getItem("userId")))
        // console.log("Data masuk")
        // console.log(product.name)
        // console.log(cart.paymentMethod)
        // console.log(cart.itemPrice)
        // console.log(cart.taxPrice)
        // console.log(cart.totalPrice)
        // console.log(localStorage.getItem("userId"))

    }
    useEffect(() => {
        dispatch(listProductDetails(localStorage.getItem("PId")))
    }, [dispatch])

    //calculation
    cart.itemPrice = Number(localStorage.Qty * product.price)
    cart.taxPrice = Number((0.10 * cart.itemPrice))
    cart.totalPrice = Number((localStorage.Qty * product.price) + cart.taxPrice)


    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Booking</h2>
                            <p>
                                <strong>Name: </strong>
                                {cart.booking.fullName}
                            </p>
                            <p>
                                <strong>E-mail: </strong>
                                {cart.booking.email}
                            </p>
                            <p>
                                <strong>Phone number: </strong>
                                {cart.booking.phoneNumber}
                            </p>
                            <p>
                                <strong>Date: </strong>
                                {localStorage.getItem("Date")}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Details</h2>
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
                                    <Col>Rp.{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rp.{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='w-100'
                                    onClick={activityPlaceOrderHandler}
                                >Place Order</Button>
                            </ListGroup.Item> */}
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
