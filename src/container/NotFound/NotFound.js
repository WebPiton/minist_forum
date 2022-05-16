import React, { Component } from "react";
import { ButtonBlue } from "../../StyleComponent";
import "./NotFound.css"

class NotFound extends Component {
  componentDidMount() {
    document.title = "Такая страница не найдена";
  }

  render() {
    const out = () => {
      return (window.location = "/");
    };
    return (
      <div className='notfound'>
        <img src="/img/404.svg" alt='notfound' />
        <p>Такой страницы не существует</p>
          <ButtonBlue className='outnot' onClick={out}>
            Главная
          </ButtonBlue>
      </div>
    );
  }
}

export default NotFound;
