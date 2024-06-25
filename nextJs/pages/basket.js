import React, { useState, useEffect } from 'react';
import styles from '../styles/basket.module.css';
import Image from 'next/image';
import { Order } from "./Order";
import { useCookies } from 'react-cookie';
import { AuthModal } from "../pages/Auth";
import { Register } from "../pages/Reg";
require('dotenv').config()

const Basket = () => {
  const [orderWin, setOrderWin] = useState(false);
  const [products, setProducts] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [cookies, setCookies] = useCookies(['user_token']);
  const apiKey = cookies.apiKey;
  const userToken = cookies.user_token;
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [regWin, setRegWin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const url = process.env.url

  const openOrder = () => {
    setOrderWin(true);
  };
  const closeOrder = () => {
    setOrderWin(false);
  };

  const openRegWin = () => {
    setRegWin(true);
  };
  const closeRegWin = () => {
    setRegWin(false);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleGet = () => {
    fetch(`https://chateerideeapi.onrender.com/getProductFromBasket`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      }
    }).then(Response => {
      return Response.json()
    }).then(data => {
      setProducts(data.prod);
      setBaskets(data.basket);
      calculateTotalPrice(data.prod, data.basket);
    })
  };

  const handlePlus = (id) => {
    fetch(`https://chateerideeapi.onrender.com/productPlus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      },
      body: JSON.stringify({ id: id })
    }).then(Response => {
      return Response.json()
    }).then(data => {
      location.reload();
    })
  };

  const handleMinus = (id) => {
    fetch(`https://chateerideeapi.onrender.com/productMinus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'api-key': apiKey,
        'user_token': userToken
      },
      body: JSON.stringify({ id: id })
    }).then(Response => {
      return Response.json()
    }).then(data => {
      location.reload();
    })
  };

  const calculateTotalPrice = (products, baskets) => {
    let total = 0;
    products.forEach((product, index) => {
      const basket = baskets[index];
      total += product.price * basket.count;
    });
    setTotalPrice(total);
  };

  const checkOrders = () => {
    fetch(`https://chateerideeapi.onrender.com/checkOrder`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'user_token': userToken
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.error("Error while checking orders:", error);
    });
  };

  useEffect(() => {
    handleGet();
    checkOrders();
  }, []);

  if (!cookies.apiKey) {
    return (
      <>
        <Order isOpen={orderWin} onClose={closeOrder} />
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
            <span className={styles.logoText}>Chatte Ridée</span>
          </div>
          <input type="text" placeholder="Пошук" className={styles.search} />
          <nav className={styles.nav}>
            <a href="/basket">Кошик</a>
            <a href="/Category">Меню</a>
            <a onClick={openRegWin} className={styles.clickable}>Зареєструватись</a>
            <Register isOpen={regWin} onClose={closeRegWin} />
            <a onClick={openAuthModal} className={styles.clickable}>Авторизуватись</a>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
          </nav>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>Ваш кошик</h1>
              <div className={styles.cart}>
                <div>
                  {products && products.map((product, index) => {
                    const basket = baskets[index];
                    return (
                      <div key={product.id}>
                        <div>
                          <a>
                            <h1>{product.name}</h1>
                            <h2>{product.price} UAH</h2>
                          </a>
                        </div>
                        <button onClick={() => handlePlus(basket.id)}>+</button>
                        {basket && (
                          <div>
                            <a>
                              <h1>{basket.count}</h1>
                            </a>
                          </div>
                        )}
                        <button onClick={() => handleMinus(basket.id)}>-</button>
                      </div>
                    );
                  })}
                </div>
                <h2>Загальна вартість: {totalPrice} UAH</h2>
              </div>
              <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
            </main>
          </div>
        </div>
      </>
    );
  } else if (cookies.apiKey === "071864cc-2d85-43f3-883c-55a05e36b820") {
    return (
      <>
        <Order isOpen={orderWin} onClose={closeOrder} />
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
            <span className={styles.logoText}>Chatte Ridée</span>
          </div>
          <input type="text" placeholder="Пошук" className={styles.search} />
          <nav className={styles.nav}>
            <a href="/basket">Кошик</a>
            <a href="/Category">Меню</a>
            <a className={styles.a} href="/Create_category">Админ</a>
          </nav>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>Ваш кошик</h1>
              <div className={styles.cart}>
                <div>
                  {products && products.map((product, index) => {
                    const basket = baskets[index];
                    return (
                      <div key={product.id}>
                        <div>
                          <a>
                            <h1>{product.name}</h1>
                            <h2>{product.price} UAH</h2>
                          </a>
                        </div>
                        <button onClick={() => handlePlus(basket.id)}>+</button>
                        {basket && (
                          <div>
                            <a>
                              <h1>{basket.count}</h1>
                            </a>
                          </div>
                        )}
                        <button onClick={() => handleMinus(basket.id)}>-</button>
                      </div>
                    );
                  })}
                </div>
                <h2>Загальна вартість: {totalPrice} UAH</h2>
              </div>
              <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
            </main>
          </div>
        </div>
      </>
    );
  } else if (cookies.apiKey) {
    return (
      <>
        <Order isOpen={orderWin} onClose={closeOrder} />
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/icons8-croissant-96 1.png" alt="Chatte Ridée" width={50} height={50} />
            <span className={styles.logoText}>Chatte Ridée</span>
          </div>
          <input type="text" placeholder="Пошук" className={styles.search} />
          <nav className={styles.nav}>
            <a href="/basket">Кошик</a>
            <a href="/Category">Меню</a>
            <a className={styles.a}>Профіль</a>
          </nav>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <main className={styles.main}>
              <h1 className={styles.title}>Ваш кошик</h1>
              <div className={styles.cart}>
                <div>
                  {products && products.map((product, index) => {
                    const basket = baskets[index];
                    return (
                      <div key={product.id}>
                        <div>
                          <a>
                            <h1>{product.name}</h1>
                            <h2>{product.price} UAH</h2>
                          </a>
                        </div>
                        <button onClick={() => handlePlus(basket.id)}>+</button>
                        {basket && (
                          <div>
                            <a>
                              <h1>{basket.count}</h1>
                            </a>
                          </div>
                        )}
                        <button onClick={() => handleMinus(basket.id)}>-</button>
                      </div>
                    );
                  })}
                </div>
                <h2>Загальна вартість: {totalPrice} UAH</h2>
              </div>
              <button onClick={openOrder} className={styles.checkoutButton}>Замовити та сплатити</button>
            </main>
          </div>
        </div>
      </>
    );
  }
};

export default Basket;
