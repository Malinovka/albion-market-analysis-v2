import Button from "./Button"

export default function Pagination(props) {
    return (
        <div className='pagination'>
            <div>
                <Button className="pagination-btn" handleClick={() => props.changePage(-props.currentPage)}>{'<<'}</Button>
                <Button className="pagination-btn" handleClick={() => props.changePage(-1)}>{'<'}</Button>
            </div>
            <span>Page {props.totalPages === 0 ? 0 : props.currentPage} of {props.totalPages}</span>
            <div>
                <Button className="pagination-btn" handleClick={() => props.changePage(1)}>{'>'}</Button>
                <Button className="pagination-btn" handleClick={() => props.changePage(props.totalPages)}>{'>>'}</Button>
            </div>
        </div>
    )
}