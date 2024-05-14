import React, { useState, useEffect } from 'react';
import styles from './pages.module.scss';
import { Post } from '../models/board';
import BoardList from '../components/BoardList/BoardList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await Promise.resolve([
        {
          id: 1,
          title: '글 제목 1',
          content: '내용 1',
          createdAt: '2022-01-01',
          author: '작성자 1',
          profilePic: './images/test.jpg',
          likes: 0,
          views: 0,
          comments: [],
        },
      ]);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleWriteButtonClick = () => {
    if (isLoggedIn) {
      navigate('/community/write');
    } else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {};

  return (
    <div className={styles.pageContainer}>
      <div className="fadeIn">
        <h1>커뮤니티</h1>
        <div className={styles.headerWithButton}>
          <div className={styles.filterSearchContainer}>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="latest">최신순</option>
              <option value="likes">추천순</option>
              <option value="views">조회순</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="검색어를 입력하세요"
            />
            <button onClick={handleSearchSubmit}>검색</button>
          </div>
          <button
            onClick={handleWriteButtonClick}
            className={styles.writeButton}
          >
            글쓰기
          </button>
        </div>
        <BoardList posts={posts} basePath="community" />
      </div>
    </div>
  );
};

export default CommunityPage;
