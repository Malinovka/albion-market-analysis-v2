export default function Button(props) {
    return (
        <button className={props.className} onClick={props.handleClick}>{props.children}</button>
    );
}