import React, { useState } from 'react';
import QuillEditor from '../components/QuillEditor/QuillEditor';
import styles from './pages.module.scss';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const CommunityWritePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = () => {

    if (!title || !content) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }

    setIsReadOnly(true);
  };

  const createMarkup = (htmlContent: string) => {
    return {
      __html: DOMPurify.sanitize(htmlContent),
    };
  };

  return (
    <div className={styles.pageContainer}>
      <div className="fadeIn">
        <h1>글쓰기</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.title}>
          {!isReadOnly ? (
            <>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          </>):(
            <div style={{color:'#ccc', fontSize:'13px'}}>*실제 서버와 연결된 환경에서는 CommunityDetail 페이지에서 형식에 맞게 출력됩니다.</div>
          )

        }
        </div>
        {!isReadOnly ? (
          <>
            <QuillEditor content={content} onChange={handleChange} />
            <button onClick={handleSubmit} className={styles.btn}>
              등록/수정
            </button>
          </>
        ) : (
          <>
            <div
              className={styles.readOnlyContent}
              dangerouslySetInnerHTML={createMarkup(content)}
            ></div>
            <button
              onClick={() => navigate('/community')}
              className={styles.btn}
            >
              목록으로
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityWritePage;
