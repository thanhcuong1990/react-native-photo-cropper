import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import PhotoCropper from 'react-native-photo-cropper';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import type {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

async function hasAndroidPermission() {
  if (Platform.OS !== 'android') {
    return;
  }
  const platformVersion =
    typeof Platform.Version === 'string'
      ? parseInt(Platform.Version, 10)
      : Platform.Version;

  const permission =
    platformVersion >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const App = () => {
  const [orginImage, setOriginImage] = useState<PhotoIdentifier | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [visibleImage, setVisibleImage] = useState('');

  useEffect(() => {
    hasAndroidPermission();
    CameraRoll.getPhotos({first: 20}).then(v => setOriginImage(v.edges[12]));
  }, []);

  if (!orginImage) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.crop}>
          <PhotoCropper
            onCropped={data => setCroppedImage(data.croppedUri)}
            image={orginImage.node.image}
            width={DeviceSize.width * 3/4}
            height={DeviceSize.width * 1}
          />
        </View>

        <Button
          title="Crop"
          onPress={() => {
            setVisible(true);
            setVisibleImage(croppedImage || '');
          }}
        />
        {visible && visibleImage && (
          <Image
            source={{uri: visibleImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const DeviceSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

// const SQUARE_RATIO = '1:1';
// const VERTICAL_RECT_RATIO = '3:4';
// const HORIZONTAL_RECT_RATIO = '4:3';
// const AR_LIST = [
//   {key: SQUARE_RATIO, value: 1 / 1},
//   {key: HORIZONTAL_RECT_RATIO, value: 4 / 3},
//   {key: VERTICAL_RECT_RATIO, value: 3 / 4},
// ];

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingTop: 100,
    flex: 1,
  },
  crop: {
    width: DeviceSize.width,
    height: DeviceSize.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: '#000',
  },
});
