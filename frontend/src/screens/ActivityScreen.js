import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import PaginateActivity from '../components/PaginateActivity'
import { listProducts } from '../actions/productActions'
import ActivitySearchBox from '../components/ActivitySearchBox'

const ActivityScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <h1>Activities <i class="fas fa-snowboarding"></i></h1>
            <br/>
            <Route render={({ history }) => <ActivitySearchBox history={history}/>}/>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <br/>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <PaginateActivity pages={pages} page={page}/>
                </>
            )}
        </>
    )
}

export default ActivityScreen
