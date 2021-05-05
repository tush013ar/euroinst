import React from 'react';
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
  Card,
  CardItem,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';

export const Job = ({
  Description,
  Id,
  JobID,
  TaskDate,
  Type,
  LoggedIn,
  AddJobData,
  Location,
  JobDescription,
  View,
  SetTaskID,
}) => {
  const getJob = (jobID) => {
    var data = {
      JobID: jobID,
    };
    var test = '';
    AddJobData('');
    fetch('http://api.euroform.com.au:1337/api/CabinetsJob', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => AddJobData(json));
    LoggedIn(2);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        SetTaskID(Id);
        getJob(JobID);
      }}
      style={style.touchButton}>
      <Card style={style.card}>
        <CardItem
          header
          style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <Left>
            <Text style={style.title}>
              {Type} - {JobID}
            </Text>
          </Left>
          <Right>
            <Text style={style.title}>{TaskDate}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Task: {Description}</Text>
            <Text>Job: {JobDescription}</Text>
          </Body>
        </CardItem>
        <CardItem
          footer
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
          <Left>
            <Text style={style.footer}>{Location}</Text>
          </Left>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  touchButton: {
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
  },
  card: {
    borderRadius: 10,
  },
  title: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  footer: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#263c5b',
  },
});
