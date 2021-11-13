import Toolbar from './Toolbar';
import Orders from './Orders';
import Filter from './Filter';
import Pagination from './Pagination';
import Loading from './Loading';
import React, { useState, useEffect } from 'react';

export default function Table(props) {

    const locationsList = [
        "Arthur's Rest",  'Black Market',
        'Bridgewatch',    'Caerleon',
        'Forest Cross',   'Fort Sterling',
        'Highland Cross', 'Lymhurst',
        'Martlock',       "Merlyn's Rest",
        "Morgana's Rest", 'Thetford'
      ]
    const [filteredLocations, setFilteredLocations] = useState(
        {
            BuyFrom: locationsList,
            SellTo: locationsList
        }
    )
    const [showFilter, toggleFilter] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const handleRefresh = () => {
        setRefresh(!refresh);
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
    
    const fetchData = () => {
        setLoading(true);
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
            setLoading(false);
        })
        .catch(console.error)

        if (showFilter) {
            toggleFilter(!showFilter);
        }
    }

    useEffect(() => {
        fetchData();
    }, [filteredLocations, page, search, refresh])

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
            <Toolbar 
                toggleFilter={() => toggleFilter(!showFilter)}
                handleSearchSubmit={handleSearchSubmit} 
                handleRefresh={handleRefresh}
                search={search} 
                lang={props.lang}/>
            {showFilter && <Filter  
                                handleSubmit={filterLocations} 
                                handleClose={() => toggleFilter(!showFilter)}
                                currentCheckedLocations={filteredLocations}
                                locationsList = {locationsList}/>}
            <div className='orders-container'>
                {loading && <Loading />}
                <Orders 
                    lang={props.lang} 
                    orders={orders} 
                    goToPrev={goToPrev} 
                    goToNext={goToNext}/>
            </div>
            <Pagination 
                currentPage={page} 
                totalPages={Math.ceil(orderCount/30)} 
                changePage={changePage}/>
        </div>
    );
}