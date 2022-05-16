import React, { Component } from "react";
import Header from "../../../component/Header/Header";
import axios from "../../../axios/axios";
import { connect } from "react-redux";
import { ButtonBlue, LinkGreen } from '../../../StyleComponent'
import Comment from "../../../component/Comment/Comment";

class Test extends Component{
    state = {
        attempts: 0,
        urlVideo: null,
        message: []
    }

    componentDidMount() {
        document.title = `Тема: ${this.props.location.state.name}`
    }
    render(){
        const commentHandler = (text) => {
            axios.get(`/message/setMessage?moduleId=${this.props.location.state.moduleId}&desc=${text}`, {headers: {token: this.props.token}})
                .then((res)=>{
                    if (res.data.data.type === "success") {
                        document.getElementById("comment").value = ""
                    }
                })
                .catch((e)=>{
                    console.log(e);
                })
        }
        return(
            <React.Fragment>
                <Header />
                <div className="testList">
                    <div className="testInfo">
                        <p>Предмет: {this.props.location.state.parentName}</p>
                        <p>Тема: {this.props.location.state.name}</p>
                    </div>
                    <div className="testContent">
                        <h2>Содержаение темы</h2>
                        <p>{this.props.location.state.description}</p>
                        {this.state.urlVideo !== null ?
                            <React.Fragment>
                                <h2>Видео материал</h2>
                                <div className="testVideo"></div>
                            </React.Fragment> :
                            null
                        }
                        <h2>Тестирование</h2>
                        <div className="testAttempt">
                            <LinkGreen
                                to={{
                                    pathname: "/questions/",
                                    state: { moduleId: this.props.location.state.moduleId },
                                }}>
                                Пройти тест
                            </LinkGreen>
                            <p>Попыток осталось: {this.state.attempts} из 4</p>
                        </div>
                            {this.state.attempts > 0 ?
                                <React.Fragment>
                                    <h2>Твои попытки</h2>
                                    <div className="testAttemptsTable">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td><p>Дата попытки</p></td>
                                                    <td><p>Кол-во вопросов</p></td>
                                                    <td><p>Кол-во правильных вопросов</p></td>
                                                    <td><p>Кол-во неправильных вопросов</p></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><p>01.12.2021</p></td>
                                                    <td><p>10</p></td>
                                                    <td><p>10</p></td>
                                                    <td><p>0</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </React.Fragment>: null}
                        <h2>Коментарии</h2>
                        <div className="testComments">
                            <div className="testCommentsButton">
                                <textarea placeholder="Оставить отзыв" id="comment"></textarea>
                                <ButtonBlue onClick={() => commentHandler(document.getElementById("comment").value)}>
                                    Оставить коментарий
                                </ButtonBlue>
                            </div>
                            <Comment moduleId={this.props.location.state.moduleId} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(Test)