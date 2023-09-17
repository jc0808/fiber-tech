import { useRef, useState } from "react";
import "./AccountScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateDisplayName } from "../features/userSlice";
import { deleteUser, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import LoginPopUpForm from "../LoginPopUpForm";
import { useNavigate } from "react-router-dom";
const AccountScreen = () => {

    const newDisplayName = useRef(null);

    const newEmail = useRef(null)

    const oldPRef = useRef(null);

    const newPRef = useRef(null);

    const confirmNewPRef = useRef(null);

    const [enableB, setEnableB] = useState(true);

    const [changeP, setChangeP] = useState(false);

    const [message, setMessage] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const user = useSelector(selectUser);

    const dispath = useDispatch();
    const navigate = useNavigate();

    //for Re-authentication
    const [showFormLogin, setShowFormLogin] = useState(false);

    const loginForm = (boolean) => {
        setShowFormLogin(boolean);
    };




    const handleEnable = (e) => {
        if (e.target.value !== null && e.target.value !== "") {
            if (enableB) {
                setEnableB(false);
            }
        } else {
            setEnableB(true);
        }
    };


    const handleUpdateInfo = (e) => {
        e.preventDefault();

        const update = {
            uid: user.uid,
            email: newEmail.current.value !== null && newEmail.current.value !== "" ? newEmail.current.value : user.email,
            displayName: newDisplayName.current.value !== null && newDisplayName.current.value !== "" ? newDisplayName.current.value : user.displayName,
        };

        if (newDisplayName.current.value !== null && newDisplayName.current.value !== "" && newEmail.current.value !== null
            && newEmail.current.value !== "") {
            updateEmail(auth.currentUser, newEmail.current.value)
                .then(() => updateProfile(auth.currentUser, {
                    displayName: newDisplayName.current.value
                }))
                .then(() => setMessage("Name and Email Updated!"))
                .catch(error => {
                    if (error) {
                        setErrorMessage("You must re-login to change your email");
                    }
                })



        } else if (newDisplayName.current.value !== null && newDisplayName.current.value !== "") {
            updateProfile(auth.currentUser, {
                displayName: newDisplayName.current.value
            })
                // .then(() => dispath(updateDisplayName(update)))
                .then(() => {
                    dispath(updateDisplayName(update));
                    setMessage("Name Updated");
                })

                .catch(error => console.log(error));
        } else if (newEmail.current.value !== null && newEmail.current.value !== "") {
            updateEmail(auth.currentUser, newEmail.current.value)
                .then(() => {
                    // dispath(updateEmail(update));
                    setMessage("Email Updated");
                })
                .catch(error => {
                    if (error) {
                        setErrorMessage("You must re-login to change your email")
                    }
                });
        }

        e.target["name"].value = null;
        e.target["email"].value = null;
        setEnableB(true);


    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        if (newPRef.current.value !== null && newPRef.current.value !== "" &&
            confirmNewPRef.current.value !== null & confirmNewPRef.current.value !== "") {
            if (newPRef.current.value === confirmNewPRef.current.value) {
                updatePassword(auth.currentUser, newPRef.current.value)
                    .then(() => setMessage("Password Succesfully Changes!"))
                    .catch(error => {
                        if (error) {
                            setShowFormLogin(true);
                        }
                    })
            } else {
                setErrorMessage("Passwords do not Matcb.")
            }
        }





        e.target["oldP"].value = null;
        e.target["newP"].value = null;
        e.target["confirmNewP"].value = null;


    };

    const handleDeleteAccount = () => {
        deleteUser(auth.currentUser)
            .catch(error => {
                if (error) {
                    setShowFormLogin(true);
                }
            });
        navigate("/");

    }

    return (
        <div className="account">
            <h2>Account Info</h2>

            <br />

            {message ? <h3 style={{ color: 'green', textAlign: "center" }}>{message}</h3> : null}
            {errorMessage ? <h3 style={{ color: 'rgb(140, 39, 39)', textAlign: "center" }}>{errorMessage}</h3> : null}

            {showFormLogin ? <LoginPopUpForm loginForm={loginForm} /> : null}



            <div className="account_body">



                <form className="info__body" onSubmit={handleUpdateInfo}>


                    <label htmlFor="name">Full Name</label>
                    <input id="name" ref={newDisplayName} onChange={handleEnable} type="text" placeholder={user.displayName} />

                    <br />
                    <label htmlFor="email">Email</label>
                    <input id="email" ref={newEmail} type="email" onChange={handleEnable} placeholder={user.email} />

                    <div className="update_info_button">
                        <button type="submit" disabled={enableB}>Update Info</button>
                    </div>
                </form>

                <div className="password__body">
                    <h2>Password Change</h2>
                    <br />

                    {changeP ? null : <button onClick={() => setChangeP(true)}>Change Your Password</button>}

                    {changeP
                        ?
                        <>
                            <form onSubmit={handleUpdatePassword}>

                                <input id="oldP" ref={oldPRef} type="password" placeholder="Old Password" />
                                <br />

                                <input id="newP" ref={newPRef} type="password" placeholder="New Password" />
                                <br />

                                <input id="confirmNewP" ref={confirmNewPRef} type="password" placeholder="Confirm New Password" />
                                <br />
                                <button type="submit">Update Password</button>
                            </form>
                        </> : null}
                </div>




            </div>

            <div className="delete_button">
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </div>
    )
};


export default AccountScreen;