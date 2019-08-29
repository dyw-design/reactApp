import React from 'react';
import './Cart.css';
import {NavBar, Icon, ListView, SwipeAction} from 'antd-mobile';
import {GET_GOODS} from "../../store/types";
import {connect} from "react-redux";
const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

class Cart extends React.Component{
    
    state = {
        goodsItem:[]
    }
    componentDidMount() {
        let goods = this.props.goods;
        let goodsItem = this.state.goodsItem;
        for(let i = 0;i<goods.length;i++){
            Cart.axios({
                url:`/mock/${goods[i].dataName}/${goods[i].id}`
            }).then(res=>{
                // this.state.goods.push(res.data.data)
                this.setState({
                    goods:goodsItem.push(res.data.data)
                })
            }
            )
        }
    }
    render() {
        // console.log(this.props)
        // console.log(this.state.goods)
        let goods = this.props.goods;
        // console.log(goods);
        return (
            <div className="cart">
                <div className="near-box">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                        rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                            <Icon key="1" type="ellipsis" />,
                        ]}
                        style={{zIndex:999,position:"fixed",top:0,left:0,right:0,borderBottom:"1px solid F9F9F9"}}
                    >购物车</NavBar>
                    <div className="shop-cart-bigbox">
                        <div className="cart-title">选择你的收获地点</div>
                        <div className="cart-title">收货时间 <i>今天30分钟可送达(可预订)</i></div>
                        <div className="shop-cart-listbox1">
                            {
                                this.state.goodsItem.map((item,index)=>(
                                    <SwipeAction
                                        key={index}
                                        style={{ backgroundColor: 'gray',zIndex:-1}}
                                        autoClose
                                        right={[
                                            {
                                                text: ' 取 消 ',
                                                onPress: () => console.log('cancel'),
                                                style: { backgroundColor: '#399', color: 'white',padding:'0 15px' },
                                            },
                                            {
                                                text: ' 删 除 ',
                                                onPress: () => console.log('delete'),
                                                style: { backgroundColor: '#F4333C', color: 'white',padding:'0 15px' },
                                            },
                                        ]}
                                        onOpen={() => console.log('global open')}
                                        onClose={() => console.log('global close')}
                                    >
                                        <div className="index-goods">
                                <span className="shop-cart-check2">
                                    <input onChange={()=>{}} type="checkbox" name="sub2"
                                           className="shopcart-input1 btn2"/></span>
                                            <span className="index-goods-img">
                                    <img src={item.img ? item.img : item.banner }/></span>
                                            <div className="index-goods-textbox">
                                                <span className="index-goods-text1">{item.title}</span>
                                                <div className="index-goods-text2">￥<i className="priceJs">{item.price}</i></div>
                                                <div className="shop-cart-box3">
                                                    <span className="shop-cart-subtract"></span>
                                                    <input onChange={(ev)=>{}} type="number" size="4" value={goods[index].num} id="tb_count" className="shop-cart-numer" />
                                                    <span className="shop-cart-add"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwipeAction>
                                )
                                )
                            }
                        </div>
                    </div>
                    <div className="shop-cart-total">
                        <label className="checkall">
                            <span className="shop-cart-check1"><input onChange={()=>{}} type="checkbox" className="" id="ckAll"/></span>
                            全选
                        </label>
                        <span className="scart-total-text2">合计：￥</span>
                        <span id="AllTotal" className="scart-total-text3">0.00</span>
                        <a className="scart-total-text4">去结算<i id="selectedTotal"></i></a>
                        <span className="delete hide"></span>
                    </div>
                </div>
            </div>
        )
    }
}
const initMapStateToProps = state=>({
    goods:state.goods,
});

const initMapDispatchToProps = dispatch=>({
    // getGoods:(val) => dispatch({type:GET_GOODS,payload:val})
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Cart);