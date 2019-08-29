import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import {Switch, Route, Redirect} from 'react-router-dom';
import User from "./pages/user/User";
// import Classify from "./pages/classify/Classify";
let Classify = asyncComponent(()=>import('./pages/classify/Classify'));
import Loadable from 'react-loadable';
// import Cart from "./pages/cart/Cart";
const Cart = Loadable({
    loader: () => import('./pages/cart/Cart'),
    loading: Loading
});
import Eat from "./pages/eat/Eat";
import ErrorPage from "./pages/error/ErrorPage";
import Detail from "./pages/detail/Detail";
import Glike from "./pages/glike/Glike";
import Loading from "./components/loading/Loading";
import Login from "./pages/login/Login";
import Reg from "./pages/reg/Reg";
import Auth from "./guard/Auth";

import {connect} from "react-redux";

import {VIEW_HEAD,VIEW_FOOT} from "./store/types";
import asyncComponent from './asyncComponent';

class App extends React.Component{
    // 接收到底层的props更新，主要更新为location.pathname
    componentWillReceiveProps(nextProps){
        let path = nextProps.location.pathname;
        this.checkPath(path)
        // console.log('up',this.props)
    }
    //第一次不执行此钩子
    componentDidMount(){
        // console.log(this.props)
        let path = this.props.location.pathname;
        this.checkPath(path)
    }
    checkPath = (path) => {
        let {viewHead,viewFoot} = this.props;
        if (/home|classify|glike/.test(path)){
            viewHead(true);viewFoot(true)
        }
        if (/login|reg|cart/.test(path)){
            viewHead(false);viewFoot(false)
        }
        if (/user|eat|detail/.test(path)){
            viewHead(false);viewFoot(true)
        }
    }
    render() {
        let {bHead,bFoot,bLoading}=this.props;
        // console.log('render',bHead,bFoot);
        return (
            <div className="app">
                {bLoading && <Loading/>}
                {bHead && <Header/>}
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Auth path='/user' component={User} />
                        <Route path='/classify' component={Classify} />
                        <Route path='/glike' component={Glike} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/eat' component={Eat} />
                        <Route path='/detail/:id' component={Detail}/>
                        <Route path='/login' component={Login} />
                        <Route path='/reg' component={Reg}></Route>
                        <Redirect exact from="/" to="/home" />
                        <Route component={ErrorPage} />
                    </Switch>
                {bFoot && <Footer {...this.props}/>}
            </div>
        )
    }
}

const initMapStateToProps = state=>({
        bHead:state.bHead,
        bFoot:state.bFoot,
        bLoading:state.bLoading
    });

const initMapDispatchToProps = dispatch=>({
        viewHead:(bl) => dispatch({type:VIEW_HEAD,payload:bl}),
        viewFoot:(bl) => dispatch({type:VIEW_FOOT,payload:bl})
    });

export default connect(initMapStateToProps,initMapDispatchToProps)(App);
