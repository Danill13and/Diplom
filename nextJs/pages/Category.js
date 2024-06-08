"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/category.module.css';
import Image from "next/image";
import { format } from 'react-string-format';

export default function Category() {
  const url = 'http://localhost:8000'

  const [categorys, setCategory] = useState([]);
  
  const handleGet = (e) => {
    fetch(`${url}/AllCategory`, {
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
        setCategory(data)
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
      <div>
      {
        categorys.map((category, index)=>{
      
        return(
            <div key={index} className={styles.prods} >
                <a className={styles.a} href={format("/{0}",category.id)}>
                    <h1>{category.name}</h1>
                </a>
            </div>
            )
            })
        }
      </div>
    </main>
  );
  
}