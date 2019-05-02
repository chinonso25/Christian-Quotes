import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import QuoteScreen from "../screens/QuoteScreen";
import SavedQuotes from "../screens/SavedQuotes";





const SwitchNavigator = createSwitchNavigator(
  {
    QuoteScreen: QuoteScreen,
    SavedQuotes: SavedQuotes,
    },
    {
      initialRouteName: 'QuoteScreen',
    }
);

export default createAppContainer(SwitchNavigator);
