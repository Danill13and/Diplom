"use client"

import { useState } from 'react';
import styles from '../styles/create_category.module.css';
import Image from "next/image";

export default function Auth() {
  
  const [name, setname] = useState("")

  const handleChange = (e) => {
    const inputValue = e.target.value
    setadress(inputValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/createCategory", {
      method: "POST",
      body: JSON.stringify(name),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Image
        // src="../public/icon.png"
        width={50}
        height={50}
        alt="Picture of the author"/>
        <a href="/" className={styles.a}>
          <h1 className={styles.h1}>
            СhatteRidée
          </h1>
        </a>
        <div className={styles.box_in_header}>
        <a href="/Basket" className={styles.a}>
          <p>
            Кошик
          </p>
        </a>
        <a href="/Menu" className={styles.a}>
          <p>
            Меню
          </p>
        </a>
        <a href="/Reg" className={styles.a}>
          <p>
            Зареєструватись/ Авторизуватись
          </p>
        </a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <h1>Створити категорію</h1>
          <div className={styles.separator}></div> 
          <form onSubmit={handleSubmit}>
            <input type="text" id="firstName" placeholder="Назва категорії:" value={name.name} onChange={handleChange} className={styles.input}/>
          </form>
          <button type="submit" className={styles.button}>Створити</button>
        </div>
      </div>
    </div>
  );
}