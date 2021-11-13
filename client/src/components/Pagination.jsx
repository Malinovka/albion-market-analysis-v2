import Button from "./Button"

export default function Pagination(props) {
    return (
        <div className='pagination'>
            <div>
                <Button className="pagination-btn" handleClick={() => props.changePage(-props.currentPage)}>First</Button>
                <Button className="pagination-btn" handleClick={() => props.changePage(-1)}>Previous</Button>
            </div>
            <span>Page {props.totalPages === 0 ? 0 : props.currentPage} of {props.totalPages}</span>
            <div>
                <Button className="pagination-btn" handleClick={() => props.changePage(1)}>Next</Button>
                <Button className="pagination-btn" handleClick={() => props.changePage(props.totalPages)}>Last</Button>
            </div>
        </div>
    )
}