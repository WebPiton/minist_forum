import React, { Component } from "react";
// import './Module.css'
import { nanoid } from 'nanoid'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import axios from "../../../axios/axios";
import Header from "../../../component/Header/Header"
import ProgressBar from "@ramonak/react-progress-bar";

class Module extends Component{
    constructor(props){
        super(props);
        this.state = {
            module: [],
            studentCard: [
                {
                    name: 'test',
                    rang: 'test'
                },
                {
                    name: 'test',
                    rang: 'test'
                },
                {
                    name: 'test',
                    rang: 'test'
                },
                {
                    name: 'test',
                    rang: 'test'
                },
                {
                    name: 'test',
                    rang: 'test'
                },
            ]
        }
    }

    componentDidMount() {
        document.title=`Выбор модуля предмета ${this.props.location.state.cardName}`
        axios.get(`/module/getModulesCharter?charter_id=${this.props.location.state.cardId}`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                module: res.data.data.modules
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <div className="moduleBlock">
                    <div className="module">
                        <div className="moduleInfo">
                            <p>Предмет: {this.props.location.state.cardName}</p>
                            <p>Доступные модули</p>
                        </div>
                        {this.state.module.length > 0 ?
                            <React.Fragment>
                                {this.state.module.map((item) =>
                                    <Link
                                            to={{
                                                pathname: "/theme/",
                                                state: { moduleId: item.id, moduleName: item.name, cardName: this.props.location.state.cardName },
                                            }}
                                            // onClick={}
                                            className="moduleCard"
                                            key={nanoid()}
                                        >
                                            <p key={nanoid()}>{item.name}</p>
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
                                )}
                            </React.Fragment> : <div className="moduleCard"><p>Модулей нет</p></div> }
                    {/* <h1>Заблокированные модули</h1>
                        {this.state.module.map((item) =>
                            item.accessibly === false ?
                                <div className="Item_card_locked" key={nanoid()}>
                                    <h1 key={nanoid()}>{item.moduleName}</h1>
                                    <h1 key={nanoid()}>Выполнено: {item.done}% из 100%</h1>
                                </div> : null
                        )} */}
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

export default connect(mapDispatchToProps)(Module)