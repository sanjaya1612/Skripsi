import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PaginateActivity = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x + 1} 
                to={keyword ? `/search-activity/${keyword}/activitypage/page/${x + 1}` : `/activitypage/page/${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination> 
    )
}

export default PaginateActivity
