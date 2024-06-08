"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import { useRouter } from "next/router";
import Image from "next/image";

export default function Main() {
  const url = 'http://localhost:8000'
  const urls = "http://localhost:3000"

  const [prods, setProds] = useState([]);
  const [cats, setCats] = useState([]);
  
  const router = useRouter()
  const {id} = router.query

  const handleGet = (e) => {
    console.log(id)
    fetch(`${url}/getProduct/${id}`, {
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
        setProds(data)
    })

  };

  handleGet()

  return (
    <main  className={styles.main}>

      <div className={styles.header}>
        <Image
        src="/icons8-croissant-96 1.png"
        width={50}
        height={50}
        alt="Picture of the author"/>
        <a href="/">
          <h1 className={styles.h1}>
            СhatteRidée
          </h1>
        </a>
        <div className={styles.box_in_header}>
        <a href="http://localhost:3000/basket">
          <p>
            Кошик
          </p>
        </a>
        <a href="http://localhost:3000/main">
          <p>
            Меню
          </p>
        </a>
        <a href="http://localhost:3000/Reg">
          <p>
            Зареєструватись  Авторизуватись
          </p>
        </a>
        </div>
      </div>
      
    </main>
  );
  
}