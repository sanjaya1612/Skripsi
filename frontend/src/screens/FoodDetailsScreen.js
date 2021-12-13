import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listFoodDetails } from '../actions/foodActions'


const FoodDetailsScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1)   
    const dispatch = useDispatch()

    const foodDetails = useSelector(state => state.foodDetails)
    const { loading, error, food } = foodDetails
    const [message, setMessage] = useState()

    useEffect(() => {
        dispatch(listFoodDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
            //localStorage.setItem("Qty", qty)
            // localStorage.setItem("Date", date)
            // localStorage.setItem("FImage", food.image)
            // localStorage.setItem("PId", food._id)
            history.push(`/login?redirect=cart/${match.params.id}/`+ qty)
        
    }
    return (
        <>
            <Link className='btn btn-secondary my-3' to='/foods'><i className="fas fa-arrow-left"></i>
                Go Back
            </Link>
            {message && <Message variant='danger'>{message}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={food.image} alt={food.name} width={500} />
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{food.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={food.rating} text={`${food.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price : Rp.{food.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description : {food.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price : </Col>
                                    <Col>
                                        <strong>Rp.{food.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status : </Col>
                                    <Col>
                                        {food.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {food.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty : </Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(food.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            {/* <ListGroup.Item>
                                <Row>
                                    <Col>Select date : </Col>
                                    <Col><input type="date" onChange={(e) => setDate(e.target.value)}></input></Col>
                                </Row>
                            </ListGroup.Item> */}
                            <ListGroup>
                                <br></br>
                                <Button
                                    onClick={addToCartHandler}
                                    className='btn-block'
                                    type='button'
                                    disabled={food.countInStock === 0}
                                > Add to Cart </Button>
                            </ListGroup>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default FoodDetailsScreen
