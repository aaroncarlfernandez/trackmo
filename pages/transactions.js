import Sidepane from "../components/Sidepane/Sidepane"
import MenuToggle from "../components/MenuToggle"
import AppContent from "../components/AppContent/AppContent"
import DialogContainer from "../components/DialogContainer/DialogContainer"
import View from "../components/View"

import { useContext, useEffect } from "react"
import AppHelper from "../app-helper"
import UserContext from '../UserContext'

export default function index() {
  const { newSelected, setTransactions } = useContext(UserContext)

  useEffect(() => {
    document.querySelector("body").classList.add("ofh")

    fetch(`${AppHelper.API_URL}/api/users/transactions/${localStorage.getItem('userId')}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then((response) => response.json())
    .then((transactions) => {
      setTransactions(transactions)
      console.log(transactions)
    });

  }, [])

  const dialogContainer = (newSelected!=="") ? <DialogContainer /> : null
  return (
    <View title={"TrackMo"} cssFile={"../styles/Content.css"}>
      <input type="checkbox" id={'menu-toggle'} />
      <Sidepane />
      <MenuToggle />
      <AppContent />
      {dialogContainer}
    </View>
  )
}