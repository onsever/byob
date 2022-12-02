import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { firebase } from "../../firebase/firebase";
import { usePost } from "../../hooks/usePost";

export default function ValidationScreen() {
  const [type, setType] = React.useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  const [uploading, setUploading] = React.useState(false);
  const [resultText, setResultText] = React.useState("");

  const camera = React.useRef(null);

  const { post, loading, result, error, loaded } = usePost();

  React.useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await requestPermission();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        console.log(error);
      }
      if (result) {
        setResultText(result.data);
      }
    }
  }, [loaded]);

  const takePicture = async () => {
    if (camera) {
      try {
        const photo = await camera.current.takePictureAsync();
        setImage(photo.uri);
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  const uploadImage = async () => {
    if (image === null) return;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const filename = image.substring(image.lastIndexOf("/") + 1);
    const ref = firebase.storage().ref().child(filename);
    const snapshot = await ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
  };

  const extractTextFromImage = async () => {
    try {
      await post("auth/id-scan", { url: image });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!image ? (
        <Camera
          ref={camera}
          style={styles.camera}
          type={type}
          flashMode={flash}
        >
          <View style={styles.cameraActionsView}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      {image ? (
        <View>
          <Text onPress={() => setImage(null)}>TAKE PICTURE AGAIN</Text>
          <Text onPress={uploadImage}>Save</Text>
          <Text onPress={() => extractTextFromImage()}>Extract Text</Text>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  cameraActionsView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  captureButton: {
    alignItems: "center",
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: "50%",
    borderWidth: 3,
    borderColor: "black",
  },
});
