import React, { useState } from "react";
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
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  Card,
  CardItem,
} from "react-native";
import { Logo } from "../assets/euroform_logo_light.png";
import { Ionicons } from "@expo/vector-icons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as FileSystem from "expo-file-system";
import { JobFiles } from "./JobFiles";
import * as DocumentPicker from "expo-document-picker";
import { FileSystemUploadType } from "expo-file-system";

export const JobInfo = ({
  JobDetailData,
  addIsLogin,
  TaskId,
  setJobsData,
  jobDatas,
}) => {
  const [photo, setPhoto] = React.useState(null);

  const onPressUplaod = () =>
    Alert.alert("Upload", "Please select a file type", [
      {
        text: "Image",
        onPress: () => {
          handleChoosePhoto(true);
        },
      },
      {
        text: "Pdf document",
        onPress: () => {
          handleChoosePhoto(false);
        },
      },
    ]);

  const handleChoosePhoto = async (shouldUplaodImage) => {
    //Upload function from cameraroll / downloads folder
    try {
      const type = shouldUplaodImage ? "image/*" : "application/pdf";

      const pickRes = await DocumentPicker.getDocumentAsync({
        type,
      });
      if (pickRes.type === "success") {
        FileSystem.uploadAsync(
          "https://enqh9paq0wonjmt.m.pipedream.net/?upload",
          pickRes.uri,
          {
            httpMethod: "POST",
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: pickRes.name,
          }
        )
          .then((res) => {
            console.log(res);
            alert("File uploaded.");
          })
          .catch((err) => {
            console.log(err);
            // alert(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openGps = () => {
    var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    var url =
      scheme +
      "0,0?q=" +
      JobDetailData.DeliveryAddress +
      " " +
      JobDetailData.DeliveryCity +
      " " +
      JobDetailData.DeliveryState;
    openExternalApp(url);
  };

  const updateTask = (taskID) => {
    var data = {
      ID: taskID,
    };
    fetch("http://api.euroform.com.au:1337/api/UpdateTask", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => alert(json["Message"]));

    var payload = { "": "" };
    data = new FormData();
    data.append("json", JSON.stringify(payload));

    fetch("http://api.euroform.com.au:1337/api/Tasks", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => setJobsData(json));
    alert(jobDatas.length);
    addIsLogin(1);
  };

  const PopulateJobFiles = (OrderID) => {
    const data = JobDetailData.JobFiles;
    return (
      <View>
        {JobDetailData.JobFiles.map((file) => (
          <JobFiles FileName={file.Name} OrderID={JobDetailData.OrderID} />
        ))}
      </View>
    );
  };

  const openExternalApp = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("ERROR", "Unable to open: " + url, [{ text: "OK" }]);
      }
    });
  };

  if (JobDetailData.length === 0) {
    return (
      <Container>
        <Header style={{ backgroundColor: "#263c5b", marginTop: 0 }}>
          <Image
            style={{
              height: 30,
              width: 200,
              marginTop: 15,
              background: "#263c5b",
            }}
            source={Logo}
          />
        </Header>
        <Content>
          <Text>Loading</Text>
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        <Header style={{ backgroundColor: "#263c5b", marginTop: 0 }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                addIsLogin(1);
              }}
            >
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Image
            style={{
              height: 30,
              width: 200,
              marginTop: 15,
              background: "#263c5b",
            }}
            source={Logo}
          />
        </Header>
        <Content>
          <Text />
          <Text
            style={{
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Job Details
          </Text>

          <ListItem>
            <Body>
              <Text>OrderID: {JobDetailData.OrderID}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Customer Name: {JobDetailData.CustomerName}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Description: {JobDetailData.Description}</Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() => {
              openGps();
            }}
          >
            <Body>
              <Text>
                Site Address: {JobDetailData.DeliveryAddress},{" "}
                {JobDetailData.DeliveryCity}, {JobDetailData.DeliveryState},{" "}
                {JobDetailData.DeliveryPostcode}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Contact Name: {JobDetailData.ContactName}</Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() => {
              Linking.openURL(`tel:${JobDetailData.ContactPhone}`);
            }}
          >
            <Body>
              <Text>Contact Phone: {JobDetailData.ContactPhone}</Text>
            </Body>
          </ListItem>
          <Text />
          <Text />
          <Text
            style={{
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {" "}
            Job Files{" "}
          </Text>
          <PopulateJobFiles />
          <Text />
          <Text />
          <ListItem onPress={onPressUplaod}>
            <Body>
              <Text
                style={{
                  color: "green",
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Upload Photo
              </Text>
            </Body>
          </ListItem>
          <Text />
          <ListItem
            onPress={() => {
              updateTask(TaskId);
            }}
          >
            <Body>
              <Text
                style={{
                  color: "red",
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Mark As Complete
              </Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() => {
              addIsLogin(1);
            }}
          >
            <Body>
              <Text
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                BACK
              </Text>
            </Body>
          </ListItem>
          <Text />
        </Content>
      </Container>
    );
  }
};
