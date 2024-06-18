"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/main.module.css';
import { useRouter } from "next/router";
import Image from "next/image";
import {AuthModal} from "../pages/Auth"
import {Register} from "../pages/Reg"
import { format } from 'react-string-format';
import { useCookies } from 'react-cookie'
export default function Main() {
  const url = 'http://localhost:8000'
  const urls = "http://localhost:3000"

  const [products, setProducts] = useState([]);

  const router = useRouter()
  const {id} = router.query
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)
  const [cookies, setCookies] = useCookies(['user_token'])
  
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
  if(!cookies.apiKey){
  return (
    <main  className={styles.main}>

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
            <Register isOpen={regWin} onClose={closeRegWin} />
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
            <a className={styles.a}  href="/basket">
              Кошик
            </a>
            <a className={styles.a}  href="/Category">
              Меню
            </a>
            
            <a onClick={openRegWin} className={styles.a}>Зареєструватись</a>
            <a onClick={openAuthModal} className={styles.a}>Авторизуватись</a>

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
  else if (cookies.apiKey == "c478890e-15c7-41c2-a821-c2c65210e96e"){
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
          <a href="/basket">
            <p>
              Кошик
            </p>
          </a>
          <a href="/Category">
            <p>
              Меню
            </p>
          </a>
          <a className={styles.a} href="/Create_category">
            <p>
              Админ
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
  else if(cookies.apiKey){
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
          <a href="/basket">
            <p>
              Кошик
            </p>
          </a>
          <a href="/main">
            <p>
              Меню
            </p>
          </a>
          <a className={styles.a}>
            <p>
              Профіль
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
}