import React, { useState, useEffect } from "react"
import Router from "next/router"
import AppHelper from "../app-helper"
import { UserProvider } from "../UserContext"

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null);
  const [pageSelected, setPageSelected] = useState("");
  const [categories, setCategories] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [balance, setBalance] = useState(0);
  const [newSelected, setNewSelected] = useState("");

  const unsetUser = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    Router.push("/");
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAccessToken(localStorage.getItem('accessToken'))
      Router.push("/logged-in")
    } else {
      Router.push("/")
    }
  }, [])

  useEffect(() => {
    if (accessToken!==null) {
      fetch(`${AppHelper.API_URL}/api/users/details`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${accessToken}`
          }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem('userId', data._id)
          localStorage.setItem('firstName', data.firstName)
          localStorage.setItem('lastName', data.lastName)
          localStorage.setItem('transactionsCount', data.transactions.length)
          setBalance(data.balance)
          setCategories(data.categories)
          setTransactions(data.transactions)
          setPageSelected("transactions")
          Router.push("/logged-in")
        }
      });
    } else {
      Router.push("/")
    }
  }, [accessToken])

  return (
    <React.Fragment>
      <UserProvider value={{unsetUser, newSelected, setNewSelected, categories, setCategories, transactions, setTransactions, balance, setBalance, setAccessToken, pageSelected, setPageSelected, formatAmount}}>
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
}


export default MyApp
