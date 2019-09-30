import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';

import { useInput } from '../utils';
import { signUpRequest } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { isSignningUp, me } = useSelector(state => state.user);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (me) {
      Router.push('/');
    }
  }, [me && me.id]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      if (!term) {
        return setTermError(true);
      }

      dispatch(
        signUpRequest({
          id,
          password,
          nickname,
        }),
      );

      return null;
    },
    [password, passwordCheck, term],
  );

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(password !== e.target.value);
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
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
        <Button type="primary" htmlType="submit" loading={isSignningUp}>
          가입하기
        </Button>
      </div>
    </Form>
  );
};

export default Signup;
