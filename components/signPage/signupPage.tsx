import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Input, Icon } from "react-native-elements";
import * as Font from "expo-font";

export interface State {
  name: string;
  email: string;
  password: string;
  siginup: boolean;
  phone: string;
  error: boolean;
  fontLoaded: boolean;
}
export default class sigininpage extends Component<{}, State> {
  state = {
    name: "",
    email: "",
    password: "",
    phone: "",
    siginup: false,
    error: true,
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      nanum_pen: require("../../assets/fonts/NanumPenScript-Regular.ttf")
    });
    this.setState({
      ...this.state,
      fontLoaded: true
    });
  }

  ChangeState = (value: string, key: any) => {
    if (value.length > 0) {
      const obj = { [key]: value } as Pick<State, keyof State>;
      obj["error"] = false;
      this.setState(obj);
    } else {
      this.setState({
        error: true
      });
    }
  };
  fetchSignUp = () => {
    const { email, password, name, phone } = this.state;
    if (!this.state.error) {
      fetch("url//user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, phone }),
        credentials: "include"
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.status === 200) {
            this.setState({
              siginup: !this.state.siginup
            });
          }
        });
    }
    //fetch 요청
  };
  render() {
    return this.state.fontLoaded ? (
      <View style={Styles.wrap}>
        <Input
          placeholder=" Name"
          onChangeText={(text: string) => this.ChangeState(text, "name")}
          leftIcon={
            <Icon name="user" type="antdesign" size={18} color="black" />
          }
        />
        <Input
          placeholder=" Email"
          onChangeText={(text: string) => this.ChangeState(text, "email")}
          leftIcon={
            <Icon name="idcard" type="antdesign" size={18} color="black" />
          }
        />
        <Input
          placeholder=" Password"
          secureTextEntry={true}
          onChangeText={(text: string) => this.ChangeState(text, "password")}
          leftIcon={
            <Icon name="key" type="antdesign" size={18} color="black" />
          }
        />
        <Input
          placeholder=" Phone"
          onChangeText={(text: string) => this.ChangeState(text, "phone")}
          leftIcon={
            <Icon name="phone" type="antdesign" size={18} color="black" />
          }
        />
        <TouchableOpacity onPress={this.fetchSignUp} style={Styles.button}>
          <Text style={{ fontFamily: "nanum_pen", fontSize: 25 }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }
}

const Styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#63C5DA",
    height: 40,
    width: 150,
    marginBottom: 10,
    marginTop: 15,
    elevation: 3
  }
});
