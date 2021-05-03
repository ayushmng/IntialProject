import React, {useState} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {homeStyles} from './Home';
import {Profile} from './Profile';

export const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [modal, setModal] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={CEStyles.root}>
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

      <View style={homeStyles.buttonContainer}>
        <Button
          mode="contained"
          icon="upload"
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
                onPress={() => setModal(false)}>
                Camera
              </Button>
              <Button
                mode="contained"
                icon="image-area"
                color="#0a70c9"
                onPress={() => setModal(false)}>
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
