import React, { useEffect } from 'react'
import { listTopFoods } from '../actions/foodActions'
import { useDispatch, useSelector } from 'react-redux'
import Food from '../components/Food'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const TopFoods = () => {
    const dispatch = useDispatch()
    const foodTopRated = useSelector(state => state.foodTopRated)
    const { loading, error, foods } = foodTopRated

    useEffect(() => {
        dispatch(listTopFoods())
    }, [dispatch])
    return (
        <>
            <h2>Top Foods</h2>

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
                    <Col>
                        <Link to='/foods'>
                            See more
                        </Link>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default TopFoods;
