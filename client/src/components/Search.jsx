export default function Search(props) {
    return(
        <form>
            <input
                type="text"
                id="item-search"
                placeholder="Search Items..."
                name="s"
                autoComplete='off'
            />
            <button type="submit">Search</button>
        </form>
    )
}