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

  // useEffect(() => {
  //   if (localStorage.getItem('userId') !== null) {
  //     setUserDetails({
  //       userId: localStorage.getItem('userId'),
  //       firstName: localStorage.getItem('firstName'),
  //       lastName: localStorage.getItem('lastName'),
  //       balance: localStorage.getItem('balance')
  //     })
  //     Router.push("/transactions");
  //   } else {
  //     Router.push("/");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (accessToken !== null) {
  //     localStorage.setItem("accessToken", accessToken);
  //   }
  // }, [accessToken]);

  // useEffect(() => {
  //   console.log("accessToken: " + accessToken);
  //   if (accessToken !== null) {
  //     console.log("NOT NULL");
  //     fetch(`${AppHelper.API_URL}/api/users/details`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUserDetails({
  //             userId: data._id,
  //             firstName: data.firstName,
  //             lastName: data.lastName,
  //             categories: data.categories,
  //             balance: data.balance
  //           })
  //       });
  //   } else { console.log("NULL"); }
  // }, [accessToken]);


  
  return (
    <React.Fragment>
      <UserProvider value={{unsetUser, accessToken, setAccessToken, userDetails, setUserDetails, userId, setUserId, newSelected, setNewSelected  }}>
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
}


export default MyApp
