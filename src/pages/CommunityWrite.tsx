import React, { useState } from 'react';
import QuillEditor from '../components/QuillEditor/QuillEditor';
import styles from './pages.module.scss';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const CommunityWritePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const navigate = useNavigate();

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = () => {
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
        {!isReadOnly ? (
          <>
            <QuillEditor content={content} onChange={handleChange} />
            <button onClick={handleSubmit} className={styles.btn}>
              등록/수정
            </button>
          </>
        ) : (
          <>
            {/* 실제로는 작성한 글을 등록하시겠습니까? 이후에 CommunityDetail 페이지로 이동해서 보여줘야함 */}
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
