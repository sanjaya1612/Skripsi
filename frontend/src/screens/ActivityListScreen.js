import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import NumberFormat from 'react-number-format'

const ActivityListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { 
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate,
        product: createdProduct 
    } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if(successCreate) {
            history.push(`/admin/activity/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure ?')){
            dispatch(deleteProduct(id))
        }
    }

    const createActivityHandler = () =>{
        dispatch(createProduct())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Activities</h1>
                </Col>
                <Col>
                    <Button onClick={createActivityHandler} className='tomboladd'>
                        <i className='fas fa-plus'></i> Create new activity
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Destination</th>
                                <th>City</th>
                                <th>Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td><NumberFormat
                                        value={product.price}
                                        displayType={'text'}
                                        thousandSeparator={"."}
                                        decimalSeparator=","
                                        prefix={'Rp. '} /></td>
                                    <td>
                                        {product.destination}
                                    </td>
                                    <td>
                                        {product.city}
                                    </td>
                                    <td>
                                        {product.category}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/activity/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='light' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default ActivityListScreen
