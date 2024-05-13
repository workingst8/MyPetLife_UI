import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../../models/board';
import styles from './PostDetail.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const navigate = useNavigate();
  const [showChatOption, setShowChatOption] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(post.views);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateViews = async () => {
      try {
        const response = await axios.post(`/api/posts/${post.id}/increment-views`);
        setViews(response.data.views);
      } catch (error) {
        console.error('조회수 업데이트 중 오류 발생:', error);
      }
    };

    updateViews();
  }, [post.id]);

  const handleProfileClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowChatOption(!showChatOption);
    e.stopPropagation();
  };

  const handleChatClick = () => {
    navigate('/chat');
    setShowChatOption(false);
  };

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
        setShowChatOption(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.postDetail}>
      <h1>{post.title}</h1>
      <div className={styles.authorInfo}>
        <img 
          src={post.profilePic} 
          alt="작성자 프로필" 
          className={styles.profilePic} 
          onClick={handleProfileClick}
        />
        <span>{post.author}</span>
        {showChatOption && (
          <div className={styles.chatOptions} ref={menuRef}>
            <ul>
              <li><button onClick={handleChatClick}>채팅하기</button></li>
            </ul>
          </div>
        )}
        <button className={styles.likeButton} onClick={toggleLike}>
          {liked ? '❤️' : '♡'} {likes}
        </button>
        <span>조회 {views}</span>
        <span>작성일: {post.createdAt}</span>
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
