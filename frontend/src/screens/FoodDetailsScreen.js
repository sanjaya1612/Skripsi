import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listFoodDetails, createFoodReview } from '../actions/foodActions'
import { FOOD_CREATE_REVIEW_RESET } from '../constants/foodConstants'
import NumberFormat from 'react-number-format'


const FoodDetailsScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const foodDetails = useSelector(state => state.foodDetails)
    const { loading, error, food } = foodDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const foodReviewCreate = useSelector(state => state.foodDetails)
    const { success: successFoodReview, error: errorFoodReview } = foodReviewCreate


    const [message, setMessage] = useState()

    useEffect(() => {
        if(successFoodReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: FOOD_CREATE_REVIEW_RESET})
        }
        dispatch(listFoodDetails(match.params.id))
    }, [dispatch, match, successFoodReview])

    const addToCartHandler = () => {
        history.push(`/login?redirect=cart/${match.params.id}/` + qty)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createFoodReview(match.params.id, {
            rating,
            comment
        }))
        setTimeout(function () {
            window.location.reload()
        }, 3000);
    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/foods'>
                Back
            </Link>
            {message && <Message variant='danger'>{message}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image className='food-image'src={food.image} alt={food.name} />
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{food.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={food.rating} text={`${food.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price : <NumberFormat
                                        value={food.price}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Details : {food.details}
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
                                            <strong><NumberFormat
                                        value={food.price}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></strong>
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
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {food.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {food.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a review</h2>
                                    {errorFoodReview && <Message variant='danger'>{errorFoodReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <br/>
                                            <Button type='submit' variant='primary'>Submit</Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default FoodDetailsScreen
