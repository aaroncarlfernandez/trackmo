import React, { useState, useEffect } from "react"
import Router from "next/router"
import AppHelper from "../app-helper"
import { UserProvider } from "../UserContext"

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [categories, setCategories] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newSelected, setNewSelected] = useState("");

  const unsetUser = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    Router.push("/");
  };

  return (
    <React.Fragment>
      <UserProvider value={{unsetUser, newSelected, setNewSelected, categories, setCategories, transactions, setTransactions}}>
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
}


export default MyApp
