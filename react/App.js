import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'main'>
        <Stack.Screen name = 'register' component = {Register} />
        <Stack.Screen name = 'main' component = {Main} />
        <Stack.Screen name = 'category' component = {Category} />
        <Stack.Screen name = 'menu' component = {Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Register({ navigation }){
  return (
    <View style={registerStyles.container}>
      <Text>Реєстрація</Text>
      <TextInput style={registerStyles.inp} placeholder='Ім`я' />
      <TextInput style={registerStyles.inp} placeholder='Прізвище' />
      <TextInput style={registerStyles.inp} placeholder='Пароль'/>
      <TextInput style={registerStyles.inp} placeholder='Повторіть пароль'/>
      <TextInput style={registerStyles.inp} placeholder='Номер телефону'/>
      <Button variant="contained">Зареєструватись</Button>
    </View>
  );
}

function Main({ navigation }){
  return (
    <View style={mainStyles.container}>
      <View style={mainStyles.box}>
        <Image style={mainStyles.tinyLogo} source={require('./assets/icons8-croissant-96 1.png')}></Image>
        <Text>ChateeRidee</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={mainStyles.butt}>Кошик</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('category')}>
          <Text style={mainStyles.butt}>Меню</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={mainStyles.butt}>Зареєструватись</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={mainStyles.butt}>Авторизуватись</Text>
        </TouchableOpacity>
      </View>
      <View style={mainStyles.container}>
        <Text>Main</Text>
      </View>
    </View>
  );
}

function Category({ navigation }){

  const [categorys, setCategory] = useState([])

  const allCategory = async () =>{
    await fetch(`http://localhost:8000/AllCategory`,{
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
      },
    })
    .catch(error => {
      console.error(error);
      console.log(error);
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setCategory(data)
    })
  }

  allCategory()

  return (
    <View style={categoryStyles.container}>
      <View style={categoryStyles.box}>
        <Image style={categoryStyles.tinyLogo} source={require('./assets/icons8-croissant-96 1.png')}></Image>
        <Text>ChateeRidee</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={categoryStyles.butt}>Кошик</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('category')}>
          <Text style={categoryStyles.butt}>Меню</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={categoryStyles.butt}>Зареєструватись</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={categoryStyles.butt}>Авторизуватись</Text>
        </TouchableOpacity>
      </View>
      <View>
      {categorys.map((category) => (
        <TouchableOpacity 
          key={category.id} 
          style={categoryStyles.productContainer}
          onPress={() => {navigation.navigate('menu', {category:category})}}>
          <Text style={categoryStyles.productText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
      </View>
    </View>
  );
}

function Menu({ route, navigation }){
  return (
    <View style={menuStyles.container}>
      {
      route.params &&(
        <View>
          <Text>
            {route.params.category.name}
          </Text>
        </View>
      )}
    </View>
  )
}

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
  },
  inp:{
    width:"60%",
    borderRadius:10,
    borderBlockColor:"black",
    height:"6%"
  },
  butt:{
    width:"50%",
    borderRadius:10,
    borderBlockColor:"black",
    height:"6%",
  }
});

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  box:{
    flex: 1,
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  link: {
    flex: 1,
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '30%'
  }
})

const categoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
  },
  box:{
    flex: 1,
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#F2F2F2', 
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '70%',
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#524449',
    borderRadius: 10, 
    padding: 10,
    marginBottom: 10,
    width: '50%',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F2F2F2',
  },
  productContainer: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '45%',
    height: '40%',
    alignSelf: 'center'
  },
  productText: {
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
})

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
  },
  box:{
    flex: 1,
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#F2F2F2', 
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '70%',
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
  },
})