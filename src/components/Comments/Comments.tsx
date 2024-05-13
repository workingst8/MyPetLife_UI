import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment } from "../../models/board";
import styles from "./Comments.module.scss";

interface CommentItemProps {
  comment: Comment;
  comments: Comment[];
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, comments }) => {
  const navigate = useNavigate();
  const [showChatOption, setShowChatOption] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setShowChatOption(!showChatOption);
    e.stopPropagation();
  };

  const handleChatClick = () => {
    navigate('/chat');
    setShowChatOption(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowChatOption(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.comment}>
      <div className={styles.flexbox}>
        <img
          src={comment.profilePic}
          alt="작성자 프로필"
          className={styles.profilePic}
          onClick={handleProfileClick}
        />
        <div className={styles.author}>{comment.author}</div>
        <div className={styles.createdAt}>{comment.createdAt}</div>
        {showChatOption && (
          <div className={styles.chatOptions} ref={menuRef}>
            <ul>
              <li><button onClick={handleChatClick}>채팅하기</button></li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.content}>{comment.content}</div>
      <Comments comments={comments} parentId={comment.id} />
    </div>
  );
};

interface CommentsProps {
  comments: Comment[];
  parentId?: number;
}

const Comments: React.FC<CommentsProps> = ({ comments, parentId = null }) => {
  const filteredComments = comments
    .filter((comment) => comment.parentId === parentId)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={parentId ? styles.replies : styles.commentsContainer}>
      {filteredComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} comments={comments} />
      ))}
    </div>
  );
};

export default Comments;
