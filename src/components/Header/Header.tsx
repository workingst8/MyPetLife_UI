import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/home">
          <img src="./images/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to="/community">커뮤니티</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/mypage" className={styles.loginButton}>
                마이페이지
              </Link>
            ) : (
              <Link to="/login" className={styles.loginButton}>
                로그인
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
