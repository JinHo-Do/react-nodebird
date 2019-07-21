import { Form, Input, Button, Card, Icon, Avatar } from 'antd';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: 'jino',
      },
      content: 'first post',
    },
  ],
};

const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && (
        <Form encType="multipart/form-data" style={{ marginBottom: 20 }}>
          <Input.TextArea maxLength={140} placeholder="아무말 대잔치?" />
          <div>
            <input type="file" hidden />
            <Button>이미지 업로드</Button>
            <Button type="primary" style={{ float: 'right' }} htmlType="submit">
              짹짹
            </Button>
          </div>
          <div>
            {dummy.imagePaths.map((imagePath, index) => (
              <div key={imagePath} style={{ display: 'inline-block' }}>
                <img
                  src={`http://localhost:3000/${imagePath}`}
                  style={{ width: 200 }}
                  alt={imagePath}
                />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            ))}
          </div>
        </Form>
      )}

      {dummy.mainPosts.map(post => (
        <Card
          key={post.creatAt}
          cover={post.img && <img src={post.img} alt="cover" />}
          actions={[
            <Icon type="retweet" key="retweet" />,
            <Icon type="heart" key="heart" />,
            <Icon type="message" key="message" />,
            <Icon type="ellipsis" key="ellipsis" />,
          ]}
          extra={<Button>팔로우</Button>}
        >
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={post.content}
          />
        </Card>
      ))}
    </div>
  );
};

export default Home;
