import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Linking,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {homeStyles} from './Home';
import {Home} from './Home';
import {CreateEmployee} from './CreateEmployee';
import {CEStyles} from './CreateEmployee';
import color from 'color';

export const Profile = (props) => {
  const navigation = useNavigation();

  let baseUrl = 'http://192.168.0.105:3000';

  console.log(`${baseUrl}/delete`);

  const {
    _id,
    name,
    email,
    contact,
    position,
    salary,
    picture,
  } = props.route.params.item;

  const deleteEmployee = () => {
    fetch(`${baseUrl}/delete`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id}),
    })
      .then((res) => res.json())
      .then((deleteEmp) => {
        navigation.navigate('Dashboard');
        ToastAndroid.show(
          `${deleteEmp.name} deleted successfully`,
          ToastAndroid.SHORT,
        );
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Something went wrong !!' + `${err}`);
      });
  };

  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel: ' + contact);
    } else {
      Linking.openURL('telPrompt: ' + contact);
    }
  };

  return (
    <View style={profileStyles.root}>
      <LinearGradient
        colors={['#0a70c9', '#4ed4f2']}
        style={profileStyles.linearGradient}
      />
      <View style={profileStyles.alignCenter}>
        <Image
          style={profileStyles.imageStyle}
          source={{
            uri: picture,
          }}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 24}}>
        <Title>{name}</Title>
        <Title style={{fontSize: 16}}>{position}</Title>
      </View>
      <Card style={homeStyles.cardContainer}>
        <View style={profileStyles.cardContainer}>
          <MaterialIcons name="email" size={32} color="#0a70c9" />
          <Text
            style={profileStyles.textStyle}
            onPress={() => {
              Linking.openURL('mailto:' + email);
            }}>
            {email}
          </Text>
        </View>
        <View style={profileStyles.cardContainer}>
          <MaterialIcons name="call" size={32} color="#0a70c9" />
          <Text
            style={profileStyles.textStyle}
            onPress={() => {
              openDial();
            }}>
            {contact}
          </Text>
        </View>
        <View style={profileStyles.cardContainer}>
          <MaterialIcons name="attach-money" size={32} color="#0a70c9" />
          <Text style={profileStyles.textStyle}> {salary} LPA </Text>
        </View>
      </Card>

      <View style={CEStyles.modalButtonView}>
        <Button
          mode="contained"
          icon="account-edit"
          color="#0a70c9"
          onPress={() =>
            navigation.navigate('Add Employee', {
              _id,
              name,
              email,
              contact,
              position,
              salary,
              picture,
            })
          }>
          Edit
        </Button>
        <Button
          mode="contained"
          icon="delete"
          color="#0a70c9"
          onPress={() => deleteEmployee()}>
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const rad = 150;

export const profileStyles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 8,
  },
  buttonContainer: {
    marginTop: 10,
    padding: 8,
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
  root: {
    flex: 1,
  },
  linearGradient: {
    height: '16%',
  },
  cardStyle: {
    margin: 4,
  },
  imageStyle: {
    width: rad,
    height: rad,
    borderRadius: rad / 2,
    marginTop: -rad / 2,
  },
  textStyle: {
    fontSize: 16,
    margin: 4,
    marginLeft: 16,
  },
});
