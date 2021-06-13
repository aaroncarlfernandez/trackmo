import React, { useState, useEffect } from "react"
import Router from "next/router"
import AppHelper from "../app-helper"
import { UserProvider } from "../UserContext"

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newSelected, setNewSelected] = useState("");

  const unsetUser = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setAccessToken(savedToken);
    } else {
      Router.push("/");
    }
  }, []);

  
  return (
    <React.Fragment>
      <UserProvider value={{unsetUser, accessToken, setAccessToken, userDetails, setUserDetails, userId, setUserId, newSelected, setNewSelected  }}>
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
}


export default MyApp
