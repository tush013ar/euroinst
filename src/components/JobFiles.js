import React, { useState } from "react";
import { Text, Body, Card, CardItem } from "native-base";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import * as Permissions from "expo-permissions";
import {
  TouchableOpacity,
  StyleSheet,
  Linking,
  View,
  Modal,
  Image,
} from "react-native";
import FileViewer from "react-native-file-viewer";
import * as IntentLauncher from "expo-intent-launcher";

export const JobFiles = ({ FileName, OrderID }) => {
  const [img, setImg] = useState(null);
  const saveFile = async ({ file, fileName }) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const aaa = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    console.log(FileSystem.documentDirectory + fileName.replace("#", "c"));
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((res) => {
      console.log(res);
    });
    if (status === "granted") {
      FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + fileName,
        file,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
      FileSystem.getContentUriAsync(
        FileSystem.documentDirectory + fileName.replace("#", "c")
      ).then((cUri) => {
        console.log(cUri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      });
      // let fileUri = FileSystem.documentDirectory + FileName;
      // console.log(fileUri);
      // const { asset } = await MediaLibrary.createAssetAsync(fileUri);
      // console.log(asset);
      // await MediaLibrary.createAlbumAsync("Download", fileUri, false)
      //   .then(() => {
      //     // OPEN FILE FUNCTION HERE
      //     console.log(fileUri);
      //     Linking.openURL(fileUri);
      //   })
      //   .catch((error) => {
      //     alert(fileUri);
      //   });
      // alert("Finished Writing FIle!");
    }
  };

  const downloadFile = (jobID, name) => {
    var data = {
      JobID: jobID,
      Name: name,
    };

    fetch("http://api.euroform.com.au:1337/api/DownloadFile", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        saveFile({ file: json["Base64File"], fileName: json["Name"] });
      });
  };

  return (
    <View>
      <TouchableOpacity
        style={style.touchButton}
        onPress={() => {
          downloadFile(OrderID, FileName);
        }}
      >
        <Card style={style.card}>
          <CardItem>
            <Body>
              <Text>{FileName}</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
      {/* <Modal visible={img ? true : false} style={{ flex: 1 }}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${img}` }}
          style={{ height: 300, width: 300, borderWidth: 1 }}
        />
      </Modal> */}
    </View>
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
});
