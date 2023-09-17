import { useDispatch, useSelector } from "react-redux";
import "./ProductCard.css";
import { convertToCurrency } from "./features/convertToCurrency";
import { addToCart, selectCartitems } from "./features/cartSlice";


const ProductCard = ({ id, name, images, price, metadata, priceId }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartitems);

    const handleAddToCart = () => {
        const newCarItem = {

            productId: id,
            images: images,
            metadata: metadata,
            name: name,
            price: price,
            priceId: priceId,
            cartItems: cartItems,

        };

        dispatch(addToCart(newCarItem));
    };




    return (
        <div className="card">

            <div className="card_image">
                <img src={images[0]} alt="" />
            </div>
            <div className="card_title">
                <h3>{name}</h3>
            </div>

            <div className="card_price">
                <label>Price ${convertToCurrency(price)}</label>
            </div>

            <div className="card_buttons">
                <button onClick={handleAddToCart}>Add To Cart</button>
                <button>View</button>
            </div>
        </div>
    )
};


export default ProductCard;