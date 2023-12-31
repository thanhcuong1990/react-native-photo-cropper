import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import PhotoCropper from 'react-native-photo-cropper';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import type {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

async function hasAndroidPermission() {
  if (Platform.OS !== 'android') {
    return;
  }
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

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
    CameraRoll.getPhotos({first: 2}).then(v => setOriginImage(v.edges[1]));
  }, []);

  if (!orginImage) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <PhotoCropper
          onCropped={data => setCroppedImage(data.croppedUri)}
          image={orginImage.node.image}
        />
        <Button
          title="Crop"
          onPress={() => {
            setVisible(true);
            setVisibleImage(croppedImage || '');
          }}
        />
        {visible && visibleImage && (
          <Image source={{uri: visibleImage}} style={styles.image} />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingTop: 100,
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});
