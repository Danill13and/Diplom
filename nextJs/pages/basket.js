import React, { useState } from 'react';
import styles from '../styles/basket.module.css';
import Image from 'next/image';
import {Order} from "./Order"

const Basket = () => {
  const [orderWin, setOrderWin] = useState(false)

  const openOrder = ()=>{
    setOrderWin(true)
  }
  const closeOrder = ()=>{
    setOrderWin(false)
  }

  const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    return (
      <div className={styles.cartItem}>
        <img src={item.image} alt={item.name} className={styles.image} />
        <div className={styles.details}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.price}>{item.price}$</span>
        </div>
        <div className={styles.quantity}>
          <button onClick={handleDecrement} className={styles.button}>-</button>
          <input type="text" value={quantity} readOnly className={styles.input} />
          <button onClick={handleIncrement} className={styles.button}>+</button>
        </div>
      </div>
    );
  };

  return (
    <>
    <Order isOpen={orderWin} onClose={closeOrder}/>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
          <span className={styles.logoText}>Chatte Ridée</span>
        </div>
        <input type="text" placeholder="Пошук" className={styles.search} />
        <nav className={styles.nav}>
          <a href="#">Кошик</a>
          <a href="#">Меню</a>
          <a href="#">Про нас</a>
          <a href="#">Зареєструватись</a>
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Ваш кошик</h1>
            <div className={styles.cart}>
            </div>
            <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
          </main>
        </div>
      </div>
    </>
  );
};

export default Basket;
