import profitOrders from '../profitorders.json';
import ProfitOrder from './ProfitOrder';

export default function Orders(props) {
    const headers = ['Icon', 'Name', 'Quality', 'Ench.', 'Buy From', 'Sell To', 'Quantity', 'Total Buy', 'Total Sell', 'Profit ▼', 'Per Item']
    const priorities = [1, 1, 4, 4, 3, 3, 2, 4, 4, 1, 1];
    const { orders } = props;

    return (
        <table id='orders-table'>
        <thead>
            <tr>
                {headers.map((header, index) => <th key={header} className={`p-${priorities[index]}`}>{header}</th>)}
            </tr>
        </thead>
        <tbody>
            {orders.length > 0 ?
                orders.map((order) => <ProfitOrder key={order['_id']} order={order} lang={props.lang}/>)
            : <tr className='empty-table'>
            <td colSpan='10'>
            {props.isLoading ? '' : 'No orders found!'} </td></tr>}
        </tbody>
        </table>
    );
}