import { useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "./websiteImages/FiberTech.png";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { selectNumberOfItemsInCart } from "./features/cartSlice";
import { selectNumberOfOrders } from "./features/ordersSlice";

const Nav = () => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const cartItemsLength = useSelector(selectNumberOfItemsInCart);

    const numberOfOrders = useSelector(selectNumberOfOrders);


    const handleLogout = () => {
        auth.signOut();
        navigate("/");
        window.location.reload();
    };

    // console.log(user?.displayName?.split(" "))

    return (
        <header className="homeScreen_header">
            <img src={logo} alt="" />

            {user?.displayName ? <h1 style={{ padding: "25px" }}>Welcome, {user?.displayName ? user?.displayName.split(" ")[0] : ""}</h1> : null}

            <div className="header_icons">
                <h2 onClick={() => navigate('/')}>Home</h2>
                {user ? <h2 onClick={() => navigate("/account")}>Account</h2> : null}
                {user?.displayName ? <h2 onClick={() => handleLogout()}>Log Out</h2> : <h2 onClick={() => navigate('/login')} >Login</h2>}
                {user ? <h2 onClick={() => navigate('/orders')}>Orders ({numberOfOrders})</h2> : null}
                <div id="cartIcon">
                    <div onClick={() => navigate('/cart')} id="cartBackground">{cartItemsLength}</div>
                </div>
            </div>
        </header>
    )
};



export default Nav;