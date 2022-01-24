import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import Food from '../components/Food'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {listFoods} from '../actions/foodActions'
import SearchBox from '../components/SearchBox'


const FoodScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const foodList = useSelector(state => state.foodList)
    const { loading, error, foods, page, pages } = foodList
    
    useEffect(() => {
        dispatch(listFoods(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <h2>Foods <i class="fas fa-utensils"></i></h2>
            <br/>
            <Route render={({ history }) => <SearchBox history={history}/>}/>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>  
                <Row>
                    {foods.map(food => (
                        <Col key={food._id} sm={12} md={6} lg={4} xl={3}>
                            <br/>
                            <Food food={food} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>
    )
}

export default FoodScreen
