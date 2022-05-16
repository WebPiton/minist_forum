import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LinkBlue } from '../../StyleComponent';

class Home extends Component {
    render() {
        return (
            <div className='body'>
                <header>
                    <h1>
                        ОРЕНБУРГСКАЯ <br/> ЭЛЕКТРОННАЯ ШКОЛА
                    </h1>
                    <div className="links">
                        {this.props.isAuth ?
                            <React.Fragment>
                                <p>
                                    <LinkBlue to="/item">обучение</LinkBlue>
                                </p>
                                <p>
                                    <LinkBlue to='/personal-area'>ПРОФИЛЬ</LinkBlue>
                                </p>
                            </React.Fragment> :
                                <p>
                                    <LinkBlue to='/auth'>Войти</LinkBlue>
                                </p>
                        }
                    </div>
                </header>
                <div className='homeMain'>
                    <div className="homeInfo">
                        <p>система дистанционного обучения</p>
                        <div className="homeButton">
                            {this.props.isAuth ?
                                <LinkBlue to="/item" style={{textAlign: "center", fontSize: "32px", width: "275px"}} >Начать</LinkBlue> :
                                <React.Fragment>
                                    <LinkBlue to='/auth'>Войти</LinkBlue>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    <img alt="" src="img/fatalError.png" />
                </div>
                <div className="InfoMain">
                    <div className="res№1">
                        <img alt="" src="./img/relationship.png" />
                        <div>
                            <h1>
                                Ресурс №1 для изучения биологии, химии и физики
                            </h1>
                            <p>
                                Учиться с ОЭШ весело и интересно.
                                Зарабатыайте очки за правильные ответы, открывайте новые материалы и узнавайте новое.
                                Наши видео-уроки помогут вам в этом
                            </p>
                        </div>
                    </div>
                    <div className="necessarilyOA">
                        <h1>
                            Почему вам обязательно понравится ОЭШ?
                        </h1>
                        <div className="cardList">
                            <div>
                                <div className="card">
                                    <img alt="" src="./img/fire.png"/>
                                    <div className="cardInfo">
                                        <h1>
                                            Быстрый прогресс
                                        </h1>
                                        <p>
                                            Исследования показали, что наши курсы эффективно развивают навыки чтения, устной речи и понимания на слух
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <img alt="" src="./img/girl.png"/>
                                    <div className="cardInfo">
                                        <h1>
                                            Индивидуальное обучение
                                        </h1>
                                        <p>
                                            Наши уроки сочетают лучшие достижения искусственного интеллекта и лингвистики. 
                                            Мы балансируем сложность и темп обучения для каждого пользователя индивидуально!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img alt="" src="./img/Macbook.png" />
                            <div>
                                <div className="card">
                                    <img alt="" src="./img/brain.png"/>
                                    <div className="cardInfo">
                                        <h1>
                                            Стимул к учебе
                                        </h1>
                                        <p>
                                            С нашим игровым подходом ежедневные занятия входят в привычку.
                                            Вам помогут забавные задания и напоминания от нашего талисмана — совёнка Duo
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <img alt="" src="./img/pen.png"/>
                                    <div className="cardInfo">
                                        <h1>
                                            Нескучные уроки
                                        </h1>
                                        <p>
                                            Эффективное обучение не должно быть скучным!
                                            Интересные задания и забавные персонажи дают стимул заниматься каждый день
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="res№2">
                        <img alt="" src="./img/Technologies.png" />
                        <div>
                            <h1>
                                Ресурс №1 для изучения биологии, химии и физики
                            </h1>
                            <p>
                                Учиться с ОЭШ весело и интересно.
                                Зарабатыайте очки за правильные ответы, открывайте новые материалы и узнавайте новое.
                                Наши видео-уроки помогут вам в этом
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuth
    };
  }

export default connect(mapStateToProps)(Home)