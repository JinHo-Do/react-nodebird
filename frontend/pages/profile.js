import { Button, List, Icon, Card } from 'antd';

import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => (
  <div>
    <NicknameEditForm />
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>팔로잉 목록</div>}
      loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
      bordered
      dataSource={['지노', '도벨로퍼', '리액트']}
      renderItem={item => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<Icon key="stop" type="stop" />]}>
            <Card.Meta description={item} />
          </Card>
        </List.Item>
      )}
    />
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>팔로워 목록</div>}
      loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
      bordered
      dataSource={['지노', '도벨로퍼', '리액트']}
      renderItem={item => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<Icon key="stop" type="stop" />]}>
            <Card.Meta description={item} />
          </Card>
        </List.Item>
      )}
    />
  </div>
);

export default Profile;
