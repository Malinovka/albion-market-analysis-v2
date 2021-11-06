import Search from './Search';
import Button from './Button';

export default function Toolbar(props) {
    return (
        <div className='toolbar'>
            <Search />
            <Button handleClick={props.toggleFilter}>Filter</Button>
        </div>
    );
}