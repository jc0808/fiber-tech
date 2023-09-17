

import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "./LoginPopUpForm.css";
import { useRef } from "react";
import { auth } from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

const LoginPopUpForm = ({ loginForm }) => {

    // const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const user = useSelector(selectUser);



    const handleLogin = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== null) {

            const credential = EmailAuthProvider.credential(user.email, passwordRef.current.value);
            reauthenticateWithCredential(auth.currentUser, credential)
                .then(() => loginForm(false))
                .catch(error => {
                    if (error) {
                        console.log(error)
                    }
                });
        }



    }
    return (
        <div className="pop-up-login-form">
            <div className="login_body">
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <input type="email" placeholder={user.email} value={user.email} disabled />
                    <input ref={passwordRef} type="password" />

                    <button type="submit">Sign In</button>
                </form>

                {/* <div className="login_lowerBottom">
                        <label>Don't have an Account? <span onClick={() => renderSignUp()}>Sign Up</span></label>
                        <label>Forgot your password? <span>Reset Password</span></label>
                    </div> */}
            </div>
        </div>
    )
};

export default LoginPopUpForm;