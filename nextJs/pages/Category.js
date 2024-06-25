"use client"

import { useState, useEffect } from 'react';
import styles from '../styles/category.module.css';
import Image from "next/image";
import { format } from 'react-string-format';
import { useCookies } from 'react-cookie'
import {AuthModal} from "../pages/Auth"
import {Register} from "../pages/Reg"

export default function Category() {
<<<<<<< HEAD
=======
  const url = 'http://localhost:8000'

>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)
  const [categorys, setCategory] = useState([]);
  const [cookies, setCookies] = useCookies(['user_token'])
  
  const handleGet = (e) => {
<<<<<<< HEAD
    fetch(`https://chateerideeapi.onrender.com/AllCategory`, {
=======
    fetch(`${url}/AllCategory`, {
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      method:"GET",
    }) .then(Response =>{
      return Response.json()
    })
    .then(data=>{
      setCategory(data)
    })

  };
  
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
            
            <a onClick={openRegWin} className={styles.a}>Зареєструватись</a>
            <Register isOpen={regWin} onClose={closeRegWin} />
            <a onClick={openAuthModal} className={styles.a}>Авторизуватись</a>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

          </div>
        </div>
<<<<<<< HEAD
        <div className={styles.conteiner}>
=======
        <div>
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
      {
        categorys.map((category, index)=>{
      
        return(
<<<<<<< HEAD
            <a className={styles.a} href={format("/{0}",category.id)}>
              <div key={index} className={styles.prods} >
                <Image src={`${category.image}`} loader={()=>category.image} alt="Chatte Ridée" width={160} height={160} />
                <h1>{category.name}</h1>
              </div>
            </a>
=======
            <div key={index} className={styles.prods} >
                <a className={styles.a} href={format("/{0}",category.id)}>
                    <h1>{category.name}</h1>
                </a>
            </div>
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
            )
            })
        }
      </div>
      </main>
    );
  }
<<<<<<< HEAD
  else if (cookies.apiKey == "071864cc-2d85-43f3-883c-55a05e36b820"){
=======
  else if (cookies.apiKey == "c478890e-15c7-41c2-a821-c2c65210e96e"){
>>>>>>> 6c68cbffefc20cd82f8c9a5f20d7f821540180a9
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