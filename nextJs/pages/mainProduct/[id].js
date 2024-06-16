"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/mainProduct.module.css'; 
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import {AuthModal} from "../../pages/Auth"
import {Register} from "../../pages/Reg"

const MainProduct = () => {
  const url = 'http://localhost:8000';
  const [product, setProduct] = useState();
  const [image, setImage] = useState(' ');
  const [name, setName] = useState(' ');
  const [price, setPrice] = useState(' ');
  const [ingredients, setIngredients] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [showAlert, setShowAlert] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [cookies, setCookies] = useCookies(['user_token']);

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

  const handleGet = () => {
    console.log(id);
    fetch(`${url}/mainProduct/${id}`, {
      method: "GET",
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setImage(data.image);
      setName(data.name);
      setPrice(data.price);
      setIngredients(data.ingredients);
      setDescription(data.description);
      setProduct(data);
    });
  };

  const handleAddToBasket = () => {

    fetch(`${url}/addToBasket/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': cookies.apiKey,
        'user_token': cookies.user_token
      }
    })
    .then(response => response.json())
    .then(data => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (!product) {
        handleGet();
      }
    }
  }, [router]);

  const truncateText = (text, limit, showMoreHandler) => {
    if (text.length > limit) {
      return (
        <>
          {text.substring(0, limit)}...
          <br />
          <button className={styles.showMoreButton} onClick={showMoreHandler}>↓ Детальніше ↓</button>
        </>
      );
    }
    return text;
  };
  if(!cookies.apiKey){
    return (
      <>
        <header className={styles.header}>
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
        <a onClick={openRegWin} className={styles.clickable}>Зареєструватись</a>
        <Register isOpen={regWin} onClose={closeRegWin} />
        <a onClick={openAuthModal} className={styles.clickable}>Авторизуватись</a>
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </div>
      </div>
        </header>
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <h2 className={styles.h2}>{name}</h2>
            <Image className={styles.image} src={`../../${image}`} loader={() => `../../${image}`} alt="Фото круасану" width={354} height={256} />
            <p className={styles.price}>{price} грн.</p>
            <div className={styles.separator}></div>
            <p className={styles.ingredients}>{truncateText(ingredients, 50, () => setShowIngredients(true))}</p>
            <div className={styles.separator}></div> 
            <p className={styles.description}>{truncateText(description, 60, () => setShowDescription(true))}</p>
            <button className={styles.button} onClick={handleAddToBasket}>Додати до Кошику</button>
          </div>
        </div>

        <div className={`${styles.overlay} ${showAlert ? styles.show : ''}`} onClick={() => setShowAlert(false)}>
          <div className={`${styles.popup} ${showAlert ? styles.show : ''}`}>
            Товар додано до кошику
          </div>
        </div>

        <div className={`${styles.overlay} ${showIngredients ? styles.show : ''}`} onClick={() => setShowIngredients(false)}>
          <div className={`${styles.popup} ${showIngredients ? styles.show : ''}`}>
            <h3>Інгредієнти</h3>
            <p>{ingredients}</p>
          </div>
        </div>

        <div className={`${styles.overlay} ${showDescription ? styles.show : ''}`} onClick={() => setShowDescription(false)}>
          <div className={`${styles.popup} ${showDescription ? styles.show : ''}`}>
            <h3>Опис</h3>
            <p>{description}</p>
          </div>
        </div>
      </>
    );
  }
  else if (cookies.apiKey == "c478890e-15c7-41c2-a821-c2c65210e96e"){
    return (
      <>
        <header className={styles.header}>
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
        <a className={styles.a} href="/Create_category">
            <p>
              Админ
            </p>
          </a>
        </div>
      </div>
        </header>
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <h2 className={styles.h2}>{name}</h2>
            <Image className={styles.image} src={`../../${image}`} loader={() => `../../${image}`} alt="Фото круасану" width={354} height={256} />
            <p className={styles.price}>{price} грн.</p>
            <div className={styles.separator}></div>
            <p className={styles.ingredients}>{truncateText(ingredients, 50, () => setShowIngredients(true))}</p>
            <div className={styles.separator}></div> 
            <p className={styles.description}>{truncateText(description, 60, () => setShowDescription(true))}</p>
            <button className={styles.button} onClick={handleAddToBasket}>Додати до Кошику</button>
          </div>
        </div>

        <div className={`${styles.overlay} ${showAlert ? styles.show : ''}`} onClick={() => setShowAlert(false)}>
          <div className={`${styles.popup} ${showAlert ? styles.show : ''}`}>
            Товар додано до кошику
          </div>
        </div>

        <div className={`${styles.overlay} ${showIngredients ? styles.show : ''}`} onClick={() => setShowIngredients(false)}>
          <div className={`${styles.popup} ${showIngredients ? styles.show : ''}`}>
            <h3>Інгредієнти</h3>
            <p>{ingredients}</p>
          </div>
        </div>

        <div className={`${styles.overlay} ${showDescription ? styles.show : ''}`} onClick={() => setShowDescription(false)}>
          <div className={`${styles.popup} ${showDescription ? styles.show : ''}`}>
            <h3>Опис</h3>
            <p>{description}</p>
          </div>
        </div>
      </>
    );
  }
  else if(cookies.apiKey){
    return (
      <>
        <header className={styles.header}>
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
        </header>
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <h2 className={styles.h2}>{name}</h2>
            <Image className={styles.image} src={`../../${image}`} loader={() => `../../${image}`} alt="Фото круасану" width={354} height={256} />
            <p className={styles.price}>{price} грн.</p>
            <div className={styles.separator}></div>
            <p className={styles.ingredients}>{truncateText(ingredients, 50, () => setShowIngredients(true))}</p>
            <div className={styles.separator}></div> 
            <p className={styles.description}>{truncateText(description, 60, () => setShowDescription(true))}</p>
            <button className={styles.button} onClick={handleAddToBasket}>Додати до Кошику</button>
          </div>
        </div>

        <div className={`${styles.overlay} ${showAlert ? styles.show : ''}`} onClick={() => setShowAlert(false)}>
          <div className={`${styles.popup} ${showAlert ? styles.show : ''}`}>
            Товар додано до кошику
          </div>
        </div>

        <div className={`${styles.overlay} ${showIngredients ? styles.show : ''}`} onClick={() => setShowIngredients(false)}>
          <div className={`${styles.popup} ${showIngredients ? styles.show : ''}`}>
            <h3>Інгредієнти</h3>
            <p>{ingredients}</p>
          </div>
        </div>

        <div className={`${styles.overlay} ${showDescription ? styles.show : ''}`} onClick={() => setShowDescription(false)}>
          <div className={`${styles.popup} ${showDescription ? styles.show : ''}`}>
            <h3>Опис</h3>
            <p>{description}</p>
          </div>
        </div>
      </>
    );
  }
};

export default MainProduct;
