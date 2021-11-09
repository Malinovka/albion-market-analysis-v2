import Button from "./Button"

export default function Pagination(props) {
    return (
        <div className='pagination'>
            <Button className="pagination-btn" handleClick={() => props.changePage(-props.currentPage)}>First</Button>
            <Button className="pagination-btn" handleClick={() => props.changePage(-1)}>Previous</Button>
            <span>Page {props.currentPage} of {props.totalPages}</span>
            <Button className="pagination-btn" handleClick={() => props.changePage(1)}>Next</Button>
            <Button className="pagination-btn" handleClick={() => props.changePage(props.totalPages)}>Last</Button>
        </div>
    )
}