import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { createAppContainer } from "react-navigation";
import {Home} from '../../Screen/Home';

export const ButtonComponent = ({navigation}) => {
  const [click, setClick] = useState(0);
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> Hello!!</Text>
      <Text> Welcome To React Native</Text>
      <Text style={styles.textStyleBottom}>Counter: {click}</Text>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => setClick(click - 1)}>
        <Text style={styles.colorWhite}>-</Text>
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
        }}>
        <TouchableOpacity
          onPress={() => setClick(click + 1)}
          style={styles.roundButton1}>
          <Text style={styles.colorWhite}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={
            () =>
              //   // this.props.navigation.navigate("Home", { name: "Ayush" })
              navigation.navigate('Home')
            // HomeScreen(navigation)
          }
          title="Submit"
        />
      </View>
    </View>
  );
};

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: 20,
    padding: 8,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
    textDecorationColor: 'white',
    backgroundColor: 'blue',
    textShadowColor: 'white',
  },

  roundButton1: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },

  textStyle: {
    marginTop: 8,
    padding: 2,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  textStyleBottom: {
    marginTop: 16,
    padding: 2,
  },

  colorWhite: {
    color: 'white',
  },
});
