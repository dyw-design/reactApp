import  React from 'react';
import './Detail.css';
import querystring from 'query-string';
import {GET_COUNT, GET_GOODS, VIEW_FOOT, VIEW_HEAD} from "../../store/types";
import {connect} from "react-redux";
class Detail extends React.Component{
    state={
        details:{},
        isShow:true,
        dataName:''
    }
    async componentDidMount(){
        document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
        let id = this.props.match.params.id-0;
        let dataName = querystring.parse(this.props.location.search).dataName;
        this.setState({dataName})
        let res = await Detail.axios({
            url:`/mock/${dataName}/${id}`
        })
        this.setState({details:res.data.data});
        // console.log(store);
        this.props.getAllGoods();
        // console.log(this.props)
    }
    reback = ()=>{
       this.props.history.go(-1);
    }
    addCart = ()=>{
        let {getGoods} = this.props;
        let goods_item = localStorage.getItem("goods_item");
        if(goods_item) {
            goods_item = JSON.parse(goods_item);
            var firstAdd = 0;
            for (var i = 0; i < goods_item.length; i++) {
                    if (goods_item[i].dataName === this.state.dataName && goods_item[i].id === this.state.details.id) {
                        goods_item[i].num += 1;
                        firstAdd = 1;
                    }
                }
            if (firstAdd === 0) {
                goods_item.push({
                    id: this.state.details.id,
                    num: 1,
                    dataName: this.state.dataName
                });
            }
        } else {
                    goods_item = [{
                        id: this.state.details.id,
                        num: 1,
                        dataName: this.state.dataName
                    }];
                }
        localStorage.setItem("goods_item", JSON.stringify(goods_item));
        getGoods(goods_item);
        this.props.getAllGoods();
    }
    render() {
        let {detail,...data} = this.state.details;
        return (
            <div className='detail'>
                <div className="near-box">
                    <div className="gdetails-header">
                        <a className="gdetails-hleft" onClick={this.reback}></a>
                            <div className="gdetails-htbox">
                                商品详情
                            </div>
                            <span className="gdetails-hshare" onClick={(ev)=>{
                                this.state.isShow ? this.refs.share.style.display = "block" : this.refs.share.style.display = "none";this.setState({isShow:!this.state.isShow});ev.stopPropagation();
                            }}></span>
                        </div>
                        <div className="gdetails-bigbox">
                            <div id="slideBox" className="slideBox">
                                <div className="bd">
                                    <ul>
                                        <li style={{width:'375px',height:'250px'}}>
                                            <a href=""><img src={data.banner}/></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="hd">
                                    <ul></ul>
                                </div>
                            </div>
                            <div className="gdetails-price">
                                <div className="gdetails-price-box1">
                                    <span className="gdetails-price-text1">￥{data.price}</span>
                                    <span className="gdetails-price-text2">原价￥{data.origin_price}</span>
                                    <span className="gdetails-price-text3">特价</span>
                                </div>
                                <div className="gdetails-price-box1">
                                    <div className="gdetails-price-text5">{data.sub_title}</div>
                                </div>
                            </div>
                            <div className="gdetails-layer-bg" style={{display: 'none'}}></div>
                            <div className="gd-share-layer" ref="share">
                                <div className="gd-share-layer-box1">分享</div>
                                <div className="gd-share-layer-box2">
                                    <span className="gd-share-layer-img1"><img src="/asserts/img/icon_qq.png"/></span>
                                    <span className="gd-share-layer-text1">QQ</span>
                                </div>
                                <div className="gd-share-layer-box2">
                                    <span className="gd-share-layer-img1"><img src="/asserts/img/icon_weichat.png"/></span>
                                    <span className="gd-share-layer-text1">微信</span>
                                </div>
                                <div className="gd-share-layer-box2">
                                    <span className="gd-share-layer-img1"><img src="/asserts/img/icon_qzone.png"/></span>
                                    <span className="gd-share-layer-text1">QQ空间</span>
                                </div>
                                <div className="gd-share-layer-box2">
                                    <span className="gd-share-layer-img1"><img src="/asserts/img/icon_xinlang.png"/></span>
                                    <span className="gd-share-layer-text1">新浪微博</span>
                                </div>
                                <div className="gd-share-layer-box2">
                                    <span className="gd-share-layer-img1"><img src="/asserts/img/icon_douban.png"/></span>
                                    <span className="gd-share-layer-text1">豆瓣网</span>
                                </div>
                                <div className="gd-share-layer-box2">
                                    <span className="gd-share-layer-img1"><img src="/asserts/img/icon_zhifubao.png"/></span>
                                    <span className="gd-share-layer-text1">支付宝</span>
                                </div>
                            </div>
                            <div className="recommend-box1">商品详情</div>
                            <div className="recommend-box2">
                                <span className="recommend-box2-text1"><i>品牌：</i>{data.brand}</span>
                                <span className="recommend-box2-text1"><i>产品规格： </i>480-640g粒/盒</span>
                            </div>
                            <div className="recommend-box1">图文详情</div>
                            <div className="image-text-xq-img"><img src={data.banner} /></div>
                        </div>
                        <div className="goods-details-bottom">
                            <div className="gd-collect">
                                <span className="gd-collect-img1"></span>
                                <span className="gd-collect-text1" onClick={()=>(this.props.history.push('/home'))}>首页</span>
                            </div>
                            <a className="gd-collect">
                                <span className="gd-collect-img1 img2"><i className="add-num">{this.props.allCount}</i></span>
                                <span className="gd-collect-text1" >购物车</span>
                            </a>
                            <div className="gd-collect-sx"></div>
                            <button className="gd-collect-btn1 addcar" onClick={this.addCart}>加入购物车</button>
                            <button className="gd-collect-btn1 btn2">立即购买</button>
                        </div>
                    </div>
                </div>
            )
    }
}

const initMapStateToProps = state=>({
    goods:state.goods,
    allCount:state.allGoods
});

const initMapDispatchToProps = dispatch=>({
    getGoods:(val) => dispatch({type:GET_GOODS,payload:val}),
    getAllGoods:() => dispatch({type:GET_COUNT})
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Detail);