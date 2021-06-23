import Sidepane from "../../components/Sidepane/Sidepane"
import MenuToggle from "../../components/AppContent/MenuToggle"
import AppContent from "../../components/AppContent/AppContent"
import AppFooter from "../../components/AppFooter/AppFooter"
import DialogContainer from "../../components/DialogContainer/DialogContainer"
import View from "../../components/View"

import { useContext, useEffect } from "react"
import UserContext from '../../UserContext'

export default function index() {
  const { formSelected } = useContext(UserContext)

  useEffect(() => {
    document.querySelector("body").classList.add("ofh")
  }, [])

  const dialogContainer = (formSelected!=="") ? <DialogContainer /> : null
  return (
    <View title={"TrackMo"} cssFile={"../styles/Content.css"}>
      <input type="checkbox" id={'menu-toggle'} />
      <Sidepane />
      <MenuToggle />
      <AppContent />
      <AppFooter />
      {dialogContainer}
    </View>
  )
}