import React, { useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

import Layout from '../components/Layout';

const Signup = () => {
  // custom input hook
  const useInput = (initialValie = null) => {
    const [value, setter] = useState(initialValie);
    const handler = e => {
      setter(e.target.value);
    };

    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  // hooks
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log({
      id,
      nickname,
      password,
      passwordCheck,
      term,
    });
  };

  const onChangePasswordCheck = e => {
    setPasswordError(password !== e.target.value);
    setPasswordCheck(e.target.value);
  };

  const onChangeTerm = e => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.css"
        />
      </Head>

      <Layout>
        <Form onSubmit={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <Input name="user-id" value={id} onChange={onChangeId} required />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <Input
              name="user-nickname"
              value={nickname}
              onChange={onChangeNickname}
              required
            />
          </div>
          <div>
            <label htmlFor="user-password" type="password">
              비밀번호
            </label>
            <Input
              name="user-password"
              value={password}
              type="password"
              onChange={onChangePassword}
              required
            />
          </div>
          <div>
            <label htmlFor="user-password-check" type="password">
              비밀번호체크
            </label>
            <Input
              name="user-password-check"
              value={passwordCheck}
              type="password"
              onChange={onChangePasswordCheck}
              required
            />
            {passwordError && (
              <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
              약관에 동의합니다.
            </Checkbox>
            {termError && (
              <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default Signup;
