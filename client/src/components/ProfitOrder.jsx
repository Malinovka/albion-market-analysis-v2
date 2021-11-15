import React, { useState } from 'react'
import MarketOrders from './MarketOrders'

export default function ProfitOrder(props) {
    const {order} = props;
    const {lang} = props;

    const [dropdown, toggleDropdown] = useState(false);

    function handleClick() {
        toggleDropdown(!dropdown);
    }

    return (
        <>
        <tr className={dropdown? "profit-order dropdown" : "profit-order"} 
            onClick={handleClick}
            title={dropdown? `${order['Item']['LocalizedNames'][lang]} - Click to Collapse` : `${order['Item']['LocalizedNames'][lang]} - Click to Expand`}>
            <td><img src={`https://render.albiononline.com/v1/item/${order['Item']['Id']}.png?size=50`} alt={order['Item']['LocalizedNames'][lang]}/></td>
            <td>{order['Item']['LocalizedNames'][lang]}</td>
            <td>{order['Item']['Quality']}</td>
            <td>{order['Item']['Enchantment']}</td>
            <td>{order['BuyFrom']['Name']}</td>
            <td>{order['SellTo']['Name']}</td>
            <td>{order['Quantity']}</td>
            <td>{order['TotalBuyPrice']}</td>
            <td>{order['TotalSellPrice']}</td>
            <td>{order['Profit']}</td>

        </tr>
        {dropdown && 
            <tr>
                <td colSpan="10" className='market-orders-td'>
                    <MarketOrders 
                        orders={order['Orders']} 
                        buyLocation={order['BuyFrom']['Name']}
                        sellLocation={order['SellTo']['Name']}
                    />
                </td>
            </tr>}
        </>
    );
}