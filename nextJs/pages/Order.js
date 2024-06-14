"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/order.module.css';
import Register from './Reg';
import { useCookies } from 'react-cookie'
export function Order({ isOpen, onClose }) {
  const url = 'http://localhost:8000'
  const [cookies, setCookies] = useCookies(['user_token'])
  const apiKey = cookies.api_key;
  const userToken = cookies.user_token;
  const [orderData, setOrderData] = useState({
    adress:'',
    phoneNumber:'',
  });

  const [userProds, setUserProds] = useState([]);
  
  const [showModal, setShowModal] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect((isOpen) => {
    setAnimate(true);
  }, [isOpen]);

  const closeModal = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  const orderForm = (e)=>{
    const iName = e.target.name
    const iValue = e.target.value
    setOrderData(val => ({ 
      ...val,
      [iName] : iValue
    }))
  }

  const handleGet = async (e) => {
    fetch(`${url}/getProductFromBasket`, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      }
    }) .then(Response =>{
      return Response.json()
    })
    .then( async data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    })

  };
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/send/', {
        method: 'POST',
        body: JSON.stringify(orderData, userProds.name)
    })
    .then(response => {
        return response.json()
        console.log(`orderData = ${orderData}`)
        console.log(`userProds = ${userProds}`)
    })
  }

  useEffect(() => {
    
    handleGet()
    
  })

  return (
    <>{isOpen && (
      <div className={`${styles.overlay} ${animate ? styles.fadeIn : styles.fadeOut}`} onClick={closeModal}>
        <div className={`${styles.modal} ${animate ? styles.zoomIn : styles.zoomOut}`} onClick={(e) => e.stopPropagation()}>
      <div className={styles.container}>
        <h1 className={styles.h}>Замовленя</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text"  placeholder="Адресса замовлення" name = 'adress' value={orderData.adress} onChange={orderForm} className={styles.input} />
            <input type="text"  placeholder="Номер телефону" name = 'phoneNumber' value={orderData.phoneNumber} onChange={orderForm} className={styles.input} />  
            <button method="submit" className={styles.button} >Замовити</button>
        </form>
      </div>
    </div>
    </div>
    )}</>
  );
  
}