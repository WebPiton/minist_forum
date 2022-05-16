import React, {Component} from "react";
import { connect } from "react-redux";
import { auth } from "../../store/actions/Auth";
import { ButtonBlue, Input } from "../../StyleComponent"

class Auth extends Component {
  render() {
    const auth = (e) => {
      e.preventDefault();
      var login = document.querySelector("#login").value;
      var password = document.querySelector("#password").value;
      this.props.auth(login, String(password));
    };

    return (
      <div className='Form'>
        <h1>Вход в аккаунт</h1>
        <form>
          <Input id="login" type="text" placeholder="Никнейм"/>
          {this.props.error === 'nickname failed' ? <p className="error">Никнейм не правильный</p> : null}
          <Input id="password" type="password" placeholder="Пароль"/>
          {this.props.error === 'password failed' ? <p className="error">Пароль не правильный</p> : null}
          <ButtonBlue onClick={auth}>Войти</ButtonBlue>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (login, password) => dispatch(auth(login, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);