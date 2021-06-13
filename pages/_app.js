import React, { useState, useEffect } from "react"
import Router from "next/router";
import { UserProvider } from "../UserContext"

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newSelected, setNewSelected] = useState("");

  // const unsetUser = () => {
  //   localStorage.removeItem("accessToken");

  //   setAccessToken(null);
  // };

  useEffect(() => {
    if (accessToken!==null) {
      // setAccessToken(localStorage.getItem('accessToken'));
      // setUserDetails({
      //   userId: localStorage.getItem("userId"),
      //   firstName: localStorage.getItem("firstName"),
      //   lastName: localStorage.getItem("lastName"),
      //   balance: localStorage.getItem("balance")
      // })
      Router.push("/transactions")
    } else {
      Router.push("/")
    }

  }, []);

  
  return (
    <React.Fragment>
      <UserProvider value={{accessToken, setAccessToken, userDetails, setUserDetails, userId, setUserId, newSelected, setNewSelected  }}>
        <Component {...pageProps} />
      </UserProvider>
    </React.Fragment>
  );
}


export default MyApp
