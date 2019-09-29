import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';

import { useInput } from '../../utils';
import { loginRequest } from '../../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector(state => state.user);

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginRequest({ id, password }));
    },
    [id, password],
  );

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: 10 }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
