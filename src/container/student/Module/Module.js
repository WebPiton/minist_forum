import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../axios/axios";
import Header from "../../../component/Header/Header";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../../../component/Loader/Loader";

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      nesting: 0,
      module: [],
    };
  }

  componentDidMount() {
    document.title = `Выбор модуля`;
    axios
      .get(`/module/getAllChild?parent=${this.props.location.state.parentId}`, {
        headers: { token: this.props.token },
      })
      .then((res) => {
        this.setState({
          module: res.data.data.module,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const further = (parentId) => {
      this.setState({ isLoading: true });
      axios
        .get(`/module/getAllChild?parent=${parentId}`, {
          headers: { token: this.props.token },
        })
        .then((res) => {
          this.setState({
            module: res.data.data.module,
            isLoading: false,
            nesting: +1,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    return (
      <React.Fragment>
        {!this.state.isLoading ? (
          <React.Fragment>
            <Header />
            <div className="moduleBlock">
              <div className="module">
                <div className="moduleInfo">
                  {this.state.nesting === 0 ? (
                    <p>Предмет: {this.props.location.state.parentName}</p>
                  ) : (
                    <p>Модуль: {this.state.module.name}</p>
                  )}
                  <p>Доступные модули</p>
                </div>
                {this.state.module.childs.map((item) => {
                  return (
                    <React.Fragment key={nanoid()}>
                      {item.childIds.length > 0 && item.access ? (
                        <div
                          onClick={() => further(item._id)}
                          className="moduleCard"
                          key={nanoid()}
                        >
                          <p key={nanoid()}>Модуль: {item.name}</p>
                          <div className="progressBar">
                            <ProgressBar
                              completed={80}
                              bgColor="#45D62F"
                              width="100%"
                              isLabelVisible={false}
                              className="progress_bar_line"
                            />
                            <ProgressBar
                              completed={60}
                              bgColor="blue"
                              width="100%"
                              isLabelVisible={false}
                              className="progress_bar_line"
                            />
                            <ProgressBar
                              completed={20}
                              bgColor="red"
                              width="100%"
                              isLabelVisible={false}
                              className="progress_bar_line"
                            />
                          </div>
                        </div>
                      ) : item.childIds.length === 0 && item.access ? (
                        <Link
                          to={{
                            pathname: "/test/",
                            state: {
                              moduleId: item._id,
                              name: item.name,
                              parentName: this.props.location.state.parentName,
                            },
                          }}
                          className="moduleCard"
                          key={nanoid()}
                        >
                          <p key={nanoid()}>Тема: {item.name}</p>
                          <div className="progressBar">
                            <ProgressBar
                              completed={80}
                              bgColor="#45D62F"
                              width="100%"
                              isLabelVisible={false}
                              className="progress_bar_line"
                            />
                            <ProgressBar
                              completed={60}
                              bgColor="blue"
                              width="100%"
                              isLabelVisible={false}
                              className="progress_bar_line"
                            />
                            <ProgressBar
                              completed={20}
                              bgColor="red"
                              width="100%"
                              isLabelVisible={false}
                              className="progress_bar_line"
                            />
                          </div>
                        </Link>
                      ) : null}
                    </React.Fragment>
                  );
                })}
                <div className="moduleInfo">
                  <p>Заблокированные модули</p>
                </div>
                {this.state.module.childs.map((item) => {
                  return (
                    <React.Fragment key={nanoid()}>
                      {item.access === false ? (
                        <div className="moduleCardLock" key={nanoid()}>
                          <p key={nanoid()}>
                            {item.childIds.length === 0 ? "Тема:" : null}{" "}
                            {item.name}
                          </p>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapDispatchToProps)(Module);
