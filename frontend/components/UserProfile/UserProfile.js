import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { logoutRequest } from '../../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);
  const {
    isLoggedIn,
    me: { nickname, posts, followers, followings },
  } = useSelector(state => state.user);

  return (
    <Card
      actions={[
        <div key="twit">
          내글
          {/* <br />
          {posts.length && posts.length}
        </div>,
        <div key="follwing">
          팔로윙
          <br />
          {followings.length && followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {followers.length && followers.length} */}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{nickname[0]}</Avatar>} title={nickname} />
      {isLoggedIn && <Button onClick={onLogout}>로그아웃</Button>}
    </Card>
  );
};

export default UserProfile;
