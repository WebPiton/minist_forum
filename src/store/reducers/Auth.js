import { AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  token: null,
  role: null,
  isAuth: false,
  firstName: null,
  lastName: null,
  middleName: null,
  nickname: null,
  money: null,
  like_money: null,
  email: null,
  error: null,
  id: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        role: action.role,
        isAuth: true,
        firstName: action.firstName,
        lastName: action.lastName,
        middleName: action.middleName,
        nickname: action.nickname,
        money: action.money,
        like_money: action.like_money,
        email: action.email,
        id: action.id
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        role: null,
        isAuth: false,
        firstName: null,
        lastName: null,
        middleName: null,
        nickname: null,
        money: null,
        like_money: null,
        email: null,
        id: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}