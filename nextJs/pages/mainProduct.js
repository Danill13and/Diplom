import React from 'react';
import Image from 'next/image';
import styles from '../styles/mainProduct.module.css'; 

const MainProduct = () => {
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
