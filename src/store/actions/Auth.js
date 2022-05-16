import axios from "../../axios/axios";
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "./actionTypes";

export function auth (login, password) {
    return async dispatch => {
      axios.get(`user/authorization?nickname=${String(login)}&password=${String(password)}`)
      .then(res => {
        if (res.status === 200) {
          axios.get(`/user/verifyToken`,
              {headers:{token: res.data.data.token}}
          )
          .then(resVer => {
            if (resVer.status === 200) {
              localStorage.setItem("token", res.data.data.token);
              localStorage.setItem("role", resVer.data.data.account.role.name);
              localStorage.setItem('firstName', resVer.data.data.account.FIO.firstName)
              localStorage.setItem('lastName', resVer.data.data.account.FIO.lastName)
              localStorage.setItem('middleName', resVer.data.data.account.FIO.middleName)
              localStorage.setItem("nickname", resVer.data.data.account.nickname)
              localStorage.setItem('money', resVer.data.data.account.money)
              localStorage.setItem('like_money', resVer.data.data.account.likeMoney)
              localStorage.setItem('email', resVer.data.data.account.mail)
              localStorage.setItem('id', resVer.data.data.account._id)
              dispatch(authSuccess(res.data.data.token,
                resVer.data.data.account.role.name,
                resVer.data.data.account.FIO.firstName,
                resVer.data.data.account.FIO.lastName,
                resVer.data.data.account.FIO.middleName,
                resVer.data.data.account.nickname,
                resVer.data.data.account.money,
                resVer.data.data.account.likeMoney,
                resVer.data.data.account.mail,
                resVer.data.data.account._id));
              dispatch(authError(null))
            }
          })
          .catch(e => {
            console.log(e);
          })
      }
      })
      .catch(err => {
        if (err.response) {
          switch (err.response.status) {
            case 403:
              dispatch(authError(err.response.data.message))
              break
            default:
              break;
          }
        }
      })
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return {
    type: AUTH_LOGOUT,
    };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const middleName = localStorage.getItem('middleName')
    const nickname = localStorage.getItem('nickname')
    const money = localStorage.getItem('money')
    const like_money = localStorage.getItem('like_money')
    const email = localStorage.getItem('email')
    const id = localStorage.getItem('id')
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token,
        role,
        firstName,
        lastName,
        nickname,
        middleName,
        money,
        like_money,
        email,
        id));
    }
  };
}

export function authSuccess(token, role, firstName, lastName, nickname, middleName, money, like_money, email, id) {
  return {
    type: AUTH_SUCCESS,
    token,
    role,
    firstName,
    lastName,
    nickname,
    middleName,
    money,
    like_money,
    email,
    id
  };
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    error,
  };
}
