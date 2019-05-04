import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Share,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { Appbar, Button } from "react-native-paper";
import SplashScreen from "./SplashScreen"

import JString from "../../jsonfile";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import Swiper from "react-native-swiper";
import { QuotesSchema, QUOTES_SCHEMA } from "../database/allSchemas";

import Realm from "realm";
const databaseOptions = {
  path: "Quotes.realm",
  schema: [QuotesSchema],
  schemaVersion: 0
};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this._shareMessage = this._shareMessage.bind(this);
    this.state = {
      isLoading: true,
      dataSource: null,
      activeQuoteIndex: 0,
      result: "",
      gestureName: "none",
      previousQuote: 0
    };
  }

  saveFavourite() {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(QuotesSchema.name, {
            Message: this.state.dataSource[this.state.activeQuoteIndex].message,
            Author: this.state.dataSource[this.state.activeQuoteIndex].author
          });
          console.log("created");
          console.log(realm.path);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSwipeLeft(gestureState) {
    this.nextQuote();
  }

  onSwipeRight(gestureState) {
    this.prevQuote(this.state.previousQuote);
  }

  onSwipe(gestureName, gestureState) {
    const {
      /*SWIPE_UP, SWIPE_DOWN,*/ SWIPE_LEFT,
      SWIPE_RIGHT
    } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      /*case SWIPE_UP:
        this.setState({ backgroundColor: "red" });
        break;*/
      /*case SWIPE_DOWN:
        this.setState({ backgroundColor: "green" });
        break;*/
      case SWIPE_LEFT:
        this.nextQuote();
        break;
      case SWIPE_RIGHT:
        this.nextQuote();
        break;
    }
  }

  componentWillMount() {
    console.disableYellowBox = true;
    return fetch(JString)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.quotes
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _shareMessage() {
    var author = JSON.stringify(
      this.state.dataSource[this.state.activeQuoteIndex].author
    );
    author = author.split('"').join("");

    Share.share({
      message:
        JSON.stringify(
          this.state.dataSource[this.state.activeQuoteIndex].message
        ) +
        "\n\n-  " +
        author
    }).then();
  }

  nextQuote = () => {
    const { activeQuoteIndex } = this.state;

    if (activeQuoteIndex < this.state.dataSource.length - 1) {
      this.setState({
        previousQuote: activeQuoteIndex,
        activeQuoteIndex:
          Math.floor(Math.random() * this.state.dataSource.length - 0) + 0
      });
    } else {
      this.setState({
        previousQuote: activeQuoteIndex,
        activeQuoteIndex:
          Math.floor(Math.random() * this.state.dataSource.length - 0) + 0
      });
    }
  };

  prevQuote = prev => {
    const { activeQuoteIndex } = this.state;

    if (activeQuoteIndex < this.state.dataSource.length - 1) {
      this.setState({
        activeQuoteIndex: prev
      });
    } else {
      this.setState({
        previousQuote: activeQuoteIndex,
        activeQuoteIndex: prev
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorStyle}>
          <SplashScreen />
        </View>
      );
    } else {
      let quotes = this.state.dataSource.map((val, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text selectable={true} style={styles.message}>
              {val.message}
            </Text>
            <Text selectable={true} style={styles.author}>
              -{val.author}
            </Text>
            {/*<Text>{JSON.stringify(this.state.result)}</Text>*/}
          </View>
        );
      });

      return (
        <Swiper
          showsButtons={true}
          prevButton=<View>
            <TouchableWithoutFeedback
              onPress={state => this.onSwipeRight(state)}
            >
              <Text style={styles.buttonText}>‹</Text>
            </TouchableWithoutFeedback>
          </View>
          nextButton=<View>
            <TouchableWithoutFeedback
              onPress={state => this.onSwipeLeft(state)}
            >
              <Text style={styles.buttonText}>›</Text>
            </TouchableWithoutFeedback>
          </View>
        >
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            /*onSwipeUp={state => this.onSwipeUp(state)}
          onSwipeDown={state => this.onSwipeDown(state)}*/
            onSwipeLeft={state => this.onSwipeLeft(state)}
            onSwipeRight={state => this.onSwipeRight(state)}
            style={{
              flex: 1,
              backgroundColor: this.state.backgroundColor
            }}
          >
            <View style={styles.container}>
              <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />

              <View
                style={{
                  margin: 20,
                  backgroundColor: "#9c27b0",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  top: 15
                }}
              >
                <Button
                  icon="menu"
                  mode="contained"
                  onPress={() => this.props.navigation.navigate("SavedQuotes")}
                  style={{
                    backgroundColor: "#ab47bc"
                  }}
                >
                  {" "}
                  To Favourites
                </Button>
              </View>
              {quotes[this.state.activeQuoteIndex]}
              <View
                style={{
                  flexDirection: "row",
                  margin: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ margin: 20, backgroundColor: "#d05ce3" }}>
                  <Button
                    icon="share"
                    mode="contained"
                    onPress={this._shareMessage}
                    style={{
                      justifyContent: "center",
                      backgroundColor: "#d05ce3"
                    }}
                  >
                    Share
                  </Button>
                </View>

                <View style={{ margin: 20, backgroundColor: "#fff" }}>
                  <Button
                    icon="favorite"
                    mode="outlined"
                    onPress={this.saveFavourite.bind(this)}
                  >
                    Favourite
                  </Button>
                </View>
              </View>
            </View>
          </GestureRecognizer>
        </Swiper>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9c27b0"
  },
  headtitle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },

  ActivityIndicatorStyle: {
    flex: 1,
    width:"100%",
    justifyContent: "center",
    alignItems: "center"
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  message: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
    fontFamily: "Cinzel-Regular",
    color: "#fff"
  },
  button1: {
    paddingHorizontal: 50,
    paddingVertical: 50,
    borderRadius: 1.5
  },
  author: {
    fontSize: 24,
    paddingTop: 10,
    color: "#fff",
    fontFamily: "LibreFranklin-Regular"
  },
  buttonText: {
    fontSize: 40,
    color: "#fff"
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  }
});
