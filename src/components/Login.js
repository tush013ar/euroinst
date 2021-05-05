import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import logo from '../assets/log2.png';

export const Login = ({ addIsLogin, addJobsData }) => {
  const [wrongLogin, setWrongLogin] = useState(0);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const checkLogin = () => {
    if (username == '' && password == '') {
      console.log('Logining IN');
      var payload = { '': '' };

      var data = new FormData();
      data.append('json', JSON.stringify(payload));

      fetch('http://api.euroform.com.au:1337/api/Tasks', {
        method: 'GET',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      })
        .then((response) => response.json())
        .then((json) => addJobsData(json));
      addIsLogin(1);
    } else {
      Alert.alert('Wrong Login', 'Wrong Login');
      setWrongLogin(1);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.logoContainer}>
        <Image style={style.logo} source={logo} />
      </View>
      <View style={{ margin: 25 }} />
      <Text style={style.title}>INSTALLER LOGIN</Text>
      <TextInput
        onChangeText={setUsername}
        style={style.textInput}
        placeholder="Username"
      />
      <TextInput
        onChangeText={setPassword}
        secureTextEntry={true}
        style={style.textInput}
        placeholder="Password"
      />
      <View style={{ margin: 7 }} />
      <TouchableOpacity
        title="Submit"
        style={style.button}
        onPress={() => checkLogin()}>
        <View style={style.contatinerButton}>
          <Text style={style.loginText}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 27,
    color: '#fff',
  },
  contatinerButton: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  wrongPassContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f6c6cb',
    backgroundColor: '#f8d7da',
    height: 36,
    borderWidth: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#263c5b',
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    marginTop: 10,
    padding: 5,
    borderRadius: 3,
    fontSize: 18,
  },
  button: {
    height: 50,
    padding: 5,
    borderRadius: 3,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#263c5b',
  },
  logo: {
    height: 160,
    width: 160,
  },
  logoContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
