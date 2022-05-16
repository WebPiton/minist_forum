import React, {Component} from "react";
import { ButtonBlue, Input } from "../../StyleComponent"

class Regist extends Component {
  render() {
    return (
      <div className='Form'>
        <h1>Создание аккаунта</h1>
        <form>
          <Input placeholder="Имя"/>
          <Input placeholder="Фамилия"/>
          <Input placeholder="Никнейм"/>
          <Input placeholder="Класс" type="number" min='4' max="11"/>
          <Input list="chars" placeholder="Буква"/>
          <datalist id='chars'>
            <option value='А'/>
            <option value='Б'/>
            <option value='В'/>
            <option value='Г'/>
            <option value='Д'/>
          </datalist>
          <Input placeholder="Пароль"/>
          <ButtonBlue>Создать аккаунт</ButtonBlue>
        </form>
      </div>
    )
  }
}

export default Regist