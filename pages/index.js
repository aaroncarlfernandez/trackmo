import { useEffect } from "react"
import Homepage from "../components/Homepage"
import HomepageBackgroundContainer from "../components/BackgroundContainer"
import View from "../components/View"

export default function Home() {
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
