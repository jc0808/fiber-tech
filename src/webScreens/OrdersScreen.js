import "./OrdersScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectOrders } from "../features/ordersSlice";
import { convertToCurrency } from "../features/convertToCurrency";

const OrdersScreen = () => {

    const orders = useSelector(selectOrders);
    const user = useSelector(selectUser);

    const displayOrders = orders.orders?.map(order => {

        let totalPricePaid = 0;

        order.line_items.forEach(item => totalPricePaid += item.price.unit_amount * item.quantity)
        return (
            <tr key={order.orderId}>
                <td>{new Date(order.created * 1000).toLocaleDateString()}</td>
                <td>{order.orderId}</td>
                <td>
                    {order.line_items.map(item => {
                        return (
                            <ul key={order.line_items.indexOf(item)}>
                                <li>
                                    {item?.description} <span id="quantity_span">({item.quantity})</span>
                                </li>
                            </ul>
                        )
                    })}
                </td>
                <td>${convertToCurrency(totalPricePaid)}</td>
            </tr>
        )
    });

    return (
        <div className="orders">

            {orders.orders
                ?
                <div className="orders_body">
                    <table className="orders_table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Products</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {user ? displayOrders : null}

                        </tbody>
                    </table>

                </div>
                :
                <h2>You have no orders at this time.</h2>
            }
        </div>
    )
};

export default OrdersScreen;