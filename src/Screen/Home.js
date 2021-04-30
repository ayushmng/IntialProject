import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {Card, FAB} from 'react-native-paper';
// import Toast from 'react-native-toast-message';

export const Home = () => {
  const navigation = useNavigation();
  const rad = 80;

  const data = [
    {
      id: 1,
      name: 'Employee 1',
      age: '21',
      position: 'ReactNative Developer',
      imageLink: 'https://static.toiimg.com/photo/67538607.cms',
    },
    {
      id: 2,
      name: 'Employee 2',
      age: '22',
      position: 'Android Developer',
      imageLink:
        'https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg',
    },
    {
      id: 3,
      name: 'Employee 3',
      age: '23',
      position: 'IOS Developer',
      imageLink:
        'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
      id: 4,
      name: 'Employee 4',
      age: '24',
      position: 'FrontEnd Developer',
      imageLink:
        'https://miro.medium.com/max/875/1*PgIo7r6qQXem8BmWd-vksQ.jpeg',
    },
    {
      id: 5,
      name: 'Employee 5',
      age: '25',
      position: 'BackEnd Developer',
      imageLink:
        'https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg',
    },
  ];

  const renderList = ({id, name, age, position, imageLink}) => {
    return (
      <Card
        style={styles.cardContainer}
        onPress={() => {
          ToastAndroid.show('My id is: ' + id, ToastAndroid.SHORT);
        }}>
        <View style={styles.cardTextStyle}>
          <Image
            style={{
              width: rad,
              height: rad,
              borderRadius: rad / 2,
              margin: 4,
              padding: 12,
            }}
            source={{
              uri: imageLink,
            }}
          />
          <View style={styles.textViewStyle}>
            <Text style={styles.textInsideView}>Name: {name}</Text>
            <Text style={styles.textInsideView}>Age: {age}</Text>
            <Text style={styles.textInsideView}>Position: {position}</Text>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 20, marginTop: 8, marginLeft: 8}}>
            Hello Card {id}
          </Text>
        </View>
      </Card>
    );
  };

  const footerButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('ButtonComponent')}
          title="Go Next"
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data} //takes array as 1st parameter if flatList have to be customized
        renderItem={({item}) => {
          // console.log(item);
          return renderList(item); // 2nd argument as function so above we convert item as fun
        }}
        // providing key/id to array
        keyExtractor={({id}) => `${id}`}
        ListFooterComponent={footerButton}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{colors: {accent: '#d91862'}}}
        onPress={() => navigation.navigate('CreateEmployee')}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    padding: 8,
    borderRadius: 12,
  },
  cardTextStyle: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 48,
    padding: 8,
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    // alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 8,
  },
  textViewStyle: {
    marginLeft: 8,
    padding: 6,
  },
  textInsideView: {
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
