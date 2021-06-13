import Homepage from "../components/Homepage"
import HomepageBackgroundContainer from "../components/BackgroundContainer"
import View from "../components/View"

export default function Home() {
  return (
    <View title={"TrackMo"}>
      <HomepageBackgroundContainer />
      <Homepage />
    </View>
  )
}
