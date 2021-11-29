import React, { useState } from 'react'
import MarketOrders from './MarketOrders'
import defaultImg from '../imgs/default.png'

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
            <td className='p-1'><img 
                src={`https://render.albiononline.com/v1/item/${order['Item']['Id']}.png?size=50`} 
                alt={order['Item']['LocalizedNames'][lang]}
                onError={(e) => e.target.src=defaultImg}

                /></td>
            <td className='p-1'>{order['Item']['LocalizedNames'][lang]}</td>
            <td className='p-4'>{order['Item']['Quality']}</td>
            <td className='p-4'>{order['Item']['Enchantment']}</td>
            <td className='p-3'>{order['BuyFrom']['Name']}</td>
            <td className='p-3'>{order['SellTo']['Name']}</td>
            <td className='p-2'>{order['Quantity']}</td>
            <td className='p-4'>{order['TotalBuyPrice']}</td>
            <td className='p-4'>{order['TotalSellPrice']}</td>
            <td className='p-1'>{order['Profit']}</td>
            <td className='p-1'>{Math.ceil(order['Profit']/order['Quantity'])}</td>
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