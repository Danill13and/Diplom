"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from 'react-string-format';
export default function Main() {
  const url = 'http://localhost:8000'
  const urls = "http://localhost:3000"

  const [products, setProducts] = useState([]);

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
        setProducts(data)
    })

  };

  useEffect(() => {
    handleGet()
  })

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
      <div className={styles.container}>
      {
        products.map((product, index)=>{
      
        return(
            <div key={index} className={styles.prods} >
                <a className={styles.a} href={format("/mainProduct/{0}",product.id)}>
                    <div className={styles.prod} >
                    <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={110} height={110} />
                      <h1 className={styles.name}>{product.name}</h1>
                      <div className={styles.separator}></div>
                      <div className={styles.info} >
                        <p className={styles.infoT}>{product.price} грн</p>
                      </div>
                    </div>
                </a>

            </div>
            )
            })
        }
      </div>
    </main>
  );
  
}