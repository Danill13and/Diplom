"use client"

import Image from "next/image";
import styles from "./page.module.css";
import {AuthModal} from "../pages/Auth"
import {Register} from "../pages/Reg"
import { useState, useEffect  } from 'react';
const { v4: uuidv4 } = require('uuid');
import { useCookies } from 'react-cookie'

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin]=useState(false)
  const [cookies, setCookies] = useCookies(['user_token'])
  const [status, setStatus] = useState()

  const openRegWin =()=>{
    setRegWin(true)
  }
  const closeRegWin =()=>{
    setRegWin(false)
  }

  function setToken(){
    setCookies('user_token', uuidv4())
  }
  
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  useEffect(() => {
    if(!cookies.user_token){
      setToken()
    }
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
        <div className={styles.conteiner}>
          <h1 className={styles.wellcome}>
            Вітаємо вас!
          </h1>
          <hr className={styles.hr_line}/>
          <h3>
            Смачного!
          </h3>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.mainText}>
          Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
          </p>
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
        <div className={styles.conteiner}>
          <h1 className={styles.wellcome}>
            Вітаємо вас!
          </h1>
          <hr className={styles.hr_line}/>
          <h3 className={styles.underWellcome}>
            Смачного!
          </h3>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.mainText}>
          Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
          </p>
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
        <div className={styles.conteiner}>
          <h1 className={styles.wellcome}>
            Вітаємо вас!
          </h1>
          <hr className={styles.hr_line}/>
          <h3 className={styles.underWellcome}>
            Смачного!
          </h3>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.mainText}>
          Ласкаво просимо до «СhatteRidée», унікального французького ресторану, де кулінарна елегантність поєднується з теплою атмосферою. Наше різноманітне меню, приготоване зі свіжих високоякісних продуктів, пропонує вишукані страви, які задовольнять найвибагливіші смаки. Приходьте та насолодіться незабутніми гастрономічними враженнями у комфортній та вишуканій обстановці.
          </p>
        </div>
      </main>
    );
  }
  
}
