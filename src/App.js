import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import { autoLogin } from "./store/actions/Auth";
import { connect } from "react-redux";

import NotFound from "./container/NotFound/NotFound";
import Home from "./container/Home/Home";
import Regist from "./container/Regist/Regist";
import Auth from "./container/Auth/Auth";

import QuestionsFit from "./container/student/Questions/QuestionsFit";
import PersonalArea from "./container/student/PersonalArea/PersonalArea";
import ChangePersonal from "./container/student/PersonalArea/ChangePersonal";
import Item from "./container/student/item/item";
import Test from "./container/student/test/test";
import Module from "./container/student/Module/Module";


import admin from "./container/Admin/Admin/Admin";
import adminItem from "./container/Admin/AdminItem/adminItem";
import adminModule from "./container/Admin/AdminModule/adminModule";
import AdminClass from "./container/Admin/AdminClass/AdminClass";
import AdminClassInfo from "./container/Admin/AdminClassInfo/AdminClassInfo";
import AdminTheme from "./container/Admin/AdminTheme/AdminTheme";
import AddTheme from "./container/Admin/AdminAddTheme/AdminAddTheme";
import AdminAddClass from "./container/Admin/AdminAddClass/AdminAddClass";
import LayoutTheme from "./hoc/Layout/LayoutTheme";
import RegModule from "./container/Admin/AdminRegistModule/AdminRegistModule";
import AdminOpenModule from "./container/Admin/AdminOpenModule/AdminOpenModule";
import AdminUserAdd from "./container/Admin/AdminUserAdd/AdminUserAdd";
import AdminMenagerRole from "./container/Admin/AdminMenagerRole/AdminMenagerRole";
import AdminViewItem from "./container/Admin/AdminViewItem/AdminViewItem"
import AdminViewModule from "./container/Admin/AdminViewModule/AdminViewModule"
import AdminTable from "./container/Admin/AdminTable/AdminTable"
import AdminAddAchivments from "./container/Admin/AdminAddAchivments/AdminAddAchivments"
import AdminGetAchivments from "./container/Admin/AdminGetAchivments/AdminGetAchivments";

class App extends Component {
  componentDidMount() {
    document.title = "ОРЕНБУРГСКАЯ ЭЛЕКТРОННАЯ ШКОЛА"
    setInterval(() => {
      this.props.autoLogin();
    }, 10);
  }
  render() {
    function routerUser(user, role) {
      switch (user) {
        case false:
          return (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/auth" exact component={Auth}/>
              <Route path="/regist" exact component={Regist}/>
              <Route path="*" component={NotFound} />
            </Switch>
          );
        case true:
            switch (role) {
              case "Student":
                return (
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/auth' />)}/>
                    <Route path="/regist" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/regist' />)}/>
                    <Route path='/item' exact component={Item} />
                    <Route path='/module' exact component={Module} />
                    <Route path="/questions" exact component={QuestionsFit} />
                    <Route path='/test' exact component={Test}/>
                    <Route path="/personal-area" exact component={PersonalArea}/>
                    <Route path="/change-personal" exact component={ChangePersonal}/>
                    <Route path="*" component={NotFound} />
                  </Switch>
                )
              case "teacher":
                return (
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/auth' />)}/>
                    <Route path="/regist" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/regist' />)}/>
                    <Route path='/item' exact component={Item} />
                    <Route path='/module' exact component={Module} />
                    <Route path='/test' exact component={Test}/>
                    <Route path="/personal-area" exact component={PersonalArea}/>
                    <Route path="/change-personal" exact component={ChangePersonal}/>
                    <Route path="/questions" exact component={QuestionsFit} />
                    <Route path='/admin' exact component={admin} />
                    <Route path='/admin/item' exact component={adminItem} />
                    <Route path='/admin/class' exact component={AdminClass} />
                    <Route path='/admin/class-info' exact component={AdminClassInfo} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                )
              case "Admin":
                return (
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/auth' />)}/>
                    <Route path="/regist" exact component={() => (user ? <Redirect to='/item' /> : <Redirect to='/regist' />)}/>
                    <Route path='/item' exact component={Item} />
                    <Route path='/module' exact component={Module} />
                    <Route path='/admin' exact component={admin} />
                    <Route path='/admin/item' exact component={adminItem} />
                    <Route path='/admin/class' exact component={AdminClass} />
                    <Route path='/admin/class-info' exact component={AdminClassInfo} />
                    <Route path='/admin/module' exact component={adminModule} />
                    <Route path='/admin/theme' exact component={AdminTheme} />
                    <Route path='/admin/add-theme' exact component={AddTheme} />
                    <Route path='/admin/add-user' exact component={AdminUserAdd} />
                    <Route path='/admin/add-class' exact component={AdminAddClass} />
                    <Route path='/test' exact component={Test}/>
                    <Route path="/personal-area" exact component={PersonalArea}/>
                    <Route path="/change-personal" exact component={ChangePersonal}/>
                    <Route path="/questions" exact component={QuestionsFit} />
                    <Route path="/QuestionsFit" exact component={QuestionsFit} />
                    <Route path="/admin/role" exact component={AdminMenagerRole}/>
                    <Route path="/admin/regist-module" exact component={RegModule} />
                    <Route path="/admin/access-to-module" exact component={AdminOpenModule} />
                    <Route path="/admin/view-item" exact component={AdminViewItem}/>
                    <Route path="/admin/view-module" exact component={AdminViewModule}/>
                    <Route path="/admin/table" exact component={AdminTable}/>
                    <Route path="/admin/add-achivments" exact component={AdminAddAchivments}/>
                    <Route path="/admin/get-achivments" exact component={AdminGetAchivments}/>
                    <Route path="*" component={NotFound} />
                  </Switch>
                )
              default:
                break;
            }
            break
        default:
          break;
      }
    }

    return (
      <LayoutTheme>
        <Layout>
          {routerUser(this.props.isAuth, String(this.props.role))}
        </Layout>
      </LayoutTheme>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    role: state.auth.role
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));