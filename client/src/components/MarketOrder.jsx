import { timeAgo } from '../scripts/timeAgo'

export default function MarketOrder(props) {
    const { order } = props;
    return (
        <tr className='market-order'>
            <td>{order._id}</td>
            <td>{order.UnitPriceSilver}</td>
            <td>{order.Amount}</td>
            <td>{timeAgo(order.Expires)}</td>
            <td>{timeAgo(order.updatedAt)}</td>
        </tr>
    )
}
