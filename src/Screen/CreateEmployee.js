import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  Image,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
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
import {Home} from './Home';
import {cos} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';

export const CreateEmployee = ({navigate, route}) => {
  const getEmployeeDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'email':
          return route.params.email;
        case 'contact':
          return route.params.contact;
        case 'position':
          return route.params.position;
        case 'salary':
          return route.params.salary;
        case 'picture':
          return route.params.picture;
      }
    }
    return '';
  };

  const [name, setName] = useState(getEmployeeDetails('name'));
  const [contact, setContact] = useState(getEmployeeDetails('contact'));
  const [position, setPosition] = useState(getEmployeeDetails('position'));
  const [email, setEmail] = useState(getEmployeeDetails('email'));
  const [salary, setSalary] = useState(getEmployeeDetails('salary'));
  const [picture, setPicture] = useState(getEmployeeDetails('picture'));
  const [modal, setModal] = useState(false);
  const [shiftKeyboard, setShiftKeyboard] = useState(false);

  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});

  let baseUrl = 'http://192.168.0.105:3000'; // 10.0.2.2

  let imageUrl;
  if (picture === '') {
    if (filePath.url === '') {
      imageUrl = filePath.url;
    } else {
      imageUrl =
        'https://res.cloudinary.com/react-native-test-image-api/image/upload/v1620551537/dummy_profile_o9vmcm.jpg';
    }
  } else {
    imageUrl = picture;
    console.log('else cond');
  }

  console.log(`Current ImageUrl: ${imageUrl}`);

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
      })
      .catch(() => {
        Alert.alert('Something went wrong !!');
      });
  };

  const updateDetails = () => {
    let id = route.params._id;
    fetch(`${baseUrl}/update`, {
      // fetch('http://10.0.2.2:3000/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        contact,
        position,
        email,
        salary,
        picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('Dashboard');
        ToastAndroid.show(
          `${data.name} updated successfully`,
          ToastAndroid.SHORT,
        );
      })
      .catch(() => {
        Alert.alert('Something went wrong !!');
      });
  };

  const sendData = () => {
    fetch(`${baseUrl}/send-data`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        contact,
        position,
        email,
        salary,
        picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('Dashboard');
        ToastAndroid.show(
          `${data.name} saved successfully`,
          ToastAndroid.SHORT,
        );
      })
      .catch(() => {
        Alert.alert('Something went wrong !!');
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
    // <ScrollView style={{flex: 1}}>
    // <KeyboardAvoidingView
    //   behavior="position"
    //   enabled={shiftKeyboard}
    //   style={CEStyles.root}>
    <ScrollView>
      <View style={CEStyles.root}>
        <LinearGradient
          colors={['#0a70c9', '#4ed4f2']}
          style={{height: '12%'}}
        />
        <View style={profileStyles.alignCenter}>
          <Image
            style={profileStyles.imageStyle}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <Button
          mode="text"
          icon={picture === '' ? 'upload' : 'check'}
          color="#0a70c9"
          style={{alignSelf: 'center'}}
          onPress={() => setModal(true)}>
          Upload Image
        </Button>
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
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={CEStyles.inputStyle}
          label="Contact No."
          mode="outlined"
          onFocus={() => setShiftKeyboard(true)}
          value={contact}
          keyboardType="number-pad"
          onChangeText={(text) => setContact(text)}
        />
        <TextInput
          style={CEStyles.inputStyle}
          label="Position"
          mode="outlined"
          onFocus={() => setShiftKeyboard(true)}
          value={position}
          onChangeText={(text) => setPosition(text)}
        />
        <TextInput
          style={CEStyles.inputStyle}
          label="Average Salary"
          mode="outlined"
          onFocus={() => setShiftKeyboard(true)}
          value={salary}
          keyboardType="number-pad"
          onChangeText={(text) => setSalary(text)}
        />

        <View style={{...homeStyles.buttonContainer, marginTop: 10}}>
          {route.params ? (
            <Button
              mode="contained"
              icon={'content-save'}
              color="#0a70c9"
              onPress={() => updateDetails()}>
              Update Profile
            </Button>
          ) : (
            <Button
              mode="contained"
              icon={'content-save'}
              color="#0a70c9"
              onPress={() => sendData()}>
              Save Profile
            </Button>
          )}
        </View>

        <View style={{...homeStyles.buttonContainer, marginTop: 24}}>
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
    </ScrollView>
    // </KeyboardAvoidingView>
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
    padding: 8,
  },
});
