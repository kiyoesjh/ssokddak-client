import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction, signUpAction } from 'reducers/user';
import Loading from 'components/Button/Loading';

const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nickname, setNickname] = useState('');
	const [newAccount, setNewAccount] = useState(false);
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	const onChange = useCallback(({ target: { name, value } }) => {
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		} else if (name === 'nickname') {
			setNickname(value);
		}
	}, []);
	const onSubmit = async event => {
		event.preventDefault();
		try {
			if (newAccount) {
				// 계정만들기
				console.log('onsubmit!');
				dispatch(signUpAction({ email, password, nickname }));
			} else {
				// 로그인
				dispatch(loginRequestAction({ email, password }));
			}
		} catch (err) {
			setError(err.message);
		}
	};

	const toggleAccount = () => setNewAccount(prev => !prev);

	const { logInLoading, logInError, signUpLoading, signUpDone, signUpError } = useSelector(
		state => state.user,
	);

	useEffect(() => {
		if (signUpDone) {
			dispatch(loginRequestAction({ email, password }));
		}
	}, [signUpDone]);

	useEffect(() => {
		if (logInError) {
			alert(logInError);
		}
	}, [logInError]);

	useEffect(() => {
		if (signUpError) {
			alert(signUpError);
		}
	}, [signUpError]);
	return (
		<>
			<FormWrapper>
				<form onSubmit={onSubmit}>
					<InputBox
						name="email"
						type="email"
						placeholder="이메일을 입력하세요"
						required
						value={email}
						onChange={onChange}
					/>
					<InputBox
						name="password"
						type="password"
						placeholder="비밀번호를 입력하세요"
						required
						onChange={onChange}
					/>
					{newAccount && (
						<InputBox
							name="nickname"
							type="text"
							placeholder="닉네임을 입력하세요"
							required
							value={nickname}
							onChange={onChange}
						/>
					)}
					<ActiveSubmit type="submit">
						{newAccount ? (
							<>{signUpLoading ? <Loading /> : '회원가입'}</>
						) : (
							<>{logInLoading ? <Loading /> : '로그인'}</>
						)}
					</ActiveSubmit>
				</form>
				<ToggleButtonWrap>
					<ToggleText>
						{newAccount ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
					</ToggleText>
					<ToggleButton type="button" onClick={toggleAccount}>
						{newAccount ? '로그인' : '회원가입'}
					</ToggleButton>
				</ToggleButtonWrap>
			</FormWrapper>
			<p>{error}</p>
		</>
	);
};

export default AuthForm;

const FormWrapper = styled.div`
	width: 100%;
`;

const InputBox = styled.input`
	width: 100%;
	height: 40px;
	margin-bottom: 5px;
	border: 1px solid #ccc;
	color: #888;
	padding: 0 8px;
	border-radius: 3px;
`;

const ActiveSubmit = styled.button`
	width: 100%;
	height: 40px;
	background-color: #14274e;
	text-align: center;
	color: #fff;
	border-radius: 3px;
	margin-top: 15px;
	cursor: pointer;
`;

const ToggleButtonWrap = styled.div`
	margin-top: 40px;
	text-align: right;
`;

const ToggleText = styled.span`
	color: #aaa;
	margin-right: 5px;
`;

const ToggleButton = styled.button`
	color: #000;
	text-decoration: underline;
`;
