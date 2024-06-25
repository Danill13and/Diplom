"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/order.module.css';
import Register from './Reg';
import { useCookies } from 'react-cookie'
import Router from "next/router";
<<<<<<< HEAD
require('dotenv').config()
export function Order({ isOpen, onClose }) {
  const url = process.env.url
=======
export function Order({ isOpen, onClose }) {
  const url = 'http://localhost:8000'
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9

  const [cookies, setCookies] = useCookies(['code'])
  const apiKey = cookies.apiKey;
  const userToken = cookies.user_token;
  const code = cookies.code
<<<<<<< HEAD
=======
  // const [orderData, setOrderData] = useState({
  //   adress:'',
  //   phoneNumber:'',
  // });

  // const [userProds, setUserProds] = useState([]);
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  
  const [showModal, setShowModal] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect((isOpen) => {
    setAnimate(true);
  }, [isOpen]);

  const closeModal = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  const [orderData, setOrderData] = useState({});

  const [userProds, setUserProds] = useState([]);
  const [userBasket, setUserbasket] = useState([]);
  const [user, setUser] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderPayload, setOrderPayload] = useState({});
<<<<<<< HEAD
  
=======
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  const orderForm = (e)=>{
    const iName = e.target.name
    const iValue = e.target.value
    setOrderData(val => ({ 
      ...val,
      [iName] : iValue
    }))
  }

<<<<<<< HEAD
=======
  function removePercentageSign(input) {
    return input.replace(/%/g, '');
}

>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  const calculateTotalPrice = (products, baskets) => {
    let total = 0;
    products.forEach((product, index) => {
      const basket = baskets[index];
      total += product.price * basket.count;
    });
    setTotalPrice(total);
  };

  const handleGet = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch(`https://chateerideeapi.onrender.com/getProductFromBasket`, {
=======
      const response = await fetch(`${url}/getProductFromBasket`, {
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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
<<<<<<< HEAD
=======
      console.log('Полученные данные:', data);
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      setUserProds(data.prod);
      setUserbasket(data.basket)
      setUser(data.user)
      calculateTotalPrice(data.prod, data.basket)
<<<<<<< HEAD
      await fetch(`https://chateerideeapi.onrender.com/getOrders`, {
=======
      await fetch(`http://localhost:8000/getOrders`, {
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "invoice-id": cookies.code
        }
      }).then(Response => {
        return Response.json()
      }).then(async (data)=>{
<<<<<<< HEAD
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
=======
        if(orderPayload === null || orderPayload == {} || orderPayload == { }){
          setOrderPayload(data.orderData, userProds, userBasket, user)
          console.log(orderPayload)
          await fetch(`http://localhost:8000/checkOrder`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }).then(Response => {
            return Response.json()
          }).then(data => {
            // console.log(JSON.stringify(data))
            if(data.status === 'success'){
              try {
                  const response = fetch('/api/send/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderPayload)
                  });
            
                  if (!response.ok) {
                    throw new Error('Ошибка при отправке данных');
                  }
            
                  const result = response.json();
                  console.log('Ответ сервера:', result);
                } catch (error) {
                  console.error('Ошибка при отправке данных:', error);
                }
            }
          })
        }else{
          await fetch(`http://localhost:8000/checkOrder`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }).then(Response => {
            return Response.json()
          }).then(data => {
            console.log(orderPayload)
            // console.log(JSON.stringify(data))
            if(data.status === 'success'){
              try {
                  const response = fetch('/api/send/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderPayload)
                  });
            
                  if (!response.ok) {
                    throw new Error('Ошибка при отправке данных');
                  }
            
                  const result = response.json();
                  console.log('Ответ сервера:', result);
                } catch (error) {
                  console.error('Ошибка при отправке данных:', error);
                }
            }
          })
        }
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      })
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOrderPayload(orderData, userProds, userBasket, user)
    
<<<<<<< HEAD
    fetch(`https://chateerideeapi.onrender.com/order`,{
      method:"POST",
      body: JSON.stringify({totalPrice: totalPrice, orderData: orderData}),
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'user_token': userToken
=======
    fetch(`${url}/order`,{
      method:"POST",
      body: JSON.stringify({totalPrice: totalPrice, orderData: orderData}),
      headers: {
        'Content-Type': 'application/json'
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
        }
      })
      .then((response) => {
        return response.json();
      })
      .then(data=>{
        setCookies('code', JSON.stringify(data.invoiceId))
        Router.push(data.pageUrl)
      })
  };

<<<<<<< HEAD
=======
  // const monoBank = async () => {
  //   console.log(cookies.code)
  //   await fetch(`http://localhost:8000/getOrders`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "invoice-id": cookies.code
  //     }
  //   }).then(Response => {
  //     return Response.json()
  //   }).then(async (data)=>{
  //     if(orderPayload === null || orderPayload == {} || orderPayload == { }){
  //       setOrderPayload(data.orderData, userProds, userBasket, user)

  //       await fetch(`http://localhost:8000/checkOrder`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }).then(Response => {
  //         return Response.json()
  //       }).then(data => {
  //         console,log(orderPayload)
  //         // console.log(JSON.stringify(data))
  //         if(data.status === 'success'){
  //           try {
  //               const response = fetch('/api/send/', {
  //                 method: 'POST',
  //                 headers: {
  //                   'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(orderPayload)
  //               });
          
  //               if (!response.ok) {
  //                 throw new Error('Ошибка при отправке данных');
  //               }
          
  //               const result = response.json();
  //               console.log('Ответ сервера:', result);
  //             } catch (error) {
  //               console.error('Ошибка при отправке данных:', error);
  //             }
  //         }
  //       })
  //     }else{
  //       await fetch(`http://localhost:8000/checkOrder`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }).then(Response => {
  //         return Response.json()
  //       }).then(data => {
  //         console.log(orderPayload)
  //         // console.log(JSON.stringify(data))
  //         if(data.status === 'success'){
  //           try {
  //               const response = fetch('/api/send/', {
  //                 method: 'POST',
  //                 headers: {
  //                   'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(orderPayload)
  //               });
          
  //               if (!response.ok) {
  //                 throw new Error('Ошибка при отправке данных');
  //               }
          
  //               const result = response.json();
  //               console.log('Ответ сервера:', result);
  //             } catch (error) {
  //               console.error('Ошибка при отправке данных:', error);
  //             }
  //         }
  //       })
  //     }
  //   })
  // };

>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  const handleSubmitt = async (e) => {
    
    e.preventDefault();

    setOrderPayload(orderData, userProds, userBasket)

<<<<<<< HEAD
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
        setCookies('code', JSON.stringify(data.invoiceId))
        Router.push(data.pageUrl)
=======
    fetch(`${url}/order`,{
      method:"POST",
      body: JSON.stringify({totalPrice: totalPrice}),
      headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(data=>{
        setCookies('code', JSON.stringify(data.invoiceId))
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      })
  };

  useEffect(() => {
    handleGet();
  }, []);
  if(cookies.apiKey){
    return (
      <>{isOpen && (
        <div className={`${styles.overlay} ${animate ? styles.fadeIn : styles.fadeOut}`} onClick={closeModal}>
          <div className={`${styles.modal} ${animate ? styles.zoomIn : styles.zoomOut}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <h1 className={styles.h}>Замовленя</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
              <input type="text"  placeholder="Адресса замовлення" name = 'adress' value={orderData.adress} onChange={orderForm} className={styles.input} />  
              <button  className={styles.button} >Замовити</button>
          </form>
        </div>
      </div>
      </div>
      )}</>
    );
  }
  else if(!cookies.apiKey){
    return (
      <>{isOpen && (
        <div className={`${styles.overlay} ${animate ? styles.fadeIn : styles.fadeOut}`} onClick={closeModal}>
          <div className={`${styles.modal} ${animate ? styles.zoomIn : styles.zoomOut}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <h1 className={styles.h}>Замовленя</h1>
          <form className={styles.form} onSubmit={handleSubmitt}>
              <input type="text"  placeholder="Ім'я" name = 'name' value={orderData.name} onChange={orderForm} className={styles.input} />
              <input type="text"  placeholder="Прізвище" name = 'sureName' value={orderData.surename} onChange={orderForm} className={styles.input} />
              <input type="text"  placeholder="Адресса замовлення" name = 'adress' value={orderData.adress} onChange={orderForm} className={styles.input} />
              <input type="text"  placeholder="Номер телефону" name = 'phoneNumber' value={orderData.phoneNumber} onChange={orderForm} className={styles.input} />  
<<<<<<< HEAD
              <button  className={styles.button} >Замовити</button>
=======
              <input type="submit" className={styles.button} value={Замовити} />
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
          </form>
        </div>
      </div>
      </div>
      )}</>
    );
  }
}