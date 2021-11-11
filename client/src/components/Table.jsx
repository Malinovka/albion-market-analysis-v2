import Toolbar from './Toolbar';
import Orders from './Orders';
import Filter from './Filter';
import Pagination from './Pagination';
import React, { useState, useEffect } from 'react';

export default function Table(props) {

    const locationsList = ['Thetford',"Morgana's Rest","Lymhurst","Forest Cross","Merlyn's Rest","Bridgewatch","Highland Cross","Black Market","Martlock","Caerleon","Fort Sterling","Arthur's Rest"]
    const [showFilter, toggleFilter] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    const [filteredLocations, setFilteredLocations] = useState(
        {
            BuyFrom: locationsList,
            SellTo: locationsList
        }
    )

    const filterLocations = (e, locations) => {
        e.preventDefault();
        setFilteredLocations(locations);
    }

    const changePage = (n) => {
        if (page + n <= 0) {
            setPage(1);
            return;
        }
        if (page + n >= Math.ceil(orderCount/30)) {
            setPage(Math.ceil(orderCount/30));
            return;
        }
        setPage(page + n);
    }

    const handleSearchSubmit = (e, value) => {
        e.preventDefault();
        setSearch(value);
    }

    const url = new URL(`http://localhost:3001/profitorders`);
    if (filteredLocations.BuyFrom.length != locationsList.length
    ||  filteredLocations.SellTo.length != locationsList.length) {
        url.search = new URLSearchParams(filteredLocations);
    }
    if (search) {
        url.searchParams.set('search', search);
    }
    url.searchParams.set('page', page);
    

    useEffect(() => {
        console.log(url);
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
            })
        .then(data => {
            setOrders(data.orders);
            setOrderCount(data.orderCount);
        })
        .catch(console.error)

        if (showFilter) {
            toggleFilter(!showFilter);
        }

    }, [filteredLocations, page, search])

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
            <Toolbar toggleFilter={() => toggleFilter(!showFilter)} handleSearchSubmit={handleSearchSubmit} search={search} lang={props.lang}/>
            {showFilter && <Filter  
                                handleSubmit={filterLocations} 
                                handleClose={() => toggleFilter(!showFilter)}
                                currentCheckedLocations={filteredLocations}
                                locationsList = {locationsList}
                                />}
            <Orders lang={props.lang} orders={orders} goToPrev={goToPrev} goToNext={goToNext}/>
            <Pagination currentPage={page} totalPages={Math.ceil(orderCount/30)} changePage={changePage}/>
        </div>
    );
}