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
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import { Button } from "react-native-paper";
import { QuotesSchema, QUOTES_SCHEMA } from "../database/allSchemas";

const Realm = require("realm");
const databaseOptions = {
  path: "Quotes.realm",
  schema: [QuotesSchema],
  schemaVersion: 0
};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      arrayResult: []
    };
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

  componentWillMount() {
    console.disableYellowBox = true;
    Realm.open(databaseOptions)
      .then(realm => {
        let FavQuotes = realm.objects("quote");
        this.setState({
          result: FavQuotes[1].Message,
          arrayResult: FavQuotes
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let quotes = this.state.arrayResult.map((val, key) => {
      return (
        <View key={key} style={styles.item}>
          <Text selectable={true} style={styles.message}>
            {val.Message}
          </Text>
          <Text selectable={true} style={styles.author}>
            -{val.Author}
          </Text>

          {/*  <Button
              icon="share"
              mode="contained"
              onPress={this._shareMessage}
              style={{
                justifyContent: "center",
                backgroundColor: "#9c27b0",
                margin:20
              }}
            >
              Share
            </Button> */}
          <View
            style={{
              padding: 10,
              borderBottomColor: "#fff",
              borderBottomWidth: 0.5,
              width: "80%"
            }}
          />
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />

        <View
          style={{
            margin: 20,
            backgroundColor: "#ab47bc",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            top: 15
          }}
        >
          <Button
            icon="menu"
            mode="contained"
            onPress={() => this.props.navigation.navigate("QuoteScreen")}
            style={{
              backgroundColor: "#9c27b0"
            }}
          >
            To Quotes
          </Button>
        </View>
        <ScrollView>{quotes}</ScrollView>
        <View
          style={{
            flexDirection: "row",
            margin: 20,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ab47bc"
  },
  headtitle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },

  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  message: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 20,
    fontFamily: "Cinzel-Regular",
    color: "#fff"
  },
  author: {
    fontSize: 16,
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
