import { Box, Flex } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  pageCount: number,
  handlePageChange: ()=> void,
}

const Pagination = (props: PaginationProps) => {
  const {pageCount, handlePageChange } = props

  return (
    <Box mt={4} flexDirection="row">
      <Flex justifyContent="center">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="break-me"
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          disabledClassName="disabled"
        />
      </Flex>
    </Box>
  )
}

export default Pagination
