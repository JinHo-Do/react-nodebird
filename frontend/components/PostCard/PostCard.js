import PropTypes from 'prop-types';
import { Card, Icon, Avatar, Button } from 'antd';

const PostCard = ({ post }) => {
  return (
    <Card
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
        avatar={<Avatar>{post.user.nickname[0]}</Avatar>}
        title={post.user.nickname}
        description={post.content}
      />
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    content: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
