import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';

import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';

import PostCard from '../components/PostCard';

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      payload: id,
    });

    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      payload: id,
    });
  }, []);

  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Post}
            </div>,
            <div key="twit">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="twit">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts &&
        mainPosts.map(post => <PostCard key={post.createdAt} post={post} />)}
    </div>
  );
};

User.getInitialProps = async context => {
  const { id } = context.query;

  return { id: parseInt(id, 10) };
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

export default User;
