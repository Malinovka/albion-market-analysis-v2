import profitOrders from '../profitorders.json';
import ProfitOrder from './ProfitOrder';

export default function Orders(props) {
    const headers = ['Icon', 'Name', 'Quality', 'Ench.', 'Buy From', 'Sell To', 'Quantity', 'Total Buy', 'Total Sell', 'Profit']
    const { orders } = props;

    return (
        <table id='orders-table'>
        <thead>
            <tr>
                {headers.map((header) => <th key={header}>{header}</th>)}
            </tr>
        </thead>
        <tbody>
            {orders.length > 0 ?
                orders.map((order) => <ProfitOrder key={order['_id']} order={order} lang={props.lang}/>)
            : 'No orders found!'}
        </tbody>
        </table>
    );
}