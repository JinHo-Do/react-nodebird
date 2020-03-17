import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { logoutRequest } from '../../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);
  const { me } = useSelector(state => state.user);
  const { nickname, Posts, Followers, Followings } = me;

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {Array.isArray(Posts) && Posts.length}
        </div>,
        <div key="twit">
          팔로잉
          <br />
          {Array.isArray(Followings) && Followings.length}
        </div>,
        <div key="twit">
          팔로워
          <br />
          {Array.isArray(Followers) && Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{nickname[0]}</Avatar>} title={nickname} />
      {me && <Button onClick={onLogout}>로그아웃</Button>}
    </Card>
  );
};

export default UserProfile;
