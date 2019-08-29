import React from 'react';
import './User.css';
export default class Home extends React.Component{
    state = {
        data:{}
    };
    
    componentDidMount() {
        console.log(this.props)
        this.setState({
            data:this.props.data
        })
    }
    render() {
        let data = this.state.data;
        return (
            <div className="user">
                <div className="index-bigbox">
                    <div className="personal-top">
                        <img src="/asserts/img/599aa36d5e4a4.jpg" alt="" className="personal-img"/>
                            <div className="personal-top-box1">
                                <span className="personal-top-img1"><img src={data.icon} alt=""/></span>
                                <div className="personal-top-box2">
                                    <span className="personal-top-text1">{data.nikename}</span>
                                </div>
                            </div>
                    </div>
                    <div className="personal-box1 mbt-05">
                        <a href="./my-indent-dfk.html" className="personal-box2 box3">
                            <span className="personal-box1-img1"><img src="/asserts/img/personal-center-img1.png"
                                                                      alt=""/></span>
                            <span className="personal-box1-text1">待付款</span>
                        </a>
                        <a href="./my-indent-dfh.html" className="personal-box2 box3">
                            <span className="personal-box1-img1"><img src="/asserts/img/personal-center-img2.png"
                                                                      alt=""/></span>
                            <span className="personal-box1-text1">待发货</span>
                        </a>
                        <a href="./my-indent-dsh.html" className="personal-box2 box3">
                            <span className="personal-box1-img1"><img src="/asserts/img/personal-center-img3.png"
                                                                      alt=""/></span>
                            <span className="personal-box1-text1">待收货</span>
                        </a>
                        <a href="./my-indent-pj.html" className="personal-box2 box3">
                            <span className="personal-box1-img1"><img src="/asserts/img/personal-center-img4.png"
                                                                      alt=""/></span>
                            <span className="personal-box1-text1">待评价</span>
                        </a>
                        <a href="./my-indent-all.html" className="personal-box2 box3">
                            <span className="personal-box1-img1"><img src="/asserts/img/personal-center-img5.png"
                                                                      alt=""/></span>
                            <span className="personal-box1-text1">全部订单</span>
                        </a>
                    </div>
                    <a href="./discount-coupon.html" className="personal-box5">
                        <span className="personal-box5-img1"><img src="/asserts/img/personal-center-img10.png"
                                                                  alt=""/></span>
                        <span>我的优惠券</span>
                    </a>
                    <a href="./receiving-adress-list.html" className="personal-box5">
                        <span className="personal-box5-img1"><img src="/asserts/img/personal-center-img11.png"
                                                                  alt=""/></span>
                        <span>收货地址</span>
                    </a>
                    <a href="./news-center.html" className="personal-box5">
                        <span className="personal-box5-img1"><img src="/asserts/img/personal-center-img12.png"
                                                                  alt=""/></span>
                        <span>售后服务</span>
                    </a>
                    <span className="personal-box5-text2">退出登录</span>
                </div>
                <div className="kaola-bottom">
                </div>
            </div>
        )
    }
}