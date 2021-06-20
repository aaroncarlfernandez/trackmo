import { useEffect, useContext } from "react"
import Homepage from "../components/Homepage/Homepage"
import HomepageBackgroundContainer from "../components/Homepage/BackgroundContainer"
import View from "../components/View"
import UserContext from '../UserContext'

export default function Home() {
  const {loading} = useContext(UserContext);

  useEffect(() => {
    document.querySelector("body").classList.add("ofh")
  }, [])

  return (    
    <View title={"TrackMo"} cssFile={"../styles/Theme.css"}>
      <HomepageBackgroundContainer />
      <Homepage />
    </View>
  )
}
