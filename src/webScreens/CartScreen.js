import { useDispatch, useSelector } from "react-redux";
import "./CartScreen.css";
import { deleteItemFromCart, selectCartitems, selectLineItems, selectTotalPriceInCart } from "../features/cartSlice";
import { convertToCurrency } from "../features/convertToCurrency";
import { selectUser } from "../features/userSlice";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import db from "../firebase";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

const CartScreen = () => {

    const totalPrice = useSelector(selectTotalPriceInCart);
    const cartItems = useSelector(selectCartitems);
    const user = useSelector(selectUser);
    const line_items = useSelector(selectLineItems);

    const dispatch = useDispatch();


    useEffect(() => {
        if (user) {
            window.localStorage.setItem("data", JSON.stringify({
                cartItems: cartItems
            }))
        }
    }, [cartItems, user])


    const handleDeleteRow = (id) => {
        dispatch(deleteItemFromCart({
            id: id,
            cartItems: cartItems,
        }));
    }

    const displayItems = cartItems?.map(item => {
        return (
            <tr key={item?.productId}>
                <td>{item?.name}</td>
                <td><img src={item?.images[0]} alt="" /></td>
                <td>{item?.quantity}</td>
                <td>${convertToCurrency(item?.price)}</td>
                <td><span className="table_row_delete" onClick={() => handleDeleteRow(item.productId)}>❌</span></td>
            </tr>
        )
    });

    const handleCheckout = async () => {


        if (user) {
            console.log("checking out");

            const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
                line_items: line_items,
                mode: "payment",
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

            onSnapshot(docRef, async (snap) => {
                const { error, sessionId } = snap.data();

                if (error) {
                    alert(`An error has occured: ${error.message}`);
                }

                if (sessionId) {
                    const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

                    stripe.redirectToCheckout({ sessionId });
                    window.localStorage.removeItem("data");
                }
            });
        } else {
            alert("You need to sign in to check out.")
        }




    };


    return (
        <div className="cart">




            <div className="cartBody">
                {cartItems?.length === 0 ?
                    <h2>You Have No Items in Cart.</h2> :
                    <>
                        <div className="table_container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>

                                <tbody className="table_body">
                                    {displayItems}

                                </tbody>

                                <tfoot className="table_foot">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Total Price:</th>
                                        <th>${convertToCurrency(totalPrice)}</th>
                                    </tr>


                                </tfoot>
                            </table>
                        </div>

                        <button onClick={handleCheckout}>Check Out</button>
                    </>
                }
            </div>
        </div>
    )
};


export default CartScreen;