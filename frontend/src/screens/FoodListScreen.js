import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listFoods, deleteFood, createFood } from '../actions/foodActions'
import { FOOD_CREATE_RESET } from '../constants/foodConstants'

const FoodListScreen = ({history, match}) => {
const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const foodList = useSelector(state => state.foodList)
    const { loading, error, foods, page, pages } = foodList

    const foodDelete = useSelector( state => state.foodDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = foodDelete

    const foodCreate = useSelector(state => state.foodCreate)
    const { 
        loading: loadingCreate,
        error: errorCreate, 
        success: successCreate,
        food: createdFood 
    } = foodCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: FOOD_CREATE_RESET})

        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if(successCreate) {
            history.push(`/admin/food/${createdFood._id}/edit`) 
        }else{
            dispatch(listFoods('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdFood, pageNumber])

    const deleteFoodHandler = (id) => {
        if(window.confirm('Are you sure ?')){
            dispatch(deleteFood(id))
        }
    }

    const createFoodHandler = () =>{
        dispatch(createFood())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Foods List</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='tomboladd' onClick={createFoodHandler}>
                        <i className='fas fa-plus'></i> Create New Food
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Province</th>
                                <th>City</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food) => (
                                <tr key={food._id}>
                                    <td>{food._id}</td>
                                    <td>{food.name}</td>
                                    <td>Rp.{food.price}</td>
                                    <td>
                                        {food.province}
                                    </td>
                                    <td>
                                        {food.city}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/food/${food._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn-sm' onClick={() => deleteFoodHandler(food._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page } isAdmin={true} />
                    </>
                )
            }
        </>
    )
}

export default FoodListScreen
