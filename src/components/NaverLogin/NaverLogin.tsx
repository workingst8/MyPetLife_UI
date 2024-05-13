// import React, { useEffect } from "react";
import styles from "./NaverLogin.module.scss";
import { Link } from 'react-router-dom'; // 네이버 로그인 버튼 클릭시 바로 마이페이지 이동 위해(임시)
import { useAuth } from '../../contexts/AuthContext';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverLogin: React.FC = () => {
  const { login } = useAuth(); // 로그인 함수 가져오기
  // useEffect(() => {
  //   // 네이버 로그인 SDK 스크립트를 동적으로 로드하는 함수
  //   const loadNaverLoginSdk = () => {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
  //     script.onload = () => initNaverLogin(); // 스크립트 로드 완료 후 초기화 함수 호출
  //     document.head.appendChild(script);
  //   };

  //   // 네이버 로그인 초기화 함수
  //   const initNaverLogin = () => {
  //     if (!window.naver) return;

  //     const naverLogin = new window.naver.LoginWithNaverId({
  //       clientId: "YOUR_CLIENT_ID",
  //       callbackUrl: "YOUR_CALLBACK_URL",
  //       isPopup: false,
  //       loginButton: { color: "green", type: 3, height: 60 },
  //     });

  //     naverLogin.init();
  //   };

  //   loadNaverLoginSdk();
  // }, []);

  return (
    <div className="fadeIn">
      <div className={styles.loginContainer}>
        <Link to="/mypage" className={styles.loginButton} onClick={login}>
          <img src="./images/login/login_naver.png" alt="네이버 로그인 버튼" />
        </Link>
      </div>
    </div>
  );
};

export default NaverLogin;
