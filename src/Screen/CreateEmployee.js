import React, {useState} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {styles} from './Home';

export const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [modal, setModal] = useState(false);

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
        label="Age"
        mode="outlined"
        value={age}
        keyboardType="number-pad"
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        style={CEStyles.inputStyle}
        label="Position"
        mode="outlined"
        value={position}
        onChangeText={(text) => setPosition(text)}
      />

      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="upload" onPress={() => setModal(true)}>
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
                onPress={() => setModal(false)}>
                Camera
              </Button>
              <Button
                mode="contained"
                icon="image-area"
                onPress={() => setModal(false)}>
                Gallery
              </Button>
            </View>
            <View style={{margin: 8}}>
              <Button onPress={() => setModal(false)}>Cancel</Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const CEStyles = StyleSheet.create({
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
