"use client"

import React from 'react';
import Image from 'next/image';
import styles from '../../styles/mainProduct.module.css'; 
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

const MainProduct = () => {

  const url = 'http://localhost:8000'

  const [products, setProduct] = useState([]);
  const router = useRouter()
  const {id} = router.query

  const handleGet = (e) => {
    console.log(id)
    fetch(`${url}/mainProduct/${id}`, {
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
      console.log(data)
      setProduct(data)
    })

  };

  useEffect(()=>{if (router.asPath !== router.route) {handleGet()}},[router])

  return (
    <>
      <header className={styles.header}>
        <h1>СhatteRidée</h1>
      </header>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <h2 className={styles.h2}>Круасани</h2>
          <Image className={styles.image} src="/photo_2024-05-28_19-08-22.jpg" alt="Фото круасану" width={354} height={256} />
          <p className={styles.price}>75$</p>
          <div className={styles.separator}></div>
          <p className={styles.ingredients}>Борошно, яйця, сухі дріжджі, вершкове масло, вода, молоко, цукор, сіль.</p>
          <div className={styles.separator}></div> 
          <p className={styles.description}>Круасани — ніжні вироби з листкового тіста з багатошаровою текстурою та золотистою скоринкою, ідеальні для сніданку або перекусу.</p>
          
          <button className={styles.button} onClick={() => alert('Товар добавлен в корзину')}>Додати до Кошику</button>
        </div>
      </div>
    </>
  );
};

export default MainProduct;
