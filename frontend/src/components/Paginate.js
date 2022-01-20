import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1} to={!isAdmin ? keyword ? `/search-food/${keyword}/fooodspage/page/${x + 1}` : `/foodspage/page/${x + 1}` : `/admin/foodlist/${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate
