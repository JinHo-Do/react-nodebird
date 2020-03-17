import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';

import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      payload: tag,
    });
  }, []);

  return (
    <div>
      {mainPosts &&
        mainPosts.map(post => <PostCard key={post.createdAt} post={post} />)}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async context => {
  const { tag } = context.query;
  return { tag };
};

export default Hashtag;
