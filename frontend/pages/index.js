import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../reducers/user';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn, user } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(logIn('jino'));
  // }, []);

  return (
    <div>
      {user ? (
        <div>{user.nickname}님, 안녕하세요.</div>
      ) : (
        <div>로그아웃 했습니다.</div>
      )}
      {isLoggedIn && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.createdAt} post={post} />
      ))}
    </div>
  );
};

export default Home;
