import { useRef, useState } from "react";
import "./LoginScreen.css";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateDisplayName } from "../features/userSlice";

const LoginScreen = () => {

    const [screen, setScreen] = useState(null);

    const user = useSelector(selectUser);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const displayNameRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const renderForm = (num) => {
        setScreen(num);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== null && emailRef.current.value !== null) {
            signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            ).then(user => user ? navigate("/") : null).catch(error => alert(error.message))

            e.target["email"].value = null;
            e.target["password"].value = null;
        }


    };

    const handleSubmitForSignUp = (e) => {
        e.preventDefault();

        if (confirmPasswordRef.current.value === passwordRef.current.value && emailRef !== null) {
            createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            ).then(setScreen(2)).catch(error => alert(error.message));

            e.target["email"].value = null;
            e.target["password"].value = null;
            e.target["confirmP"].value = null;
        } else {
            console.log("Passwords do not match.")
        }
    };

    const handleSubmitForAccountInfo = (e) => {
        e.preventDefault();

        // const customerRef = collection(db, "customers");

        // const addInfo = async () => {
        //     await addDoc(collection(db, `customers/${user.uid}/user_info`, {
        //         firstName: firstNameRef.current.value,
        //         lastName: lastNameRef.current.value,
        //     }))
        //         .then(navigate('/')).catch(error => alert(error.message))
        // }

        // addInfo();

        const update = {
            uuid: user.uuid,
            email: user.email,
            displayName: displayNameRef.current.value !== null && displayNameRef.current.value !== "" ? displayNameRef.current.value : user.displayName,
        };

        updateProfile(auth.currentUser, {
            displayName: displayNameRef.current.value,
        }).then(dispatch(updateDisplayName(update))).catch(error => alert(error.message));

        e.target["displayName"].value = null;

        navigate("/");
    };

    const renderLogin = () => {
        switch (screen) {
            case 1:
                return (
                    <div className="login_body">
                        <h2>Sign Up</h2>

                        <form onSubmit={handleSubmitForSignUp}>
                            <input ref={emailRef} type="email" placeholder="Email" id="email" />
                            {/* <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder="Firstname & lastName" /> */}

                            <input ref={passwordRef} type="password" placeholder="Password" id="password" />
                            <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" id="confirmP" />

                            <button type="submit">Sign Up</button>
                        </form>
                        <br />

                        <div className="login_lowerBottom">
                            <label>Already have an Account? <span onClick={() => renderForm(0)}>Login</span></label>
                            {/* <label>Forgot your password? <span onClick={() => renderForm(3)}>Reset Password</span></label> */}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="login_body">
                        <h2>Account Info</h2>

                        <form onSubmit={handleSubmitForAccountInfo}>
                            <input ref={displayNameRef} type="text" placeholder="firstname & lastname" id="displayName" />
                            {/* <input ref={lastNameRef} type="text" placeholder="Lastname" /> */}
                            {/* <input ref={confirmPasswordRef} type="text" placeholder="Confirm Password" /> */}

                            <button type="submit">Submit</button>
                        </form>

                        {/* <div className="login_lowerBottom">
                            <label>Don't have an Account? <span onClick={() => renderSignUp()}>Sign Up</span></label>
                            <label>Forgot your password? <span>Reset Password</span></label>
                        </div> */}
                    </div>
                );

            case 3:
                return (
                    <div className="login_body">
                        <h2>Reset Password</h2>

                        <form>
                            <input ref={emailRef} type="email" placeholder="Email" id="email" />
                            {/* <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder="Firstname & lastName" /> */}
                            <button type="submit">Send Email</button>
                        </form>

                        <div className="login_lowerBottom">
                            <label>Already have an Account? <span onClick={() => renderForm(0)}>Login</span></label>
                            <label>Don't have an Account? <span onClick={() => renderForm(1)}>Sign Up</span></label>
                            {/* <label>Forgot your password? <span>Reset Password</span></label> */}
                        </div>
                    </div>
                )

            default:
                return (<div className="login_body">
                    <h2>Login</h2>

                    <form onSubmit={handleSubmit}>
                        <input ref={emailRef} type="email" placeholder="Email" id="email" />
                        <input ref={passwordRef} type="password" placeholder="Password" id="password" />

                        <button type="submit">Sign In</button>
                    </form>

                    <br />

                    <div className="login_lowerBottom">
                        <label>Don't have an Account? <span onClick={() => renderForm(1)}>Sign Up</span></label>
                        {/* <label>Forgot your password? <span onClick={() => renderForm(3)}>Reset Password</span></label> */}
                    </div>
                </div>);
        }
    }


    return (
        <div className="login">

            {renderLogin()}


        </div>
    )
};


export default LoginScreen;