import React, { Component } from "react";
import { createSwitchkNavigator, createAppContainer } from "react-navigation";
import SwitchNavigator from "./src/navigator/SwitchNavigator";

import QuoteScreen from "./src/screens/QuoteScreen";




export default class App extends Component<Props> {
  render(){
    return(
      <SwitchNavigator />
    )
  }
}
