import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ActivityEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [destination, setDestination] = useState('')
    const [city, setCity] = useState('')
    const [itinerary1, setitinerary1] = useState('')
    const [itinerary2, setitinerary2] = useState('')
    const [itinerary3, setitinerary3] = useState('')
    const [itinerary4, setitinerary4] = useState('')
    const [itinerary5, setitinerary5] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/activitylist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDestination(product.destination)
                setCity(product.city)
                setDescription(product.description)
                setitinerary1(product.itinerary1)
                setitinerary2(product.itinerary2)
                setitinerary3(product.itinerary3)
                setitinerary4(product.itinerary4)
                setitinerary5(product.itinerary5)
            }
        }
    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const{data} = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        }catch (error){
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            destination,
            city,
            description,
            itinerary1,
            itinerary2,
            itinerary3,
            itinerary4,
            itinerary5,
            countInStock

        }))
    }

    return (
        <>
            <Link to='/admin/activitylist' className='btn btn-primary my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Activities</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}></Form.Control>
                            <Form.File
                                id='image-file'
                                custom onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter qty'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='destination'>
                            <Form.Label>Destination</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter destination'
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='desctiption'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='desctiption'>
                            <Form.Label>Itinerary</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter iteneray'
                                value={itinerary1}
                                onChange={(e) => setitinerary1(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='desctiption'>
                            <Form.Label>Itinerary</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter iteneray'
                                value={itinerary2}
                                onChange={(e) => setitinerary2(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='desctiption'>
                            <Form.Label>Itinerary</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter iteneray'
                                value={itinerary3}
                                onChange={(e) => setitinerary3(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='desctiption'>
                            <Form.Label>Itinerary</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter iteneray'
                                value={itinerary4}
                                onChange={(e) => setitinerary4(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='desctiption'>
                            <Form.Label>Itinerary</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter iteneray'
                                value={itinerary5}
                                onChange={(e) => setitinerary5(e.target.value)}></Form.Control>
                        </Form.Group>
                        <br />
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default ActivityEditScreen
