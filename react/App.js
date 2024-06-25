import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, Button, Modal, Linking } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Router } from 'react-router';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'main'>
        <Stack.Screen name = 'register' component = {Register} />
        <Stack.Screen name = 'main' component = {Main} />
        <Stack.Screen name = 'category' component = {Category} />
        <Stack.Screen name = 'menu' component = {Menu} />
        <Stack.Screen name = 'order' component = {Order} />
        <Stack.Screen name = 'mainOfProduct' component = {MainOfProduct} />
        <Stack.Screen name = 'auth' component = {Auth} />
        <Stack.Screen name = 'basket' component = {Basket} />
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


  const regData= {"name": name, "password": password, "lastName":lastName, "phoneNumber":phoneNumber, "rePassword":rePassword}


  function regUser() {
    fetch(`https://chateerideeapi.onrender.com/createUsers`,{
      method:"POST",
      body: JSON.stringify(regData),
      headers: {
        'Content-Type': 'application/json'
        }
      })
    .then(Response => {
      return Response.json()
    })
      .then(data=>{
        if(data.error){
          setError(data.error)
        }else{
          AsyncStorage.setItem('apiKey', data.apikey);///Set any thing from AsyncStorage
          navigation.navigate('main');
        }
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
        <Text>Зареєструватись</Text>
        </View>
      </TouchableOpacity>
      <Text>{error}</Text>
    </View>
    </View>
  );
}
export function Auth({ navigation }) {
  const url = 'http://localhost:8000';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    const userData = {
      name: firstName,
      surName: lastName,
      password
    };

    try {
      const response = await fetch(`${url}/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const user = await response.json();
      setSuccess(`Welcome, ${user.name}!`);
      console.log(user.apikey)
      await AsyncStorage.setItem('apiKey', user.apikey);
      navigation.navigate('main');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View>
      <Text>Авторизація</Text>
      <View></View>

      <TextInput
        placeholder="Ім'я"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Прізвище"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Авторизуватись</Text>
      </TouchableOpacity>

      {error ? <Text>{error}</Text> : null}
      {success ? <Text>{success}</Text> : null}
    </View>
  );
}

const Basket = ({ navigation }) => {
  const [orderWin, setOrderWin] = useState(false);
  const [products, setProducts] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTokens = async () => {
    try {
      const apiKey = await AsyncStorage.getItem('apiKey');
      const userToken = await AsyncStorage.getItem('user_token');///Get any thing from AsyncStorage
      return { apiKey, userToken };
    } catch (error) {
      console.error('Error fetching tokens from AsyncStorage:', error);
      return { apiKey: null, userToken: null };
    }
  };

  const openOrder = () => setOrderWin(true);
  const closeOrder = () => setOrderWin(false);

  const handleGet = async () => {
    try {
      const { apiKey, userToken } = await getTokens();
      const response = await fetch(`https://chateerideeapi.onrender.com/getProductFromBasket`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'user_token': userToken,
        },
      });
      const data = await response.json();
      setProducts(data.prod);
      setBaskets(data.basket);
      calculateTotalPrice(data.prod, data.basket);
    } catch (error) {
      console.error('Error fetching basket:', error);
    }
  };

  const handlePlus = async (id) => {
    try {
      const { apiKey, userToken } = await getTokens();
      await fetch(`https://chateerideeapi.onrender.com/productPlus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'user_token': userToken,
        },
        body: JSON.stringify({ id }),
      });
      handleGet();
    } catch (error) {
      console.error('Error increasing product count:', error);
    }
  };

  const handleMinus = async (id) => {
    try {
      const { apiKey, userToken } = await getTokens();
      await fetch(`https://chateerideeapi.onrender.com/productMinus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'user_token': userToken,
        },
        body: JSON.stringify({ id }),
      });
      handleGet();
    } catch (error) {
      console.error('Error decreasing product count:', error);
    }
  };

  const calculateTotalPrice = (products, baskets) => {
    let total = 0;
    products.forEach((product, index) => {
      const basket = baskets[index];
      total += product.price * basket.count;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleGet();
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text>Ваш кошик</Text>
        <View>
          {products.map((product, index) => {
            const basket = baskets[index];
            return (
              <View key={product.id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{product.name}</Text>
                <Text>{product.price} UAH</Text>
                <Button title="+" onPress={() => handlePlus(basket.id)} />
                {basket && (
                  <View>
                    <Text>{basket.count}</Text>
                  </View>
                )}
                <Button title="-" onPress={() => handleMinus(basket.id)} />
              </View>
            );
          })}
        </View>
        <Text>Загальна вартість: {totalPrice} UAH</Text>
        <Button title="Замовити та сплатити" onPress={() => navigation.navigate('order')} />
      </ScrollView>
    </View>
  );
};

const MainOfProduct = ({ route, navigation }) => {
  const url = 'http://localhost:8000';
  const [product, setProduct] = useState();
  const [image, setImage] = useState(' ');
  const [name, setName] = useState(' ');
  const [price, setPrice] = useState(' ');
  const [ingredients, setIngredients] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [showAlert, setShowAlert] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const id = route.params.product.id

  const handleGet = async () => {
    console.log(id);
    try {
      const response = await fetch(`https://chateerideeapi.onrender.com/mainProduct/${id}`, { method: 'GET' });
      const data = await response.json();
      console.log(data);
      setImage(data.image);
      setName(data.name);
      setPrice(data.price);
      setIngredients(data.ingredients);
      setDescription(data.description);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddToBasket = async () => {
    try {
      const apiKey = await AsyncStorage.getItem('apiKey');
      const userToken = await AsyncStorage.getItem('user_token');

      const response = await fetch(`https://chateerideeapi.onrender.com/addToBasket/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
          'user_token': userToken,
        },
      });
      const data = await response.json();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      console.log(data);
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  useEffect(() => {
    if (id && !product) {
      handleGet();
    }
  }, [id]);

  const truncateText = (text, limit, showMoreHandler) => {
    if (text.length > limit) {
      return (
        <>
          {text.substring(0, limit)}...
          <TouchableOpacity onPress={showMoreHandler}>
            <Text>↓ Детальніше ↓</Text>
          </TouchableOpacity>
        </>
      );
    }
    return text;
  };

  return (
    <ScrollView>
      <View>
        <Text>СhatteRidée</Text>
      </View>
      <View>
        <Text>{name}</Text>
        <Image source={{ uri: `${url}/${image}` }} style={{ width: 354, height: 256 }} />
        <Text>{price} грн.</Text>
        <View></View>
        <Text>{truncateText(ingredients, 50, () => setShowIngredients(true))}</Text>
        <View></View>
        <Text>{truncateText(description, 60, () => setShowDescription(true))}</Text>
        <Button title="Додати до Кошику" onPress={handleAddToBasket} />
      </View>

      <Modal visible={showAlert} transparent={true} animationType="fade">
        <View>
          <View>
            <Text>Товар додано до кошику</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={showIngredients} transparent={true} animationType="fade">
        <TouchableOpacity onPress={() => setShowIngredients(false)}>
          <View>
            <Text>Інгредієнти</Text>
            <Text>{ingredients}</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showDescription} transparent={true} animationType="fade">
        <TouchableOpacity onPress={() => setShowDescription(false)}>
          <View>
            <Text>Опис</Text>
            <Text>{description}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

function Main({ navigation }){
  return (
    <View style={mainStyles.container}>
      <View style={mainStyles.box}>
        <Image style={mainStyles.tinyLogo} source={require('./assets/icons8-croissant-96 1.png')}></Image>
        <Text>ChateeRidee</Text>
        <TouchableOpacity onPress={() => navigation.navigate('basket')}>
          <Text style={mainStyles.butt}>Кошик</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('category')}>
          <Text style={mainStyles.butt}>Меню</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={mainStyles.butt}>Зареєструватись</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('auth')}>
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
    await fetch(`https://chateerideeapi.onrender.com/AllCategory`,{
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
        <TouchableOpacity onPress={() => navigation.navigate('order')}>
          <Text style={categoryStyles.butt}>Замовити</Text>
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
    await fetch(`https://chateerideeapi.onrender.com/getProduct/${id}`,{
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
        <View style={menuStyles.main} >
          {products.map((product) => (
          <TouchableOpacity style={menuStyles.box} onPress={() => {navigation.navigate('mainOfProduct', {product:product})}}>
          <View >
          <Image source={{ uri: `${product.image}`}} style={{ width: 200, height: 200 }} />
          <Text style={menuStyles.text}>{product.name}</Text>
          <Text style={menuStyles.text}>{product.price}</Text>
            <TouchableOpacity style={menuStyles.buttonContainer} onPress={() => {navigation.navigate('mainOfProduct', {product:product})}}>
              <Text>Докладніше</Text>
            </TouchableOpacity>
          </View >
        </TouchableOpacity>
      ))}
        </View>
      )}
    </View>
  )
}

function Order({ navigation }){

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Ошибка при открытии URL: ", err)
    );
  };

  const getTokens = async () => {
    try {
      const apiKey = await AsyncStorage.getItem('apiKey')
      const userToken = await AsyncStorage.getItem('userToken')
      const code = await AsyncStorage.getItem('code')
      return { apiKey, userToken, code };
    } catch (error) {
      console.error('Error fetching tokens from AsyncStorage:', error);
      return { apiKey: null, userToken: null, code: null};
    }
  };


  const [orderData, setOrderData] = useState('');

  const [userProds, setUserProds] = useState([]);
  const [userBasket, setUserbasket] = useState([]);
  const [user, setUser] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)




  const calculateTotalPrice = (products, baskets) => {
    let total = 0;
    products.forEach((product, index) => {
      const basket = baskets[index];
      total += product.price * basket.count;
    });
    setTotalPrice(total);
  };

  const handleGet = async () => {
    const { apiKey, userToken, code } = await getTokens();


    try {
      const response = await fetch(`https://chateerideeapi.onrender.com/getProductFromBasket`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'api-key': apiKey,
          'user_token': userToken
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка сети или сервера');
      }

      const data = await response.json();
      setUserProds(data.prod);
      setUserbasket(data.basket)
      setUser(data.user)
      calculateTotalPrice(data.prod, data.basket)
      await fetch(`https://chateerideeapi.onrender.com/getOrders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "invoice-id": code
        }
      }).then(Response => {
        return Response.json()
      }).then(async (data)=>{
        console.log(data)
        await fetch(`https://chateerideeapi.onrender.com/checkOrder`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "order-data": data.orderData,
            'user_token': userToken
          }
        }).then(Response => {
          return Response.json()
        })
      })
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleSubmit = async (e) => {
    const { apiKey, userToken } = await getTokens();

    
    e.preventDefault();
    
    fetch(`https://chateerideeapi.onrender.com/order`,{
      method:"POST",
      body: JSON.stringify({totalPrice: totalPrice, orderData: orderData}),
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'user_token': userToken
        }
      })
      .then((response) => {
        return response.json();
      })
      .then(data=>{
        AsyncStorage.setItem('code', data.invoiceId);
        openLink(data.pageUrl)
      })
  };



  useEffect(() => {
    handleGet();
  }, []);

  return (
    <View style={[orderStyles.main,  ]}>
    <View style={orderStyles.container}>
      <Text style={orderStyles.h}>Замовленя</Text>
      <TextInput style={orderStyles.inp} name = "adress" value={orderData} onChange={(e) => {setOrderData(e.target.value)}}  placeholder='Адресса доставки'/>
      <TouchableOpacity style={registerStyles.button} onPress={handleSubmit} >
        <View>
        <Text style={orderStyles.h}>Замовити</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const mainOfProductStyles = StyleSheet.create({
})

const orderStyles = StyleSheet.create({

})

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
    width:"70%",
    minHeight:"70%",
    justifyContent: 'center',
  },
  inp:{
    paddingLeft:10,
    width:"80%",
    borderRadius:10,
    borderBlockColor:"black",
    height:"8%",
    backgroundColor:'#E0E0E0',
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
    justifyContent: 'center',
  },
  box:{
    width: '80%',
    minHeight: "10%",
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    direction: "row",
    borderRadius: 5,
    backgroundColor:"#282828",
    padding:5,
  },
  text: {
    fontSize:20,
    color:"white",
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    color:"black",
    backgroundColor:"#E6FF9E",
    borderRadius: 5,
    height:"15%",
    fontSize:25,
    
  },
  main:{
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    gap:30
  },

})