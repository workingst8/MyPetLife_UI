import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './pages.module.scss';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  nickname: string;
  profilePicture: string;
}

const MyPage: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '사용자123',
    profilePicture: 'https://via.placeholder.com/100',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  const handleEditNickname = () => {
    const newNickname = prompt('새 닉네임을 입력하세요', userProfile.nickname);
    if (newNickname && newNickname.trim() !== '') {
      setUserProfile({ ...userProfile, nickname: newNickname });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const uploadedImageUrl = e.target && e.target.result;

        if (uploadedImageUrl) {
          setUserProfile({
            ...userProfile,
            profilePicture: uploadedImageUrl.toString(),
          });
        }
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className="fadeIn">
        <h1>마이페이지</h1>
        <div className={styles.myPage}>
          <div className={styles.profileSection}>
            <img
              src={userProfile.profilePicture}
              alt="프로필 사진"
              className={styles.profilePicture}
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              //프로필 사진을 변경하시겠습니까?
              style={{ display: 'none' }}
            />
            <h3>{userProfile.nickname}</h3>
            <button onClick={handleEditNickname} className={styles.button}>
              닉네임 수정
            </button>
          </div>
          <button className={styles.button}>내가 쓴 글 보기</button>
          <button className={styles.button}>내가 쓴 댓글 보기</button>
          <Link to="/login" onClick={logout} className={styles.loginButton}>
            <button className={styles.button}>로그아웃</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
