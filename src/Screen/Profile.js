import React from 'react';
import {Text, Image, View, StyleSheet, Linking, Platform} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {homeStyles} from './Home';
import {CEStyles} from './CreateEmployee';

export const Profile = (props) => {
  const navigation = useNavigation();

  const {
    id,
    name,
    email,
    contact,
    position,
    salary,
    imageLink,
  } = props.route.params.item;

  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel: ' + contact);
    } else {
      Linking.openURL('telPrompt: ' + contact);
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0a70c9', '#4ed4f2']}
        style={styles.linearGradient}
      />
      <View style={styles.alignCenter}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: imageLink,
          }}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 24}}>
        <Title>{name}</Title>
        <Title style={{fontSize: 16}}>{position}</Title>
      </View>
      <Card style={homeStyles.cardContainer}>
        <View style={styles.cardContainer}>
          <MaterialIcons name="email" size={32} color="#0a70c9" />
          <Text
            style={styles.textStyle}
            onPress={() => {
              Linking.openURL('mailto:' + email);
            }}>
            {email}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <MaterialIcons name="call" size={32} color="#0a70c9" />
          <Text
            style={styles.textStyle}
            onPress={() => {
              openDial();
            }}>
            {contact}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <MaterialIcons name="attach-money" size={32} color="#0a70c9" />
          <Text style={styles.textStyle}> {salary} LPA </Text>
        </View>
      </Card>

      <View style={CEStyles.modalButtonView}>
        <Button
          mode="contained"
          icon="account-edit"
          color="#0a70c9"
          // onPress={() => setModal(false)}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          icon="delete"
          color="#0a70c9"
          // onPress={() => setModal(false)}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const rad = 150;

const styles = StyleSheet.create({
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
