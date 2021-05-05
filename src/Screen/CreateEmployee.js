import React, {useState} from 'react';
import {StyleSheet, View, Modal, Alert, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {homeStyles} from './Home';
import {profileStyles} from './Profile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {
  PERMISSIONS,
  check,
  RESULTS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';
import {Profile} from './Profile';
import {cos} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';

export const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);

  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});

  const uploadImage = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'employeeRecordApp');
    data.append('cloud_name', 'Test123');

    fetch(
      'https://api.cloudinary.com/v1_1/react-native-test-image-api/image/upload',
      {
        method: 'post',
        body: data,
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
        setModal(false);
      });
  };

  const pickFromCamera = async () => {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]).then((status) => {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ]);

      console.log(status);

      if (
        status[
          ('android.permission.CAMERA',
          'android.permission.READ_EXTERNAL_STORAGE')
        ] === 'granted'
      ) {
        console.log('Permission allowed');

        let options = {
          mediaType: 'photo',
          maxWidth: 860,
          maxHeight: 860,
          quality: 1,
          saveToPhotos: false,
        };

        ImagePicker.launchCamera(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            Alert('User cancelled camera picker');
            return;
          } else if (response.errorCode === 'camera_unavailable') {
            Alert('Camera not available on device');
            return;
          } else if (response.errorCode === 'permission') {
            Alert('Permission not satisfied');
            return;
          } else if (response.errorCode === 'others') {
            Alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response);
          const imageFormat = response.uri.split('.')[2];
          console.log('ImageFormat:->', imageFormat);
          if (!response.didCancel) {
            let newFile = {
              uri: response.uri,
              type: `test/${imageFormat}`,
              name: `test/${imageFormat}`,
            };
            uploadImage(newFile);
          }
        });
      } else {
        console.log('Permission denied');
        Alert.alert('You need to give permission to access Camera');
      }
    });
  };

  const pickFromGallery = async () => {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]).then((status) => {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ]);

      console.log(status);

      if (
        status[
          ('android.permission.CAMERA',
          'android.permission.READ_EXTERNAL_STORAGE')
        ] === 'granted'
      ) {
        console.log('Permission allowed');

        let options = {
          mediaType: 'photo',
          maxWidth: 860,
          maxHeight: 860,
          quality: 1,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            Alert('User cancelled camera picker');
            return;
          } else if (response.errorCode === 'camera_unavailable') {
            Alert('Camera not available on device');
            return;
          } else if (response.errorCode === 'permission') {
            Alert('Permission not satisfied');
            return;
          } else if (response.errorCode === 'others') {
            Alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response);
          const imageFormat = response.uri.split('.')[2];
          console.log('ImageFormat:->', imageFormat);
          if (!response.didCancel) {
            let newFile = {
              uri: response.uri,
              type: `test/${imageFormat}`,
              name: `test/${imageFormat}`,
            };
            uploadImage(newFile);
          }
        });
      } else {
        console.log('Permission denied');
        Alert.alert('You need to give permission to access Gallery');
      }
    });
  };

  return (
    <View style={CEStyles.root}>
      <LinearGradient colors={['#0a70c9', '#4ed4f2']} style={{height: '12%'}} />
      <View style={profileStyles.alignCenter}>
        <Image
          style={profileStyles.imageStyle}
          source={{
            uri: filePath.uri,
            // uri:
            //   'https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg',
          }}
        />
      </View>
      <TextInput
        style={CEStyles.inputStyle}
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={CEStyles.inputStyle}
        label="Email id"
        mode="outlined"
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={CEStyles.inputStyle}
        label="Contact No."
        mode="outlined"
        value={contact}
        keyboardType="number-pad"
        onChangeText={(text) => setContact(text)}
      />
      <TextInput
        style={CEStyles.inputStyle}
        label="Position"
        mode="outlined"
        value={position}
        onChangeText={(text) => setPosition(text)}
      />
      <TextInput
        style={CEStyles.inputStyle}
        label="Average Salary"
        mode="outlined"
        value={salary}
        keyboardType="number-pad"
        onChangeText={(text) => setSalary(text)}
      />

      <View style={{...homeStyles.buttonContainer, marginTop: 10}}>
        <Button
          mode="contained"
          icon={picture === '' ? 'upload' : 'check'}
          color="#0a70c9"
          onPress={() => setModal(true)}>
          Upload
        </Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <View style={CEStyles.modalView}>
            <View style={CEStyles.modalButtonView}>
              <Button
                mode="contained"
                icon="camera"
                color="#0a70c9"
                onPress={() => {
                  pickFromCamera('photo');
                  setModal(false);
                }}>
                Camera
              </Button>
              <Button
                mode="contained"
                icon="image-area"
                color="#0a70c9"
                onPress={() => {
                  pickFromGallery();
                  console.log(PERMISSIONS);
                  setModal(false);
                }}>
                Gallery
              </Button>
            </View>
            <View style={{margin: 8}}>
              <Button color="#0a70c9" onPress={() => setModal(false)}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export const CEStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 8,
  },
  TextStyle: {
    color: '#ffff',
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
