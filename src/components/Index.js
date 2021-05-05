import React, { useState } from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { JobList } from './JobList';
import Logo from '../assets/euroform_logo_light.png';

export const Index = ({
  addJobsData,
  addJobData,
  addIsLogin,
  setTask,
  setJobsData,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    refreshForm();
  };
  const refreshForm = () => {
    var payload = { '': '' };
    var data = new FormData();
    data.append('json', JSON.stringify(payload));

    fetch('http://api.euroform.com.au:1337/api/Tasks', {
      method: 'GET',
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => setJobsData(json));
    alert(addJobsData.length);
    addIsLogin(1);
  };

  return (
    <Container>
      <Header style={{ backgroundColor: '#263c5b', marginTop: 0 }}>
        <Image
          style={{
            height: 30,
            width: 200,
            marginTop: 15,
            background: '#263c5b',
          }}
          source={Logo}
        />
      </Header>
      <Content style={style.content}>
        <View style={style.container}>
          <Text style={style.title}>Active Jobs</Text>
        </View>
        <ScrollView
          contentContainerStyle={style.jobsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <JobList
            jobsData={addJobsData}
            jobData={addJobData}
            loggedIn={addIsLogin}
            setTaskID={setTask}
          />
        </ScrollView>
      </Content>
    </Container>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderBottomColor: '#263c5b',
    borderBottomWidth: 2,
    flex: 1,
  },
  jobsContainer: {
    flex: 1,
  },
  content: {
    backgroundColor: '#263c5b',
  },
});
