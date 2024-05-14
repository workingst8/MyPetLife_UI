import React, { useState, useEffect } from 'react';
import styles from './pages.module.scss';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import BoardList from '../components/BoardList/BoardList';
import { Post } from '../models/board';

const HomePage: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchLatestPosts().then((posts) => {
      setLatestPosts(posts);
    });
  }, []);

  const fetchLatestPosts = async () => {
    return Promise.resolve([
      {
        id: 1,
        title: '글 제목 1',
        content: '내용 1',
        createdAt: '2022-01-01',
        author: '작성자 1',
        profilePic: '작성자1의프로필사진URL',
        likes: 0,
        views: 0,
      },
      {
        id: 2,
        title: '글 제목 2',
        content: '내용 2',
        createdAt: '2022-01-02',
        author: '작성자 2',
        profilePic: '작성자2의프로필사진URL',
        likes: 0,
        views: 0,
      },
    ]);
  };

  return (
    <div className={styles.pageContainer}>
      <div className="fadeIn">
        <ImageSlider />
        <BoardList posts={latestPosts} basePath="community" />
      </div>
    </div>
  );
};

export default HomePage;
