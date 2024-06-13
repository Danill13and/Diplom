"use client"

import { useState } from 'react';
import styles from '../styles/create_category.module.css';
import Image from "next/image";

export default function Auth() {
  
  const [name, setname] = useState("")

  const handleChange = (e) => {
    const inputValue = e.target.value
    setname(inputValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/createCategory", {
      method: "POST",
      body: JSON.stringify({ name }),
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
        <div className={styles.divLogo}>
          <Image
            src="/icons8-croissant-96 1.png"
            width={50}
            height={50}
            alt=""/>
          <a className={styles.logoName} href="/">
            СhatteRidée
          </a>
        </div>
        <div className={styles.headerButtons}>
          <a className={styles.a}  href="/Basket">
            Кошик
          </a>
          <a className={styles.a}  href="/Category">
            Меню
          </a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <h1>Створити категорію</h1>
          <hr className={styles.hr_line}/>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" id="firstName" placeholder="Назва категорії:" value={name.name} onChange={handleChange} className={styles.input}/>
            <button type="submit" className={styles.button}>Створити</button>
          </form>
        </div>
      </div>
    </div>
  );
}