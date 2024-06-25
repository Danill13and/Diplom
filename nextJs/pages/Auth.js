"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import { useCookies } from 'react-cookie'
require('dotenv').config()

export function AuthModal({ isOpen, onClose }) {
  const url = process.env.url

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [animate, setAnimate] = useState(false);
  const [cookies, setCookies] = useCookies(['apiKey'])

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const userData = {
      name: firstName,
      surName: lastName,
      password
    };

    try {
      const response = await fetch(`https://chateerideeapi.onrender.com/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const user = await response.json();
      setSuccess(`Welcome, ${user.name}!`);
      setCookies("apiKey", user.apikey)
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      {isOpen && (
        <div className={`${styles.overlay} ${animate ? styles.fadeIn : styles.fadeOut}`} onClick={closeModal}>
          <div className={`${styles.modal} ${animate ? styles.zoomIn : styles.zoomOut}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.container}>
              <h1 className ={styles.h1}>Авторизація <div className={styles.separator}></div></h1>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Ім'я"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Прізвище"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              <button type="submit" className={styles.button}>Авторизуватись</button>
              </form>
              
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
