import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Try switching me! 🎉</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Switch to Home Screen"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    padding: 8,
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
});
