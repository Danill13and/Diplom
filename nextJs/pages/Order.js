"use client"
import { useState } from 'react';
import styles from '../styles/order.module.css';
import Register from './Reg';
export default function Auth() {
  const url = 'http://localhost:8000'

  const [orderData, setOrderData] = useState({
    adress:'',
    phoneNumber:'',
  });

  const [userProds, setUserProds] = useState([]);
  
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
    fetch(`${url}/order`, {
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
  // handleGet()

  return (
    <main  className={styles.main}>
      <div className={styles.container}>

        <h1 className={styles.h}>Замовленя</h1>
            <div className={styles.basket}>
            <p> Кошик:</p>
            {/* {
        userProds.map((product, index)=>{
        return(
            <div key={index} className={styles.prod} >
                    <h1>{product.name}</h1>
                    <h1>{product.price}</h1>
            )
            })
        } */}
              </div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text"  placeholder="Адресса замовлення" name = 'adress' value={orderData.adress} onChange={orderForm} className={styles.input} />
            <input type="text"  placeholder="Номер телефону" name = 'phoneNumber' value={orderData.phoneNumber} onChange={orderForm} className={styles.input} />  
            <input type="submit" className={styles.button} value="Замовити"/>
        </form>
      </div>
    </main>
  );
  
}