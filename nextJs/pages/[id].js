"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import { useRouter } from "next/router";
import Image from "next/image";
import {AuthModal} from "../pages/Auth"
import {Register} from "../pages/Reg"
import { format } from 'react-string-format';
export default function Main() {
  const url = 'http://localhost:8000'
  const urls = "http://localhost:3000"

  const [products, setProducts] = useState([]);

  const router = useRouter()
  const {id} = router.query
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)
  
  const openRegWin =()=>{
    setRegWin(true)
  }
  const closeRegWin =()=>{
    setRegWin(false)
  }
  
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

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
        <a onClick={openRegWin} className={styles.clickable}>Зареєструватись</a>
    <Register isOpen={regWin} onClose={closeRegWin} />
  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <a onClick={openAuthModal} className={styles.clickable}>Авторизуватись</a>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </div>
      </div>
      <div className={styles.container}>
      {
        products.map((product, index)=>{
      
        return(
            <div key={index} className={styles.prods} >
                <a className={styles.a} href={format("/mainProduct/{0}",product.id)}>
                    <div className={styles.prod} >
                    <Image src={`${product.image}`} loader={()=>product.image} alt="Chatte Ridée" width={160} height={160} />
                      <div className={styles.info} >
                      <h1  className={styles.name}> {product.name}</h1>
                      <div className={styles.separator}></div>

                      <p className={styles.infoT}>{product.price} грн</p>
                      
                      </div>
                      <input type="submit" className={styles.button} value='Докладніше'/>
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