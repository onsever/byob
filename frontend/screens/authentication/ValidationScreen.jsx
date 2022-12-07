import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { storage } from "../../firebase/firebase";
import ProgressIndicator from "../../components/ProgressIndicator";
import { Ionicons } from "@expo/vector-icons";

export default function ValidationScreen({ route, navigation }) {
  const [type, setType] = React.useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  const [uploading, setUploading] = React.useState(false);
  const [photoLoading, setPhotoLoading] = React.useState(false);
  const [resultText, setResultText] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  const userObj = { ...route.params };
  const camera = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await requestPermission();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const convertToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.timeout = 1000 * 60;
      xhr.send(null);
    });
  };

  const takePicture = async () => {
    if (camera) {
      try {
        setPhotoLoading(true);
        const photo = await camera.current.takePictureAsync();
        setImage(photo.uri);
        setPhotoLoading(false);
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  const uploadImage = async () => {
    try {
      setUploading(true);
      const blob = await convertToBlob(image);
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const uploadTask = storage.ref(`images/${filename}`).put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          storage
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then((url) => {
              setUploading(false);
              blob.close();
              navigation.replace("Verification", {
                userObj,
                downloadURL: url,
              });
            });
        }
      );

      uploadTask.catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log("Error", err);
      setUploading(false);
    }
  };

  return (
    <>
      {uploading ? (
        <ProgressIndicator progress={progress} />
      ) : (
        <View style={{ flex: 1 }}>
          {!image && !uploading ? (
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
                >
                  <Ionicons name="camera" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
          {image ? (
            <View style={styles.afterCapturedOptionsView}>
              <TouchableOpacity
                style={styles.afterCaptureOption}
                onPress={() => setImage(null)}
              >
                <Ionicons name="camera" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.afterCaptureOption}
                onPress={uploadImage}
              >
                <Ionicons name="cloud-upload" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      )}
    </>
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
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  afterCapturedOptionsView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    opacity: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  afterCaptureOption: {
    backgroundColor: "white",
    borderRadius: "50%",
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
  },
  captureButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: "50%",
    borderWidth: 3,
    borderColor: "black",
  },
});
