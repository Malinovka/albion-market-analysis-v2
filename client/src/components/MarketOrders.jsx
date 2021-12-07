import MarketOrder from "./MarketOrder";

export default function MarketOrders(props) {
    const buyOrders = props.orders['BuyFrom'];
    const sellOrders = props.orders['SellTo'];

    return (
        <div className='market-orders'>
            <div className='market-order-headers'>
                <span>{props.buyLocation}</span>
                <span className='arrow'>&#10132;</span>
                <span>{props.sellLocation}</span>
            </div>
            <div className='market-order-data'>
                <table className='mo-left'>
                    <thead>
                        <tr>
                            <th>Buy Price▲</th>
                            <th>Qty.</th>
                            <th className='p-2'>Expiry</th>
                            <th className='p-2'>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyOrders.slice(0, 9).map((order) =>
                            <MarketOrder 
                                key={order._id}
                                order={order}
                            />
                        )}
                        {buyOrders.length > 10 && 
                            <tr className='extra-orders'>
                                <td colSpan='5'>... {buyOrders.length - 10} additional orders</td></tr>}
                    </tbody>
                </table>
                
                <table className='mo-right'>
                    <thead>
                    <tr>
                            <th>Sell Price▼</th>
                            <th>Qty.</th>
                            <th className='p-2'>Expiry</th>
                            <th className='p-2'>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellOrders.slice(0, 9).map((order) =>
                            <MarketOrder 
                                key={order._id}
                                order={order}
                            />
                        )}
                        {sellOrders.length > 10 && <tr className='extra-orders'><td colSpan='5'>... {sellOrders.length - 10} additional orders</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}