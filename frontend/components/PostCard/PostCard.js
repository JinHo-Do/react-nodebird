/* eslint-disable react/jsx-wrap-multilines */
import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Icon, Avatar, Button, List, Comment, Input } from 'antd';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);

  const [isCommentFormOpen, setCommentFormOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setCommentText('');
  }, [!!commentAdded]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpen(prevState => !prevState);
  }, []);

  const onSubmitComment = useCallback(
    (e, postId) => {
      e.preventDefault();

      if (!me) {
        return alert('로그인 한 유저만 댓글을 작성할 수 있습니다.');
      }

      return dispatch({
        type: ADD_COMMENT_REQUEST,
        payload: {
          postId,
        },
      });
    },
    [me && me.id],
  );

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
          avatar={<Avatar>{post.User && post.User.nickname[0]}</Avatar>}
          title={post.User && post.User.nickname}
          description={
            <div>
              {post.content.split(/(#[^\s]+)/g).map(tag => {
                if (tag.match(/#[^\s]+/)) {
                  return (
                    <Link href={`/hashtag/${tag.slice(1)}`} key={tag}>
                      <a>{tag}</a>
                    </Link>
                  );
                }

                return tag;
              })}
            </div>
          }
        />
      </Card>

      {isCommentFormOpen && (
        <>
          <Form onSubmit={e => onSubmitComment(e, post.id)}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              삐약
            </Button>
          </Form>
          <List
            header={`${post.comments ? post.comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
