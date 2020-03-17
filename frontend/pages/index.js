import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
  }, []);

  return (
    <div>
      {me ? (
        <div>{me.nickname}님, 안녕하세요.</div>
      ) : (
        <div>로그아웃 했습니다.</div>
      )}
      {me && <PostForm />}
      {Array.isArray(mainPosts) &&
        mainPosts.map(post => <PostCard key={post.createdAt} post={post} />)}
    </div>
  );
};

export default Home;
