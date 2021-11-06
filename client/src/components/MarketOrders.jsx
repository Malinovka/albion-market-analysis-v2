export default function MarketOrders(props) {
    const buyOrders = props.orderList['BuyFrom'];
    const sellOrders = props.orderList['SellTo'];
    
    return (
        <div className='market-orders'>
            <div className='market-order-headers'>
                <span>{props.buyLocation}</span>
                <span className='arrow'>&#10132;</span>
                <span>{props.sellLocation}</span>
            </div>
            <div className='market-order-data'>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Expiry</th>
                            <th>Last update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyOrders.slice(0, 10).map((order) => <tr key={order}><td>{order}</td></tr>)}
                        {buyOrders.length > 10 && <tr className='extra-orders'><td colSpan='5'>... {buyOrders.length - 10} additional orders</td></tr>}
                    </tbody>
                </table>
                
                <table>
                    <thead>
                    <tr>
                            <th>Order Id</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Expiry</th>
                            <th>Last update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellOrders.slice(0, 10).map((order) => <tr key={order}><td>{order}</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}