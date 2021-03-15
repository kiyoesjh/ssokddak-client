import React from 'react';
import Ssok from 'components/Ssok/Ssok';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Header from 'components/Header';
import Container from 'components/Container';
// import HomeSkeleton from 'skeletons/HomeSkeleton';
import { useSelector } from 'react-redux';
import AppLayout from 'components/AppLayout';

const Home = () => {
	const {
		user,
		post: { ssoks },
	} = useSelector(state => state);

	return (
		<AppLayout>
			<Container>
				<Header headText="홈" />
				<ColumnWrap>
					<Wrap>
						{ssoks.map(ssok => (
							<Ssok key={ssok.id} ssokData={ssok} isOwner={ssok.creatorId === user.uid} />
						))}
					</Wrap>
				</ColumnWrap>
			</Container>
		</AppLayout>
	);
};

export default React.memo(Home);

const ColumnWrap = styled.div`
	width: 100%;
`;

const Wrap = styled.div`
	max-width: 1000px;
	margin: 0 auto 50px;
	padding: 15px 10px;
	${device.mobile} {
		width: 80%;
	}
	${device.tablet} {
		columns: unset;
		padding: 50px 10px;
		margin: 0 auto;
	}
	${device.laptop} {
		width: 100%;
		column-count: 3;
		column-gap: 15px;
	}
`;