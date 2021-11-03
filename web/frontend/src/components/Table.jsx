import Toolbar from './Toolbar';
import Orders from './Orders';
import Filter from './Filter';
import Pagination from './Pagination';
import React, { useState } from 'react';

export default function Table(props) {
    const [showFilter, toggleFilter] = useState(false);
    const [page, setPage] = useState(1);

    function goToPrev() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function goToNext() {
        setPage(page + 1);
    }

    return (
        <div className='dataTable'>
            <Toolbar toggleFilter={() => toggleFilter(!showFilter)}/>
            {showFilter && <Filter 
                                checkedLocations={props.checkedLocations} 
                                handleSubmit={props.filterLocations} 
                                handleClose={() => toggleFilter(!showFilter)}/>}
            <Orders lang={props.lang} goToPrev={goToPrev} goToNext={goToNext}/>
            <Pagination />
        </div>
    );
}