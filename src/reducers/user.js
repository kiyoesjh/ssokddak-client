import produce from 'utils/produce';

export const initialState = {
	loadMyInfoLoading: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,
	loadUserInfoLoading: false,
	loadUserInfoDone: false,
	loadUserInfoError: null,
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: false,
	signUpLoading: false,
	signUpDone: false,
	signUpError: false,
	followLoading: false,
	followDone: false,
	followError: false,
	unfollowLoading: false,
	unfollowDone: false,
	unfollowError: false,
	loadFollowingsLoading: false,
	loadFollowingsDone: false,
	loadFollowingsError: false,
	loadFollowersLoading: false,
	loadFollowersDone: false,
	loadFollowersError: false,
	changeNicknameLoading: false,
	changeNicknameDone: false,
	changeNicknameError: false,
	uploadProfileImageLoading: false,
	uploadProfileImageDone: false,
	uploadProfileImageError: false,
	userInfo: null,
	me: null,
	previewProfilePath: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const UPLOAD_PROFILE_IMAGE_REQUEST = 'UPLOAD_PROFILE_IMAGE_REQUEST';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_FAILURE = 'UPLOAD_PROFILE_IMAGE_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = data => {
	return {
		type: LOG_IN_REQUEST,
		data,
	};
};

export const logoutRequestAction = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};

export const signUpAction = data => {
	return {
		type: SIGN_UP_REQUEST,
		data,
	};
};

const reducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case LOAD_MY_INFO_REQUEST:
				draft.loadMyInfoLoading = true;
				draft.loadMyInfoDone = false;
				draft.loadMyInfoError = null;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draft.loadMyInfoLoading = false;
				draft.me = action.data;
				draft.loadMyInfoDone = true;
				break;
			case LOAD_MY_INFO_FAILURE:
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoError = action.error;
				break;
			case LOAD_USER_REQUEST:
				draft.loadUserLoading = true;
				draft.loadUserDone = false;
				draft.loadUserError = null;
				break;
			case LOAD_USER_SUCCESS:
				draft.loadUserLoading = false;
				draft.userInfo = action.data;
				draft.loadUserDone = true;
				break;
			case LOAD_USER_FAILURE:
				draft.loadUserLoading = false;
				draft.loadUserError = action.error;
				break;
			case LOG_IN_REQUEST:
				draft.logInLoading = true;
				draft.logInDone = false;
				draft.logInError = null;
				break;
			case LOG_IN_SUCCESS:
				draft.logInLoading = false;
				draft.me = action.data;
				draft.logInDone = true;
				break;
			case LOG_IN_FAILURE:
				draft.logInLoading = false;
				draft.logInError = action.error;
				break;
			case LOG_OUT_REQUEST:
				draft.logOutLoading = true;
				draft.logOutError = null;
				draft.logOutDone = false;
				break;
			case LOG_OUT_SUCCESS:
				draft.logOutLoading = false;
				draft.logOutDone = true;
				draft.signUpDone = false;
				draft.me = null;
				break;
			case LOG_OUT_FAILURE:
				draft.logOutLoading = false;
				draft.logOutError = action.error;
				break;
			case FOLLOW_REQUEST:
				draft.followLoading = true;
				draft.followError = null;
				draft.followDone = false;
				break;
			case FOLLOW_SUCCESS:
				draft.followLoading = false;
				draft.me.Followings.push({ id: action.data.UserId });
				draft.followDone = true;
				break;
			case FOLLOW_FAILURE:
				draft.followLoading = false;
				draft.followError = action.error;
				break;
			case UNFOLLOW_REQUEST:
				draft.unfollowLoading = true;
				draft.unfollowError = null;
				draft.unfollowDone = false;
				break;
			case UNFOLLOW_SUCCESS:
				draft.unfollowLoading = false;
				draft.me.Followings = draft.me.Followings.filter(({ id }) => id !== action.data.UserId);
				draft.unfollowDone = true;
				break;
			case UNFOLLOW_FAILURE:
				draft.unfollowLoading = false;
				draft.unfollowError = action.error;
				break;
			case LOAD_FOLLOWINGS_REQUEST:
				draft.loadFollowingsLoading = true;
				draft.loadFollowingsError = null;
				draft.loadFollowingsDone = false;
				break;
			case LOAD_FOLLOWINGS_SUCCESS: {
				draft.loadFollowingsLoading = false;
				draft.loadFollowingsDone = true;
				if (action.data.isMe) {
					draft.me.Followings = action.data.followings;
				}
				draft.userInfo.Followings = action.data.followings;
				break;
			}
			case LOAD_FOLLOWINGS_FAILURE:
				draft.loadFollowingsLoading = false;
				draft.loadFollowingsError = action.error;
				break;
			case LOAD_FOLLOWERS_REQUEST:
				draft.loadFollowersLoading = true;
				draft.loadFollowersError = null;
				draft.loadFollowersDone = false;
				break;
			case LOAD_FOLLOWERS_SUCCESS: {
				draft.loadFollowersLoading = false;
				draft.loadFollowersDone = true;
				if (action.data.isMe) {
					draft.me.Followers = action.data.followers;
				}
				draft.userInfo.Followers = action.data.followers;
				break;
			}
			case LOAD_FOLLOWERS_FAILURE:
				draft.loadFollowersLoading = false;
				draft.loadFollowersError = action.error;
				break;
			case CHANGE_NICKNAME_REQUEST:
				draft.changeNicknameLoading = true;
				draft.changeNicknameError = null;
				draft.changeNicknameDone = false;
				break;
			case CHANGE_NICKNAME_SUCCESS:
				draft.changeNicknameLoading = false;
				draft.me.nickname = action.data.nickname;
				draft.changeNicknameDone = true;
				break;
			case CHANGE_NICKNAME_FAILURE:
				draft.changeNicknameLoading = false;
				draft.changeNicknameError = action.error;
				break;
			case UPLOAD_PROFILE_IMAGE_REQUEST:
				draft.uploadProfileImageLoading = true;
				draft.uploadProfileImageError = null;
				draft.uploadProfileImageDone = false;
				break;
			case UPLOAD_PROFILE_IMAGE_SUCCESS:
				draft.uploadProfileImageLoading = false;
				draft.previewProfilePath = action.data;
				draft.uploadProfileImageDone = true;
				break;
			case UPLOAD_PROFILE_IMAGE_FAILURE:
				draft.uploadProfileImageLoading = false;
				draft.uploadProfileImageError = action.error;
				break;
			case SIGN_UP_REQUEST:
				draft.signUpLoading = true;
				draft.signUpDone = false;
				draft.signUpError = null;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLoading = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLoading = false;
				draft.signUpError = action.error;
				break;
			case ADD_POST_TO_ME:
				draft.me.Posts = draft.me.Posts.concat({ id: action.data });
				break;
			case REMOVE_POST_OF_ME:
				draft.me.Posts = draft.me.Post.filter(({ id }) => id !== action.data);
				break;
			default:
				break;
		}
	});

export default reducer;
