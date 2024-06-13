"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/order.module.css';
import Register from './Reg';
export function Order({ isOpen, onClose }) {
  const url = 'http://localhost:8000'

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

  const handleGet = (e) => {
    fetch(`${url}/basket`, {
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
      setUserProds(data)
    })

  };
  const handleSubmit = (e) => {
    fetch(`/api/send/`, {
      method:"POST",
      body: JSON.stringify(orderData),
      headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(Response =>{
        return Response.json()
      })
      
      

  };
  handleGet()

  return (
    <>{isOpen && (
      <div className={`${styles.overlay} ${animate ? styles.fadeIn : styles.fadeOut}`} onClick={closeModal}>
        <div className={`${styles.modal} ${animate ? styles.zoomIn : styles.zoomOut}`} onClick={(e) => e.stopPropagation()}>
      <div className={styles.container}>
        <h1 className={styles.h}>Замовленя</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text"  placeholder="Адресса замовлення" name = 'adress' value={orderData.adress} onChange={orderForm} className={styles.input} />
            <input type="text"  placeholder="Номер телефону" name = 'phoneNumber' value={orderData.phoneNumber} onChange={orderForm} className={styles.input} />  
            <input type="submit" className={styles.button} value="Замовити"/>
        </form>
      </div>
    </div>
    </div>
    )}</>
  );
  
}