import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ModalLayer = ({ children, onClick }) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);
	// const onCloseLayer = () => {};
	const modalComponent = createPortal(
		<Modal>
			<Overlay onClick={onClick} />
			<ChildrenWrap>
				{children}
				<CloseButton type="button" onClick={onClick}>
					<FontAwesomeIcon icon={faTimesCircle} />
				</CloseButton>
			</ChildrenWrap>
		</Modal>,
		document.getElementById('modal_root'),
	);
	if (isBrowser) {
		return modalComponent;
	}
	return null;
};

export default ModalLayer;

const Modal = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0px;
	left: 0px;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 101;
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.25);
`;

const ChildrenWrap = styled.div`
	position: relative;
	z-index: 102;
	width: 50%;
	height: auto;
	min-height: 100px;
	background-color: #fff;
	border-radius: 5px;
	padding: 10px;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	width: 30px;
	height: 30px;
	font-size: 1.5rem;
	color: ${({ theme }) => theme.mainColor(0.8)};
	&:hover {
		color: ${({ theme }) => theme.mainColor(1)};
	}
`;
