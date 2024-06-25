"use client"

import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import styles from '../styles/reg.module.css';
import { useCookies } from 'react-cookie'
<<<<<<< HEAD
require('dotenv').config()

export function Register({ isOpen, onClose }){
  const url = process.env.url
=======

export function Register({ isOpen, onClose }){
  const url = 'http://localhost:8000'
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  
  const [regData, setRegData] = useState({
    name: '',
    lastName:'',
    password: '',
    rePassword:'',
    phoneNumber: '',

})

 const [error, setError] = useState('');
 const [showModal, setShowModal] = useState(true);
 const [animate, setAnimate] = useState(false);
 const [cookies, setCookies] = useCookies(['apiKey'])


 useEffect((isOpen) => {
  setAnimate(true);
}, [isOpen]);

 const handleChange = async (e) => {
  
  const inputName = e.target.name
  const inputValue = e.target.value
  setRegData(prevValue => ({
      ...prevValue,
      [inputName]: inputValue
      
  }))

}

  const handleSubmit = (e) => {
<<<<<<< HEAD
    fetch(`https://chateerideeapi.onrender.com/createUsers`,{
=======
    fetch(`${url}/createUsers`,{
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      method:"POST",
      body: JSON.stringify(regData),
      headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(data=>{
        console.log(data)
        setCookies("apiKey", data.apikey)
        // setError(data.error)
      })
  }
  const closeModal = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  return (
    <>{isOpen && (
      <div className={`${styles.overlay} ${animate ? styles.fadeIn : styles.fadeOut}`} onClick={closeModal}>
        <div className={`${styles.modal} ${animate ? styles.zoomIn : styles.zoomOut}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.conteiner}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.h}>Реєстрація</h1>
              <div className={styles.separator}></div>
                <input type="text"  placeholder="Ім'я" name="name" value={regData.name} onChange={handleChange} className={styles.input}/>
                <input type="text"  placeholder="Прізвище" name="lastName" value={regData.lastName} onChange={handleChange} className={styles.input}/>
                <input type="password"  placeholder="Пароль" name="password" value={regData.password} onChange={handleChange} className={styles.input}/>
                <input type="password"  placeholder="Повторіть пароль" name="rePassword" value={regData.rePassword} onChange={handleChange} className={styles.input} />
                <input type="text"  placeholder="Номер телефону" name="phoneNumber" value={regData.phoneNumber} onChange={handleChange} className={styles.input} />  
                {error && <div className={styles.error}>{error}</div>}
                <input type="submit" className={styles.button} value='Зареєструватись'/>
            </form>
        </div>
      </div>
    </div>
    )}</>
  );
  
}
export default Register