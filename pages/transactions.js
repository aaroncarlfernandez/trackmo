import Sidepane from "../components/Sidepane"
import MenuToggle from "../components/MenuToggle"
import AppContent from "../components/AppContent/AppContent"
import DialogContainer from "../components/DialogContainer/DialogContainer"
import View2 from "../components/View2"

import { useState, useEffect, useContext } from "react"

import UserContext from '../UserContext'

export default function index() {
  const {newSelected} = useContext(UserContext)

  const dialogContainer = (newSelected!=="") ? <DialogContainer /> : null
  return (
    <View2 title={"TrackMo"}>
      <div className="ofh">
        <input type="checkbox" id={'menu-toggle'} />
        <Sidepane />
        <MenuToggle />
        <AppContent />
        {dialogContainer}
      </div>
    </View2>
  )
}