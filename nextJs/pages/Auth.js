import { useState } from 'react';
import styles from '../styles/auth.module.css';

export default function Auth() {

  const url = 'http://localhost:8000'

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await fetch('http://localhost:8000/userLogin', {
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>СhatteRidée</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <h1>Авторизація</h1>

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
  );
}
