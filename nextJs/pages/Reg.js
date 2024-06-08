"use client"

import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import styles from '../styles/reg.module.css';

 const Register = ({ onClose, children, title })=> {
  const url = 'http://localhost:8000'
  
  const [regData, setRegData] = useState({
    name: '',
    lastName:'',
    password: '',
    rePassword:'',
    phoneNumber: '',

})

 const [error, setError] = useState('');



 const handleChange = (e) => {
  
  const inputName = e.target.name
  const inputValue = e.target.value
  setRegData(prevValue => ({
      ...prevValue,
      [inputName]: inputValue
      
  }))

}

  const handleSubmit = (e) => {
    fetch(`${url}/createUsers`,{
      method:"POST",
      body: JSON.stringify(regData),
      headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(response =>{
        return response.json()
      })
      .then(data=>{
        setError(data.error)
      })

    
      const modalWrapperRef = React.useRef();

      const backDropHandler = useCallback(e => {
        if (!modalWrapperRef?.current?.contains(e.target)) {
            onClose();
        }
    }, []);
  
      useEffect(() => {
          setTimeout(() => {
              window.addEventListener('click', backDropHandler);
          })
      }, [])
  
      useEffect(() => {
          return () => window.removeEventListener('click', backDropHandler);
      }, []);
      
      
      const handleCloseClick = (e) => {
          e.preventDefault();
          onClose();
      };
      
      
      
  
      const modalContent = (
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
           <a  href="http://localhost:3000/Auth">
            <p>Вже Зареєстровані?</p>
           </a>
        </form>
      </div>
      );

  
      return ReactDOM.createPortal(
          modalContent,
          document.getElementById("modal-root")
      );
  };
  // return (
  //   // <main  className={styles.main}>
  //   //   {/* <div className={styles.header}>
  //   //       <h1 >СhatteRidée</h1>
  //   //   </div> */}
  //     <div className={styles.conteiner}>
  //       <form className={styles.form} onSubmit={handleSubmit}>
  //       <h1 className={styles.h}>Реєстрація</h1>
  //       <div className={styles.separator}></div>
  //         <input type="text"  placeholder="Ім'я" name="name" value={regData.name} onChange={handleChange} className={styles.input}/>
  //         <input type="text"  placeholder="Прізвище" name="lastName" value={regData.lastName} onChange={handleChange} className={styles.input}/>
  //         <input type="password"  placeholder="Пароль" name="password" value={regData.password} onChange={handleChange} className={styles.input}/>
  //         <input type="password"  placeholder="Повторіть пароль" name="rePassword" value={regData.rePassword} onChange={handleChange} className={styles.input} />
  //         <input type="text"  placeholder="Номер телефону" name="phoneNumber" value={regData.phoneNumber} onChange={handleChange} className={styles.input} />  
  //         {error && <div className={styles.error}>{error}</div>}
  //         <input type="submit" className={styles.button} value='Зареєструватись'/>
  //          <a  href="http://localhost:3000/Auth">
  //           <p>Вже Зареєстровані?</p>
  //          </a>
  //       </form>
  //     </div>
  //   // </main>
  // );
  
}
export default Register