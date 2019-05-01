import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title } from 'native-base';

export default class Head extends Component {
  render() {
    return (
        <Header>
          <Left/>
          <Body>
            <Title>Qoutes</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}
