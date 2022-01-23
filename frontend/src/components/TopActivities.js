import React, { useEffect } from 'react'
import { listTopProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const TopActivities = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    return (
        <>
            <h1>Top Activities</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                    <Col>
                        <Link to='/activities'>
                            See more
                        </Link>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default TopActivities;
