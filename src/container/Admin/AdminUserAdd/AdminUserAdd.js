import React, { Component } from "react";
import axios from "../../../axios/axios";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import {
  ButtonBlue,
  ButtonGreen,
  Input,
  LinkBlue,
  Select,
} from "../../../StyleComponent";
import swal from "sweetalert";

class AdminUserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: [],
      allClass: [],
      roles: [],
      studentSuccess: null,
      classId: "def",
      choice: "default",
    };
  }

  componentDidMount() {
    document.title = "Добавление студента";
    axios
      .get(`/class/getAllClass`, { headers: { token: this.props.token } })
      .then((res) => {
        this.setState({
          allClass: res.data.data.resultAllClass,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`/role/getAllRole`, { headers: { token: this.props.token } })
      .then((res) => {
        this.setState({
          roles: res.data.data.roles,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const addStudetn = (e) => {
      e.preventDefault();
      var arrListStudent = [];
      arrListStudent.push({
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        lastName: document.getElementById("lastName").value,
        mail: document.getElementById("mail").value,
        nickname: document.getElementById("nick").value,
        password: document.getElementById("pas").value,
      });
      var data = new FormData();
      data.append("classId", document.querySelector(".selectClassId").value);
      data.append("list", [JSON.stringify(arrListStudent)]);
      axios({
        method: "post",
        url: "/user/generateStudents",
        headers: {
          token: this.props.token,
          "Content-Type": "multipart/form-data",
        },
        data,
      })
        .then((res) => {
          this.setState({
            studentSuccess: res.data.data.studentsList,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const addAdmin = (e) => {
      e.preventDefault();
      var name = document.getElementById("name").value;
      var surname = document.getElementById("surname").value;
      var patronymic = document.getElementById("patronymic").value;
      var nickname = document.getElementById("nickname").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var code = document.getElementById("code").value;
      var roleId = document.querySelector(".selectClassId").value;
      axios
        .get(
          `/user/registrationByCode?firstName=${name}&lastName=${surname}&middleName=${patronymic}&roleId=${roleId}&nickname=${nickname}&mail=${email}&password=${password}&registrationCode=${code}`,
          { headers: { token: this.props.token } }
        )
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Хорошая работа!",
              text: "Администратор успешно добавлен",
              icon: "success",
              button: "Продолжить",
            }).then(() => {
              window.location.reload();
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return (
      <div className="Form">
        {this.state.choice === "default" ? (
          <React.Fragment>
            <p
              style={{ fontSize: "22px", fontWeight: 700, marginBottom: "7px" }}
            >
              Кого добавить?
            </p>
            <div>
              <ButtonBlue
                onClick={() => this.setState({ choice: "student" })}
                style={{ margin: 7, width: "100%" }}
              >
                Студента
              </ButtonBlue>
              <ButtonBlue
                onClick={() => this.setState({ choice: "admin" })}
                style={{ margin: 7, width: "100%" }}
              >
                Администратора
              </ButtonBlue>
            </div>
          </React.Fragment>
        ) : this.state.choice === "student" ? (
          <React.Fragment>
            {this.state.studentSuccess === null ? (
              <form>
                <Select className="selectClassId" defaultValue="default">
                  <option value="default" disabled="disabled">
                    Выберите свой класс
                  </option>
                  {this.state.allClass.map((item) => (
                    <option value={item._id} key={nanoid()}>
                      {item.char} {item.act}
                    </option>
                  ))}
                </Select>
                <Input type="text" id="firstName" placeholder="Имя студента" />
                <Input
                  type="text"
                  id="middleName"
                  placeholder="Отчество студента"
                />
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Фамилия студента"
                />
                <Input type="text" id="mail" placeholder="Email студента" />
                <Input type="text" id="nick" placeholder="Никнейм студента" />
                <Input type="text" id="pas" placeholder="Пароль студента" />
                <ButtonBlue onClick={addStudetn}>Добавить</ButtonBlue>
              </form>
            ) : (
              <div className="studentSuccess">
                {this.state.studentSuccess.map((item) => (
                  <React.Fragment key={nanoid()}>
                    <p key={nanoid()}>
                      Имя: <span>{item.FIO.firstName}</span>
                    </p>
                    <p key={nanoid()}>
                      Фамилия: <span>{item.FIO.lastName}</span>
                    </p>
                    <p key={nanoid()}>
                      Отчество: <span>{item.FIO.middleName}</span>
                    </p>
                    <p key={nanoid()}>
                      Никнейм: <span>{item.nickname}</span>
                    </p>
                    <p key={nanoid()}>
                      Пароль: <span>{item.password}</span>
                    </p>
                    <p key={nanoid()}>
                      Почта: <span>{item.mail}</span>
                    </p>
                    <p key={nanoid()}>
                      Никнейм: <span>{item.mail}</span>
                    </p>
                    <p key={nanoid()}>
                      Пароль: <span>{item.mail}</span>
                    </p>
                    <LinkBlue to="/admin" key={nanoid()}>
                      Назад
                    </LinkBlue>
                  </React.Fragment>
                ))}
              </div>
            )}
          </React.Fragment>
        ) : this.state.choice === "admin" ? (
          <React.Fragment>
            <form>
              <Input type="text" id="name" placeholder="Имя" />
              <Input type="text" id="surname" placeholder="Фамилия" />
              <Input type="text" id="patronymic" placeholder="Отчество" />
              <Input type="text" id="nickname" placeholder="Логин" />
              <Input type="text" id="email" placeholder="Почта" />
              <Input type="text" id="password" placeholder="Пароль" />
              <Input type="text" id="code" placeholder="Регистрационный код" />
              <Select className="selectClassId" defaultValue="default">
                <option value="default" disabled="disabled">
                  Выберите роль
                </option>
                {this.state.roles.map((item) => (
                  <option value={item._id} id="roleId" key={nanoid()}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <ButtonGreen onClick={addAdmin}>Добавить</ButtonGreen>
            </form>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapDispatchToProps)(AdminUserAdd);
