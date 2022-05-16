import React, { Component } from "react";
// import './item.css'
import { nanoid } from 'nanoid'
import {Link} from 'react-router-dom'
import axios from "../../../axios/axios";
import { connect } from "react-redux";
import Header from "../../../component/Header/Header";
import ProgressBar from "@ramonak/react-progress-bar";

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            charter: [],
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
        document.title="Выбор предмета"
        axios.get(`module/getAllCharter`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                charter: res.data.data.modules
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
                        <h1>Предметы</h1>
                        {this.state.charter.length > 0  ?
                            this.state.charter.map((item) =>
                                item.access === true ?
                                    <Link
                                        to={{
                                        pathname: "/module/",
                                        state: { parentId: item._id, parentName: item.name },
                                        }}
                                        className="moduleCard"
                                        key={nanoid()}
                                    >
                                        <h1 key={nanoid()}>{item.name}</h1>
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
                                    </Link> : null) :
                            <h1>Предметов нет</h1>}
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

export default connect(mapDispatchToProps)(Item)