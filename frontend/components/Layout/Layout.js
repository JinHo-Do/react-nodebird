import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Menu, Input, Row, Col, Card, Avatar } from 'antd';

const dummy = {
  nickname: 'jino',
  Post: [],
  Followings: [],
  Followers: [],
};

const Layout = ({ children }) => {
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>

      <Row>
        <Col xs={24} md={6}>
          <Card
            actions={[
              <div key="twit">
                내글
                <br />
                {dummy.Post.length}
              </div>,
              <div key="follwing">
                팔로윙
                <br />
                {dummy.Followings.length}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {dummy.Followers.length}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
              title={dummy.nickname}
            />
          </Card>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6} />
      </Row>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
