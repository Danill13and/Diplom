"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/category.module.css';
import Image from "next/image";
import { format } from 'react-string-format';
import { useCookies } from 'react-cookie'
import {AuthModal} from "../pages/Auth"
import {Register} from "../pages/Reg"

export default function Category() {
  const url = 'http://localhost:8000'

  const [categorys, setCategory] = useState([]);
  const [cookies, setCookies] = useCookies(['user_token'])
  
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

  if(!cookies.apiKey){
    return (
      <main className={styles.main}>
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
            <a className={styles.a}  href="/basket">
              Кошик
            </a>
            <a className={styles.a}  href="/Category">
              Меню
            </a>
            
            {/* <a onClick={openRegWin} className={styles.a}>Зареєструватись</a>
            <Register isOpen={regWin} onClose={closeRegWin} />
            <a onClick={openAuthModal} className={styles.a}>Авторизуватись</a>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} /> */}
          {/* <div>
          </div> */}
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
  else if (cookies.apiKey == "c478890e-15c7-41c2-a821-c2c65210e96e"){
    return (
      <main className={styles.main}>
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
            <a className={styles.a} href="/Create_category">Админ</a>
          <div>
          </div>
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
  else if(cookies.apiKey){
    return (
      <main className={styles.main}>
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
            <a className={styles.a}>Профіль</a>
          <div>
          </div>
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
}