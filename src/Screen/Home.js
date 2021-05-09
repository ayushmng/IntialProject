import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {Profile} from './Profile';
// import Toast from 'react-native-toast-message';

export const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let baseUrl = 'http://192.168.0.105:3000/';

  const fetchData = () => {
    fetch(baseUrl)
      // fetch('http://10.0.2.2:3000/')
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setData(results);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Something went wrong !!');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const data = [
  //   {
  //     _id: 1,
  //     name: 'Shobita Neupane',
  //     email: 'shobita001@gmail.com',
  //     contact: '981234567',
  //     position: 'Content Writer',
  //     salary: '24',
  //     imageLink: 'https://static.toiimg.com/photo/67538607.cms',
  //   },
  //   {
  //     _id: 2,
  //     name: 'Ayush Katuwal',
  //     email: 'ayushmng.21@gmail.com',
  //     contact: '987654321',
  //     position: 'ReactNative Developer',
  //     salary: '72',
  //     imageLink:
  //       'https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg',
  //   },
  //   {
  //     _id: 3,
  //     name: 'Anil Ghimire',
  //     email: 'anilghimire@gmail.com',
  //     contact: '982345671',
  //     position: 'Flutter Developer',
  //     salary: '48',
  //     imageLink:
  //       'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
  //   },
  //   {
  //     _id: 4,
  //     name: 'Shova Sapkota',
  //     email: 'shova001@gmail.com',
  //     contact: '980765432',
  //     position: 'FrontEnd Developer',
  //     salary: '12',
  //     imageLink:
  //       'https://miro.medium.com/max/875/1*PgIo7r6qQXem8BmWd-vksQ.jpeg',
  //   },
  //   {
  //     _id: 5,
  //     name: 'Ashreeya Katuwal',
  //     email: 'ashreeyakatuwal156@gmail.com',
  //     contact: '980123456',
  //     position: 'BackEnd Developer',
  //     salary: '48',
  //     imageLink:
  //       'https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg',
  //   },
  // ];

  const renderList = (item) => {
    return (
      <Card
        style={homeStyles.cardContainer}
        onPress={() => {
          navigation.navigate('Profile', {item});
        }}>
        <View style={homeStyles.cardTextStyle}>
          <Image
            style={homeStyles.imageStyle}
            source={{
              uri: item.picture,
            }}
          />
          <View style={homeStyles.textViewStyle}>
            <Text style={homeStyles.textInsideView}>Email: {item.email}</Text>
            <Text style={homeStyles.textInsideView}>
              Contact No.: {item.contact}
            </Text>
            <Text style={homeStyles.textInsideView}>
              Position: {item.position}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 16, marginTop: 8, marginLeft: 8}}>
            {item.name}
          </Text>
        </View>
      </Card>
    );
  };

  const footerButton = () => {
    return (
      <View style={homeStyles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('ButtonComponent')}
          title="Go Next"
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000ff"
          style={{
            flex: 1,
            justifyContent: 'center',
            color: '#000ff',
          }}
        />
      ) : (
        <FlatList
          data={data} //takes array as 1st parameter if flatList have to be customized
          renderItem={({item}) => {
            return renderList(item); // 2nd argument as function so above we convert item as fun
          }}
          // providing key/id to array
          keyExtractor={({_id}) => `${_id}`} //converts int to string -> `${string}`
          ListFooterComponent={footerButton}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      )}

      <FAB
        style={homeStyles.fab}
        small={false}
        icon="plus"
        theme={{colors: {accent: '#d91862'}}}
        onPress={() => navigation.navigate('Add Employee')}
      />
    </View>
  );
};

const rad = 80;

export const homeStyles = StyleSheet.create({
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
  imageStyle: {
    width: rad,
    height: rad,
    borderRadius: rad / 2,
    margin: 4,
    padding: 12,
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
