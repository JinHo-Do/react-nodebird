import { useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

const PostForm = () => {
  const { imagePaths } = useSelector(state => state.post);

  return (
    <Form encType="multipart/form-data" style={{ margin: '10px 0 20px' }}>
      <Input.TextArea maxLength={140} placeholder="아무말 대잔치?" />
      <div>
        <input type="file" hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
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
