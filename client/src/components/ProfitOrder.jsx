import React, { useState } from 'react'
import MarketOrders from './MarketOrders'
import defaultImg from '../imgs/default.png'
import ench_0 from '../imgs/ench_0.png'
import ench_1 from '../imgs/ench_1.png'
import ench_2 from '../imgs/ench_2.png'
import ench_3 from '../imgs/ench_3.png'
import silver from '../imgs/silver.png'

export default function ProfitOrder(props) {
    const {order} = props;
    const {lang} = props;

    const qualities = ['Normal', 'Good', 'Outstanding', 'Excellent', 'Masterpiece']
    const enchantments = [ench_0, ench_1, ench_2, ench_3]

    const [dropdown, toggleDropdown] = useState(false);

    function handleClick() {
        toggleDropdown(!dropdown);
    }

    function roundedMillions(num) {
        return `${(num / 1000000).toFixed(1)}MM`
    }

    return (
        <>
        <tr className={dropdown? "profit-order dropdown" : "profit-order"} 
            onClick={handleClick}
            title={dropdown? `${order['Item']['LocalizedNames'][lang]} - Click to Collapse` : `${order['Item']['LocalizedNames'][lang]} - Click to Expand`}>
            <td className='p-1'><img 
                src={`https://render.albiononline.com/v1/item/${order['Item']['Id']}.png?size=60&quality=${order['Item']['Quality']}`} 
                alt={order['Item']['LocalizedNames'][lang]}
                onError={(e) => e.target.src=defaultImg}

                /></td>
            <td className='p-1'>{order['Item']['LocalizedNames'][lang]}</td>
            <td className='p-4'>{qualities[order['Item']['Quality'] - 1]}</td>
            <td className='p-4'><img className='ench-img' src={enchantments[order['Item']['Enchantment']]}/></td>
            <td className='p-3'>{order['BuyFrom']['Name']}</td>
            <td className='p-3'>{order['SellTo']['Name']}</td>
            <td className='p-2'>{order['Quantity']}</td>
            <td className='p-4'>
                <span className='price-container'>
                    <img className='silver-img' src={silver}/>
                    {order['TotalBuyPrice'] > 999999 ? roundedMillions(order['TotalBuyPrice']) : Number(order['TotalBuyPrice']).toLocaleString()}
                </span>
            </td>
            <td className='p-4'>
                <span className='price-container'>
                    <img className='silver-img' src={silver}/>
                    {order['TotalSellPrice'] > 999999 ? roundedMillions(order['TotalSellPrice']) : Number(order['TotalSellPrice']).toLocaleString()}
                </span>
            </td>
            <td className='p-1'>
            <span className='price-container'>
                    <img className='silver-img' src={silver}/>
                    {order['Profit'] > 999999 ? roundedMillions(order['Profit']) : Number(order['Profit']).toLocaleString()}
                </span>
            </td>
            <td className='p-4'>
                <span className='price-container'>
                    <img className='silver-img' src={silver}/>
                    {Math.ceil(order['Profit']/order['Quantity']) > 999999 ? roundedMillions(Math.ceil(order['Profit']/order['Quantity'])) : Number(Math.ceil(order['Profit']/order['Quantity'])).toLocaleString()}
                </span>
            </td>
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