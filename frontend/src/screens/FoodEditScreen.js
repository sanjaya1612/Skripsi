import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listFoodDetails, updateFood } from '../actions/foodActions'
import { FOOD_UPDATE_RESET } from '../constants/foodConstants'


const FoodEditScreen = ({ match, history }) => {
    const foodId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [details, setDetails] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const foodDetails = useSelector((state) => state.foodDetails)
    const { loading, error, food } = foodDetails

    const foodUpdate = useSelector((state) => state.foodUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = foodUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: FOOD_UPDATE_RESET })
            history.push('/admin/foodlist')
        } else {
            if (!food.name || food._id !== foodId) {
                dispatch(listFoodDetails(foodId))
            } else {
                setName(food.name)
                setPrice(food.price)
                setImage(food.image)
                setDetails(food.details)
                setCountInStock(food.countInStock)
                setProvince(food.province)
                setCity(food.city)
                setDescription(food.description)
            }
        }
    }, [dispatch, history, foodId, food, successUpdate])

    const uploadFileHandler = async (e) => {
        // const file = e.target.files[0]
        // const formData = new FormData()
        // formData.append('image', file)
        // setUploading(true)

        // try{
        //     const config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     const{data} = await axios.post('/api/upload', formData, config)

        //     setImage(data)
        //     setUploading(false)
        // }catch (error){
        //     console.log(error)
        //     setUploading(false)
        // }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateFood({
            _id: foodId,
            name,
            price,
            image,
            details,
            province,
            city,
            description,
            countInStock
        }))
    }

    return (
        <>
            <Link to='/admin/foodlist' className='btn btn-primary my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Food</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Your Name'
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
                            {/* <Form.File
                                id='image-file'
                                custom onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader />} */}
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter qty'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='province'>
                            <Form.Label>Province</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter province'
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='details'>
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter details'
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='desctiption'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                        <br />
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default FoodEditScreen
