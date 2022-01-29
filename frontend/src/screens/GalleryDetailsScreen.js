import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Form, Carousel } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listGalleryDetails, createGalleryReview } from '../actions/galleryActions'
import { GALLERY_CREATE_REVIEW_RESET } from '../constants/galleryConstants'



const GalleryDetailsScreen = ({ history, match }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState()

    const dispatch = useDispatch()

    const galleryDetails = useSelector(state => state.galleryDetails)
    const { loading, error, gallery } = galleryDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const galleryReviewCreate = useSelector(state => state.foodDetails)
    const { success: successGalleryReview, error: errorGalleryReview } = galleryReviewCreate

    useEffect(() => {
        if (successGalleryReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: GALLERY_CREATE_REVIEW_RESET })
        }
        dispatch(listGalleryDetails(match.params.id))
    }, [dispatch, match, successGalleryReview])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createGalleryReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/galleries'>
                Back
            </Link>
            {message && <Message variant='danger'>{message}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col >
                            <Image className='gallery-image' src={gallery.image} alt={gallery.name} />
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><h3>{gallery.name}</h3></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={gallery.rating} text={`${gallery.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Description</h2>
                                    <p>{gallery.description}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <h2>Reviews</h2>
                            {gallery.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {gallery.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a review</h2>
                                    {errorGalleryReview && <Message variant='danger'>{errorGalleryReview}</Message>}
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
                                            <br />
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

export default GalleryDetailsScreen; 
