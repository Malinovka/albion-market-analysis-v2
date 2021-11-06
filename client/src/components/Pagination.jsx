export default function Pagination(props) {
    return (
        <div className='pagination'>
        <button type='pagination' onClick={props.goToPrev}>Previous</button>
        <button type='pagination' onClick={props.goToNext}>Next</button>
        </div>
    )
}