import Head from 'next/head'
import Image from 'next/image'
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react'
import Homepage from "../components/Homepage"
import HomepageBackgroundContainer from "../components/BackgroundContainer"
import View from "../components/View"
import {  UserProvider } from '../UserContext'

export default function Home() {
  return (
    <View title={"TrackMo"}>
      <HomepageBackgroundContainer />
      <Homepage />
    </View>
  )
}
