import { Form, Input, Button } from 'antd';

const NicknameEditForm = () => (
  <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }}>
    <Input addonBefore="닉네임" />
    <Button type="primary">수정</Button>
  </Form>
);

export default NicknameEditForm;
