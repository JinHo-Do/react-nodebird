import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Icon, Avatar, Button, List, Comment, Input } from 'antd';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  const [isCommentFormOpen, setCommentFormOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const onToggleComment = useCallback(() => {
    setCommentFormOpen(prevState => !prevState);
  }, []);

  const onSubmitComment = useCallback(e => {
    e.preventDefault();

    if (!me) {
      return alert('로그인 한 유저만 댓글을 작성할 수 있습니다.');
    }

    return dispatch({
      type: ADD_COMMENT_REQUEST,
    });
  }, []);

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);

  return (
    <>
      <Card
        cover={post.img && <img src={post.img} alt="cover" />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
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

      {isCommentFormOpen && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              삐약
            </Button>
          </Form>
          <List
            header={`${post.comment ? post.comment.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.comment || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.user.nickname}
                  avatar={<Avatar>{item.user.nickname[0]}</Avatar>}
                  content={item.content}
                  dateTime={item.createdAt}
                />
              </li>
            )}
          />
        </>
      )}
    </>
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
