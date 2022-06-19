import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { ButtonRed, LinkGreen, LinkBlueTable } from "../../../StyleComponent";

class PersonalArea extends Component {
  state = {
    achievements: [
      {
        name: "Энтузиаст",
        number: 1,
        lvl: 1,
        textAchievements: "Удерживайте ударный режим 3 дня",
      },
      {
        name: "Энтузиаст",
        number: 0,
        lvl: 1,
        textAchievements: "Удерживайте ударный режим 3 дня",
      },
      {
        name: "Энтузиаст",
        number: 0,
        lvl: 1,
        textAchievements: "Удерживайте ударный режим 3 дня",
      },
      {
        name: "Энтузиаст",
        number: 0,
        lvl: 1,
        textAchievements: "Удерживайте ударный режим 3 дня",
      },
      {
        name: "Энтузиаст",
        number: 0,
        lvl: 1,
        textAchievements: "Удерживайте ударный режим 3 дня",
      },
    ],
  };
  componentDidMount() {
    document.title = "Личный кабинет";
  }
  render() {
    const exit = () => {
      localStorage.clear();
      window.location = "/";
    };

    return (
      <div className="personalArea">
        <div className="persInfoBlock">
          <img src="/img/noPhoto.png" alt="" />
          <div className="persInfo">
            <h2 className="name">{this.props.nickname}</h2>
            <p>
              <span>{this.props.money}</span>x{" "}
              <img src="/img/coin.png" alt="Монетки" />
            </p>
            <p>
              <span>{this.props.like_money}</span>x{" "}
              <img src="/img/coinSocial.png" alt="Соц. монетки" />
            </p>
          </div>
          <div className="buttonsBlock">
            <ButtonRed onClick={exit}>Выйти</ButtonRed>
            <LinkGreen to="/change-personal">Изменить данные</LinkGreen>
            <LinkBlueTable style={{ marginTop: 7 }} to="/admin/table">
              Таблицы
            </LinkBlueTable>
          </div>
        </div>
        <div className="static">
          <h2>Статистика</h2>
          <div className="staticContent">
            <div className="staticitem">
              <img src="/img/fire.svg" alt="" />
              <div className="staticitemText">
                <p>0</p>
                <p>Ударный режим</p>
              </div>
            </div>
            <div className="staticitem">
              <img src="/img/cup.svg" alt="" />
              <div className="staticitemText">
                <p>0</p>
                <p>Очки опыта</p>
              </div>
            </div>
            <div className="staticitem">
              <img src="/img/like.svg" alt="" />
              <div className="staticitemText">
                <p>0</p>
                <p>Лайки</p>
              </div>
            </div>
            <div className="staticitem">
              <img src="/img/crown.svg" alt="" />
              <div className="staticitemText">
                <p>0</p>
                <p>Ударный режим</p>
              </div>
            </div>
          </div>
        </div>
        <div className="achievements">
          <h2>Достижения</h2>
          <div className="achievementscontent">
            {this.state.achievements.map((item) => (
              <div className="achievementsItem" key={nanoid()}>
                <img src="/img/red.svg" alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nickname: state.auth.nickname,
    money: state.auth.money,
    like_money: state.auth.like_money,
  };
}

export default connect(mapStateToProps)(PersonalArea);
