"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/order.module.css';
import Register from './Reg';
import { useCookies } from 'react-cookie'
import Router from "next/router";
require('dotenv').config()
export function Order({ isOpen, onClose }) {
  const url = process.env.url

  const [cookies, setCookies] = useCookies(['code'])
  const apiKey = cookies.apiKey;
  const userToken = cookies.user_token;
  const code = cookies.code
  
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
  
  const orderForm = (e)=>{
    const iName = e.target.name
    const iValue = e.target.value
    setOrderData(val => ({ 
      ...val,
      [iName] : iValue
    }))
  }

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
          "invoice-id": cookies.code
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
    e.preventDefault();

    setOrderPayload(orderData, userProds, userBasket, user)
    
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
      })
  };

  const handleSubmitt = async (e) => {
    
    e.preventDefault();

    setOrderPayload(orderData, userProds, userBasket)

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
              <button  className={styles.button} >Замовити</button>
          </form>
        </div>
      </div>
      </div>
      )}</>
    );
  }
}