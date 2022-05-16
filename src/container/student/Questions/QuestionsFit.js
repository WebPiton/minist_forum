import React, { Component } from "react";
import './QuestionsFit.css'
import { nanoid } from "nanoid";
import succes from './succes.png'
import error from './error.png'
import { NavLink } from "react-router-dom";
import axios from "../../../axios/axios";
import { connect } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../../../component/Loader/Loader";
import swal from 'sweetalert';

class QuestionsFit extends Component{
    constructor(props){
        super(props);
        this.state = {
            loader: true,
            display: {display: 'none'},
            score: 0,
            footer: 'zero',
            progCheck: 0,
            quest: 0,
            disabled: false,
            answers : [],
            questions: [],
            testId: '',
            }
          }

      componentDidMount(){
          document.title = 'Вопросы'
          axios.get(`/test/startTest?moduleId=${this.props.location.state.moduleId}`, {headers: {token: this.props.token}})
            .then((res)=>{
              this.setState({
                questions: res.data.data.module.questions,
                loader: false,
                testId: res.data.data.module.testId
              })
            })
            .catch((e)=>{
                console.log(e);
            })
            function mixarr(arr){
                return arr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
            }
            this.setState({
              questions: mixarr(this.state.questions)
            })
      }

    render(){

        const handleAnswerButtonClick = (isCorrect, e) => {
          let plusScore = this.state.score + 1
            switch (this.state.questions[this.state.quest].type) {
              case "oneCorrect":
                this.setState({
                  answers: [ ...this.state.answers, {
                    'questionId': this.state.questions[this.state.quest]._id,
                    'accountAnswerId': e.target.value
                  }],
                });
                this.setState({disabled: true})
                if(isCorrect){
                  this.setState({
                    disabled: true,
                    score: plusScore,
                    footer: true,
                  })
                } else{
                    this.setState({
                      disabled: true,
                      footer:  false
                    })
                }
                break;
              case "manyCorrect":
                var choice = document.querySelectorAll("input[type=checkbox]")
                var arr = []
                var arrIsCor = this.state.questions[this.state.quest].answers.filter(item => item.isCorrect)
                for (let i of choice) {
                  if (i.checked) {
                    arr.push(i.attributes["qwerty"].value)
                    this.setState({score: plusScore})
                  }
                }
                if (arrIsCor.length !== arr.length) {
                  this.setState({footer: false})
                } else {
                  let zxc = true
                  for (let t of choice) {
                    if (t.checked) {
                      if (arrIsCor.findIndex(item => item.answer._id === t.attributes["qwerty"].value) === -1) {
                        zxc = false
                      }
                    }
                  }
                  this.setState({footer: zxc})
                }
                this.setState({
                  answers: [ ...this.state.answers, {
                    'questionId': this.state.questions[this.state.quest]._id,
                    'accountAnswerIds': arr
                  }],
                });
                break
              default:
                break;
            }
        }

        const handleNextQustion = () => {
          let nextQuestion = this.state.quest + 1
          this.setState({
            footer: 'zero',
            progCheck: this.state.progCheck + 1,
            readonly: false,
            disabled: false,
          })
          if(nextQuestion < this.state.questions.length){
            this.setState({quest: nextQuestion})
          } else{
            document.getElementById('quest').style.display = 'none'
            this.setState({
              display: {display: 'flex'},
              footer: null
            })
          }
          if (this.state.questions[this.state.quest].type === "write") document.querySelector("#answer").value = ''
        }

        const handleSkipQuestion = () => {
            let nextQuestion = this.state.quest + 1
            if(nextQuestion < this.state.questions.length){
              this.state.answers.push(null)
              this.setState({quest: nextQuestion, progCheck: this.state.progCheck + 1,})
            } else{
              this.state.answers.push(null)
              document.getElementById('quest').style.display = 'none'
              this.setState({display: {display: 'flex'}})
              this.setState({footer: null})
              this.setState({progCheck: this.state.progCheck + 1,})
            }
        }

        const sendAnswer = () => {
          axios.get(`/test/closeTest?testId=${this.state.testId}`, {headers: {token: this.props.token}, params: {
            answers: JSON.stringify(this.state.answers)
          }})
            .then(()=>{
              swal({
                title: "Хорошая работа!",
                text: "Тест завершен",
                icon: "success",
                button: "Продолжить",
               })
                .then(() => {
                    window.location.reload()
                });
            })
            .catch((e)=>{
                console.log(e);
            })
        }

        const footer = (footer) => {
          switch (footer) {
            case "zero":
              return (
                <div className="footer" id='footer'>
                    <button onClick={() => handleSkipQuestion()}>Пропустить</button>
                    <button className="verify" onClick={(e) => handleAnswerButtonClick(this.state.questions[this.state.quest].answers, e)}>Проверить</button>
                </div>
              )
            case true:
              return (
                <div className="footer_succes">
                  <div className="footer_text">
                    <img src={succes} alt=''/>
                    <div className="footer_text_content">
                      <p>Замечательно!</p>
                    </div>
                  </div>
                  <button className="button" onClick={() => handleNextQustion(this.state.questions[this.state.quest].answers)}>Далее</button>
                </div>
              )
            case false:
              return (
                <div className="footer_error">
                  <div className="footer_text">
                    <img src={error} alt=''/>
                    <div className="footer_text_content">
                     <p>Правильный ответ:
                     {this.state.questions[this.state.quest].answers.map((item) => item.isCorrect ? <span key={nanoid()}> {item.answer.desc}</span> : null)}
                     </p>
                   </div>
                 </div>
                 <button onClick={() => handleNextQustion(this.state.questions[this.state.quest].rightAnswer)}>Далее</button>
               </div>
              )
            default:
              break;
          }
        }

        const answer = (type) => {
          var arr = this.state.questions[this.state.quest].answers
          switch (type) {
            case "oneCorrect":
              return (
                arr.map((answer) => (
                  <React.Fragment key={nanoid()}>
                    <button
                      onClick={(e) => handleAnswerButtonClick(answer.isCorrect, e)}
                      className="answer" id="button" key={nanoid()}
                      value={answer.answer._id}
                      disabled={this.state.disabled}
                    >
                      {answer.answer.img ? <img src={process.env.REACT_APP_IMG_HOST + answer.answer.img} alt="" /> : answer.answer.desc}
                    </button>
                  </React.Fragment>
                )
              ))
            case "manyCorrect":
              const Checkbox = ({ label, checked = false, className = null, value }) => (
                <React.Fragment>
                  <input type="checkbox" qwerty={value} id={label} defaultChecked={checked} />
                  <label htmlFor={label} qwerty={value} className={className}>{label}</label>
                </React.Fragment>
              );
              return (
                <React.Fragment key={nanoid()}>
                  {
                    arr.map((item) => {
                      return (
                        <React.Fragment key={nanoid()}>
                          <div className="answerItem">
                            <Checkbox label={item.answer.desc} value={item.answer._id} />
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                </React.Fragment>
              )
            default:
              break;
          }
        }

        return(
          <React.Fragment>
            {this.state.loader ? <Loader /> :
            <div className="question_block">
              <div className="progress_bar">
                  <p>X</p>
                  <ProgressBar
                    completed={(this.state.progCheck) * 100 / this.state.questions.length}
                    bgColor="#45D62F"
                    width="100%"
                    isLabelVisible={false}
                    className="progress_bar_line"
                  />
              </div>
              <div className="question" id="quest">
                <h2 className="сhoose_correct_answer">{this.state.questions[this.state.quest].desc}</h2>
                <div className="test_content">
                    <div className="answers">
                      {answer(this.state.questions[this.state.quest].type)}
                    </div>
                </div>
              </div>
              {footer(this.state.footer)}
              <div className="component" style={this.state.display} >
                <div className="component_content">
                  <img src="/img/crown.svg" alt=""/>
                  <div className="progress_bar_line"></div>
                  <div className="component_text">
                    <h2 className="text_title">До цели дня еще 5 очков опыта</h2>
                    <p>Конец урока!
                      <span>Опыт: +10</span>
                    </p>
                    <p>Бонус серии!
                      <span>Опыт: +5</span>
                    </p>
                    <p>Правильных ответов: {this.state.score}</p>
                  </div>
                </div>
                <div className="component_buttons">
                  <button className="overview">Обзор урока</button>
                  <NavLink id='vhod' to='/item' onClick={() => sendAnswer()} className="next">Далее</NavLink>
                </div>
              </div>
            </div>}
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}


export default connect(mapDispatchToProps)(QuestionsFit)