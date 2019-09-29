import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { ADD_POST_REQUEST } from '../../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.post,
  );
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
  }, [postAdded === true]);

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    dispatch({
      type: ADD_POST_REQUEST,
      payload: { text },
    });
  }, []);
  return (
    <Form
      encType="multipart/form-data"
      style={{ margin: '10px 0 20px' }}
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        maxLength={140}
        placeholder="아무말 대잔치?"
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input type="file" hidden />
        <Button>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={isAddingPost}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(imagePath => (
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
  );
};

export default PostForm;
