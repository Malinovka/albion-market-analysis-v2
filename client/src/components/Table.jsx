import Toolbar from './Toolbar';
import Orders from './Orders';
import Filter from './Filter';
import Pagination from './Pagination';
import React, { useState, useEffect } from 'react';

export default function Table(props) {
    const [showFilter, toggleFilter] = useState(true);
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState(
        {
            BuyFrom: ['Thetford',"Morgana's Rest","Lymhurst","Forest Cross","Merlyn's Rest","Bridgewatch","Highland Cross","Black Market","Martlock","Caerleon","Fort Sterling","Arthur's Rest"],
            SellTo: ['Thetford',"Morgana's Rest","Lymhurst","Forest Cross","Merlyn's Rest","Bridgewatch","Highland Cross","Black Market","Martlock","Caerleon","Fort Sterling","Arthur's Rest"]
        }
    )

    const filterLocations = (e, locations) => {
        e.preventDefault();
        setFilteredLocations(locations);
    }

    const url = new URL(`http://localhost:3001/profitorders`);
    url.search = new URLSearchParams(filteredLocations);

    useEffect(() => {
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
            })
        .then(data => {
            setOrders(data);
        })
        .catch(console.error)

        toggleFilter(!showFilter);

    }, [filteredLocations])

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
                                handleSubmit={filterLocations} 
                                handleClose={() => toggleFilter(!showFilter)}
                                currentCheckedLocations={filteredLocations}
                                />}
            <Orders lang={props.lang} orders={orders} goToPrev={goToPrev} goToNext={goToNext}/>
            <Pagination />
        </div>
    );
}