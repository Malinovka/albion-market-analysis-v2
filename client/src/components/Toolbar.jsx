import Search from './Search';
import Button from './Button';

export default function Toolbar(props) {
    return (
        <div className='toolbar'>
            <Search handleChange={props.handleSearchChange} search={props.search} handleSubmit={props.handleSearchSubmit} lang={props.lang}/>
            <span className='toolbar-right'>
                <Button handleClick={props.toggleFilter}>Filter</Button>
                <Button className='refresh-btn' handleClick={props.handleRefresh}>Refresh</Button>
            </span>
        </div>
    );
}