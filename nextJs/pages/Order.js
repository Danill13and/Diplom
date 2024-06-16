"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/order.module.css';
import Register from './Reg';
import { useCookies } from 'react-cookie'
export function Order({ isOpen, onClose }) {
  const url = 'http://localhost:8000'

  const [cookies, setCookies] = useCookies(['user_token'])
  const apiKey = cookies.apiKey;
  const userToken = cookies.user_token;
  // const [orderData, setOrderData] = useState({
  //   adress:'',
  //   phoneNumber:'',
  // });

  // const [userProds, setUserProds] = useState([]);
  
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

  const orderForm = (e)=>{
    const iName = e.target.name
    const iValue = e.target.value
    setOrderData(val => ({ 
      ...val,
      [iName] : iValue
    }))
  }

  const handleGet = async () => {
    try {
      const response = await fetch(`${url}/getProductFromBasket`, {
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
      console.log('Полученные данные:', data);
      setUserProds(data.prod);
      setUserbasket(data.basket)
      setUser(data.user)
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderPayload = {
      orderData,
      userProds,
      userBasket,
      user
    };
    
    try {
      const response = await fetch('/api/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      const result = await response.json();
      console.log('Ответ сервера:', result);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();

    const orderPayload = {
      orderData,
      userProds,
      userBasket
    };
    
    try {
      const response = await fetch('/api/send/', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      const result = await response.json();
      console.log('Ответ сервера:', result);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
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
              <input type="submit" className={styles.button} value={Замовити} />
          </form>
        </div>
      </div>
      </div>
      )}</>
    );
  }
}