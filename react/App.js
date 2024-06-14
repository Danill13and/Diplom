import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Image, TouchableOpacity } from 'react-native';
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
  const url = 'http://localhost:8000'
  
  const [error, setError] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [lastName, setLastName] = useState('')


  const regData= {"name": name, "password": password, "lastName":lastName, "phoneNumber":phoneNumber}


  function regUser() {
    fetch(`${url}/createUsers`,{
      method:"POST",
      body: JSON.stringify(regData),
      headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(data=>{
        console.log(data)
      })
  }

  return (
    <View style={registerStyles.main}>
    <View style={registerStyles.container}>
      <Text style={registerStyles.h}>Реєстрація</Text>
      <TextInput style={registerStyles.inp} value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Ім`я' />
      <TextInput style={registerStyles.inp} value={lastName} onChange={(e) => {setLastName(e.target.value)}}  placeholder='Прізвище' />
      <TextInput style={registerStyles.inp} value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Пароль'/>
      <TextInput style={registerStyles.inp} value={rePassword}  onChange={(e) => {setRePassword(e.target.value)}} placeholder='Повторіть пароль'/>
      <TextInput style={registerStyles.inp} value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} placeholder='Номер телефону'/>
      <TouchableOpacity style={registerStyles.button} onPress={regUser} variant="contained">
        <View>
        Зареєструватись
        </View>
      </TouchableOpacity>
    </View>
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

  const [products, setProduct] = useState([])

  const id = route.params.category.id

  const allProduct = async () =>{
    await fetch(`http://localhost:8000/getProduct/${id}`,{
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
      setProduct(data)
    })
  }

  allProduct()

  return (
    <View style={menuStyles.container}>
      {
      route.params &&(
        <View>
          {products.map((product) => (
        <TouchableOpacity >
          <Image source={{ uri: `${product.image}`}} style={{ width: 100, height: 100 }} />
          <Text style={categoryStyles.productText}>{product.name}</Text>
          <Text style={categoryStyles.productText}>{product.price}</Text>
        </TouchableOpacity>
      ))}
        </View>
      )}
    </View>
  )
}

const registerStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
  },
  container:{

    backgroundColor:"#FFFFFF",
    borderRadius:10,
    alignItems: 'center',
    gap: 20 ,
    width:"30%",
    minHeight:"80%",
    justifyContent: 'center',
  },
  inp:{
    paddingLeft:10,
    width:"80%",
    borderRadius:10,
    borderBlockColor:"black",
    height:"8%",
    backgroundColor:'#BDBDBD',
    fontSize:20
  }
  , button: {
    height:"6%",
    fontSize:25,
    backgroundColor: '#E6FF9E',
    borderRadius: 10, 
    padding: 10,
    marginBottom: 10,
    width: '50%',
    justifyContent:"center",
    alignItems:'center',

  }
  ,h:{
    fontSize:30,
    borderBottomWidth:2,
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