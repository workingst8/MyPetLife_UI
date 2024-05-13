import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from "../models/board";
import PostDetail from "../components/PostDetail/PostDetail";
import Comments from "../components/Comments/Comments";
import styles from "./pages.module.scss";

const CommunityDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const availablePosts = [
        {
          id: 1,
          title: "글 제목 1",
          content: "내용 1",
          createdAt: "2022-01-01",
          author: "작성자 1",
          profilePic: "./images/test.jpg",
          likes:0,
          views:0,
          comments: [
            {
              id: 1,
              userId: 101,
              boardId: 1,
              parentId: null, // 최상위 댓글
              content: "댓글 내용 1",
              createdAt: "2022-01-03",
              classNum: 1,
              groupNum: 1,
              order: 1,
              author: "댓글 작성자 1",
              profilePic: "./images/test.jpg",
            },
            {
              id: 2,
              userId: 102,
              boardId: 1,
              parentId: 1,
              content: "대댓글 내용 1",
              createdAt: "2022-01-04",
              classNum: 1,
              groupNum: 1,
              order: 2,
              author: "대댓글 작성자 1",
              profilePic: "./images/test.jpg",
            },
            {
              id: 3,
              userId: 103,
              boardId: 1,
              parentId: null, // 최상위 댓글
              content: "댓글 내용 1",
              createdAt: "2022-01-03",
              classNum: 1,
              groupNum: 1,
              order: 1,
              author: "댓글 작성자 1",
              profilePic: "./images/test.jpg",
            },
          ],
        },
      ];

      const data = availablePosts.find(
        (post) => post.id === parseInt(postId ?? "0")
      );
      if (!data) {
        navigate("/community");
        return;
      }
      setPost(data);
    };

    if (postId) fetchPost();
  }, [postId, navigate]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className="fadeIn">
        <PostDetail post={post} />
        {post?.comments && <Comments comments={post.comments} />}
        <button onClick={() => navigate("/community")} className={styles.btn}>
          목록으로
        </button>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
