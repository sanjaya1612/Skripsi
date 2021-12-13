import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import Food from '../components/Food'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listFoods } from '../actions/foodActions'

const FoodScreen = () => {
    const dispatch = useDispatch()

    const foodList = useSelector(state => state.foodList)
    const { loading, error, foods } = foodList

    useEffect(() => {
        dispatch(listFoods())
    }, [dispatch])
    return (
        <>
            <h1>Sample Foods</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {foods.map(food => (
                        <Col key={food._id} sm={12} md={6} lg={4} xl={3}>
                            <Food food={food} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default FoodScreen
