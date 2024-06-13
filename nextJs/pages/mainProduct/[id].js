"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/mainProduct.module.css'; 
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

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
  const [cookies, setCookies] = useCookies(['user_token', 'api_key']);

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
    const apiKey = cookies.api_key;
    const userToken = cookies.user_token;

    fetch(`${url}/addToBasket/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'user_token': userToken
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

  return (
    <>
      <header className={styles.header}>
        <h1>СhatteRidée</h1>
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
};

export default MainProduct;
