import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import HotelStar from '../components/HotelStar'
import { listHotelDetails, diffDays, createHotelReview } from '../actions/hotelActions'
import { HOTEL_CREATE_REVIEW_RESET } from '../constants/hotelConstants'



const HotelDetailsScreen = ({ history, match }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [message, setMessage] = useState()

    const dispatch = useDispatch()

    const hotelDetails = useSelector(state => state.hotelDetails)
    const { loading, error, hotel } = hotelDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const hotelReviewCreate = useSelector(state => state.foodDetails)
    const { success: successHotelReview, error: errorHotelReview } = hotelReviewCreate

    useEffect(() => {
        if(successHotelReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: HOTEL_CREATE_REVIEW_RESET})
        }
        dispatch(listHotelDetails(match.params.id))
    }, [dispatch, match, successHotelReview])

    const bookingHandler = () => {
        if (from === "" && to === "") {
            setMessage('Date must be filled')
        }else{
            localStorage.setItem("From", from)
            localStorage.setItem("To", to)
            localStorage.setItem("PImage", hotel.image)
            localStorage.setItem("PId", hotel._id)
            history.push(`/login?redirect=hotelbooking/${match.params.id}`)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createHotelReview(match.params.id, {
            rating,
            comment
        }))
        setTimeout(function () {
            window.location.reload()
        }, 3000);
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/hotels'>
                Back
            </Link>
            {message && <Message variant='danger'>{message}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Row>
                    <Col md={6}>
                        <Image className='hotel-image' src={hotel.image} alt={hotel.title} />
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col><h3>{hotel.title}</h3></Col>
                                </Row>
                                <Row>
                                    <Col><HotelStar className='bintang' value={hotel.star} /></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={hotel.rating} text={`${hotel.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price : <NumberFormat
                                        value={hotel.price}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Bed : {hotel.bed}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Description</h2>
                                <p>{hotel.description}</p>
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
                                        value={hotel.price}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp.'} /></strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Avaliable for : </Col>
                                    <Col>
                                        <span className='text-primary'>
                                            {diffDays(hotel.from, hotel.to)} {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                                        </span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Row>
                                        <Col>From : </Col>
                                        <Col><input type="date" onChange={(e) => setFrom(e.target.value)}></input></Col>  
                                    </Row>
                                    <br/>   
                                    <Row>
                                        <Col>To : </Col>
                                        <Col><input type="date" onChange={(e) => setTo(e.target.value)}></input></Col>
                                    </Row>
                                </ListGroup.Item>
                            <ListGroup>
                                <br></br>
                                <Button
                                    onClick={bookingHandler}
                                    className='btn-block'
                                    type='button'
                                > Reserve </Button>
                            </ListGroup>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {hotel.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {hotel.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a review</h2>
                            {errorHotelReview && <Message variant='danger'>{errorHotelReview}</Message>}
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
    );
};

export default HotelDetailsScreen; 
