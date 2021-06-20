import { useState, useEffect, useContext } from "react";
import { GoogleLogin } from 'react-google-login'
import { Button } from "react-bootstrap";
import Image from 'next/image'
import UserContext from '../../UserContext';
import AppHelper from "../../app-helper"

export default function Homepage() {
    const {setAccessToken} = useContext(UserContext)

    const [selectedOption, setselectedOption] = useState("");

    const [email, setEmail] = useState("");
    const [initEmailError, setInitEmailError] = useState("");
    const [isEmailChecking, setIsEmailChecking] = useState(false);
    const [initialFormError, setInitialFormError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [regFirstNameEmpty, setRegFirstNameEmpty] = useState(false);
    const [lastName, setLastName] = useState("");
    const [regLastNameEmpty, setRegLastNameEmpty] = useState(false);
    const [password1, setPassword1] = useState("");
    const [regPassword1Invalid, setRegPassword1Invalid] = useState(false);
    const [regPassword1State, setRegPassword1State] = useState("");
    const [password2, setPassword2] = useState("");
    const [regPassword2Invalid, setRegPassword2Invalid] = useState(false);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegisterFormValid, setIsRegisterFormValid] = useState(false);

    const [loginPassword, setLoginPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    useEffect(() => {
        //todo: handling of multiple first name in password validation
        if (isRegisterClicked) {
            (firstName==="") ? setRegFirstNameEmpty(true) : setRegFirstNameEmpty(false);
            (lastName==="") ? setRegLastNameEmpty(true) : setRegLastNameEmpty(false);
            (password1!==password2) ? setRegPassword2Invalid(true) : setRegPassword2Invalid(false);

            if (password1.length<8 || password1.length>16) {
                setRegPassword1State("Password should be 8 to 16 characters only")
            } else if (!specialCharacters.test(password1)) {
                setRegPassword1State("Password should contain atleast one special character")
            } else if (password1.toLowerCase().includes(firstName.toLowerCase())) {
                setRegPassword1State("Password should not contain your first name")
            } else {
                setRegPassword1State("")
            }

            (regPassword1State!=="") ? setRegPassword1Invalid(true) : setRegPassword1Invalid(false);
            (!regFirstNameEmpty && !regLastNameEmpty && !regPassword1Invalid && !regPassword2Invalid) ?  setIsRegisterFormValid(true) : setIsRegisterFormValid(false);
        }

    }, [firstName, lastName, password1, password2, regFirstNameEmpty, regLastNameEmpty, regPassword1Invalid, regPassword2Invalid, isRegisterClicked, isRegisterFormValid, regPassword1State])

    useEffect(() => {
        if (validEmail.test(email)) {
            setInitEmailError("")
        } 
    }, [email])

    const checkEmail = (e) =>{
        e.preventDefault();

        if (validEmail.test(email)) {
            setIsEmailChecking(true);

            fetch(`${AppHelper.API_URL}/api/users/email-exists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setIsEmailChecking(false);
                if (data.loginType===null) {
                    setInitEmailError("")
                    setselectedOption("registerForm")
                } else if (data.loginType==="email") {
                    setInitEmailError("")
                    setselectedOption("passwordForm")
                } else if (data.loginType==="google") {
                    setInitEmailError("Please login using Google")
                }
            });
        } else {
            setInitEmailError("Please enter a valid email address")
        }
    }

    const registerAccount = (e) => {
        e.preventDefault();

        setIsRegisterClicked(true);

        if (isRegisterFormValid) {
            setIsRegistering(true);

            fetch(`${AppHelper.API_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password1
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setIsRegistering(false);
                (data) ?  setselectedOption("passwordForm") : setselectedOption("");
            });
        }
    }

    const login = (e) => {
        e.preventDefault();

        if (loginPassword!=="") {
            setLoginStatus("");
            setIsLoggingIn(true);

            fetch(`${AppHelper.API_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: loginPassword
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.accessToken) {
                    setIsLoggingIn(false)
                    setAccessToken(data.accessToken)
                    localStorage.setItem("accessToken", data.accessToken)
                } else {
                    setIsLoggingIn(false)
                    setLoginStatus("Incorrect Password")
                }
            });
        } else {
            setLoginStatus("Please enter your password")
        }
    }

    const authenticateGoogleToken = (response) => {    
        fetch(`${AppHelper.API_URL}/api/users/verify-google-id-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tokenId: response.tokenId,
             }),
        })
        .then((response) => response.json())
        .then((data) => {    
            if (data.accessToken !== undefined) {
                setInitialFormError("")
                setIsLoggingIn(false)
                setAccessToken(data.accessToken)
                localStorage.setItem("accessToken", data.accessToken)

            } else if (data.error === "google-auth-error") {
                setInitialFormError("Google authentication failed")
            } else if (data.error === "login-type-error") {
                setInitialFormError("Please log in using the Email option")
            }
        });
    };

    const initialFormErrorDisplay = (initialFormError!=="") ? (<small className="form-text text-muted has-error">{initialFormError}</small>) : null;
    const initialForm = (selectedOption==="") ? (
        <div className="d-flex flex-column">
            <div className="mb-4 text-break">
                Welcome! How would you like to connect?
            </div>
            <button id={'js_click_showEmailForm'} className="btn btn-lg btn-white my-2 signup-option__icon signup-option__icon-email" onClick={()=>setselectedOption("emailForm")}>Email</button>
            <GoogleLogin
                buttonText="Google"
                onSuccess={authenticateGoogleToken}
                onFailure={authenticateGoogleToken}
                cookiePolicy={"single_host_origin"}
                clientId="563020837047-iq6rrfqp70fgpjv4lgjnas7vp3obocgu.apps.googleusercontent.com"
                render={renderProps => (
                        <button onClick={renderProps.onClick} id={'js_click_googleSignIn'} className="btn btn-lg btn-white my-2 signup-option__icon signup-option__icon-google">Google</button>
                )}
            />
            {initialFormErrorDisplay}
        </div>
    ) : null;

    const emailClassName = (initEmailError!=="") ? 'form-control form-control-lg form-control--line has-error' : 'form-control form-control-lg form-control--line';
    const checkEmailBtnClass = (isEmailChecking) ? 'btn btn-lg btn-success disabled' : 'btn btn-lg btn-success';
    const checkEmailBtnValue = (isEmailChecking) ? (<div className="spinner spinner-md"></div>) : "Next";
    const emailError = (initEmailError!=="") ? (<small className="form-text text-muted has-error">{initEmailError}</small>) : null;
    const emailInitialForm = (selectedOption==="emailForm") ? (
        <div className="d-flex flex-column">
            <form>
                <div className="form-group pb-3">
                    <input type="email" 
                            className={emailClassName} 
                            id="login" 
                            aria-label="Email" 
                            placeholder="Enter your email to begin" 
                            value={email} 
                            onChange={(e) => { setEmail(e.target.value); }} 
                    />
                    {emailError}
                </div>
                <div className="d-flex justify-content-between">
                    <a as={Button} id="js_click_showSignInOptions"
                        className="signup-controls__cancel" 
                        onClick={()=> {
                            setselectedOption("")
                        }} >Cancel</a>
                    <button id="js_click_submitLogin" className={checkEmailBtnClass} onClick={(e)=> {checkEmail(e)} }>{checkEmailBtnValue}</button>
                </div>
            </form>
        </div>
    ) : null;

    const loginPasswordClasses = (loginStatus!=="") ? 'form-control form-control-lg form-control--line has-error' : 'form-control form-control-lg form-control--line';
    const loginPasswordError = (loginStatus!=="") ? (<small className="form-text text-muted has-error">{loginStatus}</small>) : null;
    const loginBtnClass = (isLoggingIn) ? 'btn btn-lg btn-success disabled' : 'btn btn-lg btn-success';
    const loginBtnValue = (isLoggingIn) ? (<div className="spinner spinner-md"></div>) : "Login";
    const emailPasswordForm = (selectedOption==="passwordForm") ? (
        <div className="d-flex flex-column">
            <div className="signup-controls__avatar pb-4">
                <a id="js_click_goBack" className="avatar d-flex" href="#" >
                    <i as={Button} className="expensicons expensicons-caret-left signup-controls__back-arrow" onClick={()=>setselectedOption("emailForm")}></i>
                    <Image id={'homepage_user_icon'} className="rounded-circle avatar-img" src="/avatar_4.png" alt="User icon" width={32} height={32} />
                    <strong className="pl-2">{email}</strong>
                </a>
            </div>
            <form>
                <div className="form-group pb-3">
                    <input type="password" 
                        className={loginPasswordClasses}
                        id={'login_password'}  
                        aria-label="Password" 
                        placeholder="Password" 
                        value={loginPassword} 
                        onChange={(e) => {
                            setLoginPassword(e.target.value);
                            (loginPassword!=="") ? setLoginStatus("") : setLoginStatus("Please enter your password")
                        }
                        }
                    />
                    {loginPasswordError}
                </div>
                <div className="d-flex justify-content-between">
                    <a id={'js_click_resetPassword'} className="signup-controls__cancel" href="#" >Forgot password</a>
                    <button id={'js_click_signIn'} className={loginBtnClass} onClick={(e) => login(e)} >{loginBtnValue}</button>
                </div>
            </form>
        </div>
    ) : null;


    const firstNameClasses = (regFirstNameEmpty) ? 'form-control form-control-lg form-control--line has-error' : 'form-control form-control-lg form-control--line';
    const firstNameError = (regFirstNameEmpty) ? (<small className="form-text text-muted has-error">Please enter your first name</small>) : null;
    const lastNameClasses = (regLastNameEmpty) ? 'form-control form-control-lg form-control--line has-error' : 'form-control form-control-lg form-control--line';
    const lastNameError = (regLastNameEmpty) ? (<small className="form-text text-muted has-error">Please enter your last name</small>) : null;
    const password1Classes = (regPassword1Invalid) ? 'form-control form-control-lg form-control--line has-error' : 'form-control form-control-lg form-control--line';
    const password1Error = (regPassword1Invalid) ? (<small className="form-text text-muted has-error">{regPassword1State}</small>) : null;
    const password2Classes = (regPassword2Invalid) ? 'form-control form-control-lg form-control--line has-error' : 'form-control form-control-lg form-control--line';
    const password2Error = (regPassword2Invalid) ? (<small className="form-text text-muted has-error">Password confirmation should match a valid password</small>) : null;
    const registerBtnClass = (isRegistering) ? 'btn btn-lg btn-success disabled' : 'btn btn-lg btn-success';
    const registerBtnValue = (isRegistering) ? (<div className="spinner spinner-md"></div>) : "Join";
    const emailRegisterForm = (selectedOption==="registerForm") ? (
        <div className="d-flex flex-column">
            <p className="message mb-2">
                Hi <strong>{email}</strong>, here are a few things we need to jumpstart your budget tracking!
            </p>
            <form>
                <div className="form-group pb-3">
                    <input type="text" 
                        className={firstNameClasses} 
                        id={'firstName'} 
                        aria-label="First Name" 
                        placeholder="Enter your first name" 
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value); 
                            setIsRegistering(false);
                            setRegFirstNameEmpty(false); }
                        }  
                    />
                    {firstNameError}
                </div>
                <div className="form-group pb-3">
                    <input type="text" 
                        className={lastNameClasses} 
                        id={'lastName'} 
                        aria-label="Last Name" 
                        placeholder="Enter your last name" 
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            setIsRegistering(false);
                            setRegLastNameEmpty(false); }
                        }  
                    />
                    {lastNameError}
                </div>
                <div className="form-group pb-3">
                    <input type="password" 
                        className={password1Classes} 
                        id={'password1'} 
                        aria-label="Password" 
                        placeholder="Enter your password" 
                        value={password1} 
                        onChange={(e) => {
                            setPassword1(e.target.value); 
                            setIsRegistering(false);
                            setRegPassword1Invalid(false); }
                        }  
                    />
                    {password1Error}
                </div>
                <div className="form-group pb-3">
                    <input type="password" 
                        className={password2Classes} 
                        id={'password2'} 
                        aria-label="Password Confirmation" 
                        placeholder="Confirm your password" 
                        value={password2}
                        onChange={(e) => {
                            setPassword2(e.target.value); 
                            setIsRegistering(false);
                            setRegPassword2Invalid(false); }
                        }  
                    />
                    {password2Error}
                </div>
                <div className="d-flex justify-content-between">
                    <a as={Button} id="js_click_showSignInOptions"  className="signup-controls__cancel" onClick={()=>setselectedOption("emailForm")}>Back</a>
                    <button id="js_click_submitLogin" className={registerBtnClass} onClick={(e)=>registerAccount(e)}>{registerBtnValue}</button>
                </div>
            </form>
        </div>
    ) : null;

    return (
        <div id={'homepage'}>
            <div className="signup-sidepane d-flex flex-column">
                <div className="signup-sidepane__inner">
                    <div className="signup-sidepane__logo production">                 
                        <Image
                            id={'homepage_logo'}
                            src="/sample_logo.png"
                            alt="Homepage logo"
                            width={500}
                            height={500}
                        /> 
                    </div>
                    <div className="signup-controls">
                        <div id={'signin-flow'}>
                            {initialForm}
                            {emailInitialForm}
                            {emailRegisterForm}
                            {emailPasswordForm}
                        </div>
                        <div id={'loading'} className="spinner spinner-xl spinner--light hidden"></div>
                    </div>
                </div>

                <div className="signup-sidepane__footer text-center">
                    <div className="signup-sidepane__footer-logo">
                        <h1 className="headline">TrackMo</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
