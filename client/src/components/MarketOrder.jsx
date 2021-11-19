import { timeAgo } from '../scripts/timeAgo'

export default function MarketOrder(props) {
    const { order } = props;
    return (
        <tr className='market-order'>
            <td>{order.UnitPriceSilver}</td>
            <td>{order.Amount}</td>
            <td className='p-2'>{timeAgo(order.Expires)}</td>
            <td className='p-2'>{timeAgo(order.updatedAt)}</td>
        </tr>
    )
}
