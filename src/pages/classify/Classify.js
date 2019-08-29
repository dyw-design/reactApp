import React from 'react';
import './Classify.css';
import {connect} from 'react-redux';
import {GET_SCROLL} from '../../store/types'
class Classify extends React.Component{
    
    state = {
        goodsMenu : ['热销水果','热带水果','国外进口','今日热销','水果大王'],
        currentIndex : 0,
        lists:[],
        isShow:true,
        top:1
    };
    
    changeMenu = (index)=>{
        this.setState({
            currentIndex:index
        })
        // console.log(ev.target);
    };
    changeStyle = (index)=>{
        return index === this.state.currentIndex ? 'menu-active' : 'menu-unActive';
    };
    changeDisplay = (index)=>{
        return index === this.state.currentIndex ? 'goods-display' : 'goods-hide';
    };
    
    componentDidMount() {
        Classify.axios({
            url: `/mock/list?goodsList=${this.state.currentIndex}&menuLen=${this.state.goodsMenu.length}`
        }).then(res=>{
            this.setState({
                lists:res.data.data
            })
        })
        window.scrollTo(0,this.props.scrollTop)
    }

    clickHandler=(id,dataName,ev)=>{
        // console.log('clickHandler',id, dataName, ev)
        this.props.history.push({
            pathname:'/detail/'+id,
            search:'?dataName='+dataName
        })
    };
    render() {
        let goodsMenu = this.state.goodsMenu;
        let lists = this.state.lists;
        let that = this;
        return (
            <div className="classify">
                <div className="menu-left">
                    <ul>
                        {
                            goodsMenu.map((item,index) => (
                            <li key={index} onClick={this.changeMenu.bind(null,index)} className={that.changeStyle(index)}>{item}</li>
                            )
                            )
                        }
                    </ul>
                </div>
                <div className="content-right">
                    <div className="nav-top">
                        <span>综合排序</span>
                        <span >按价格</span>
                        <span onClick={(ev)=>{this.state.isShow ? this.refs.allClassify.style.display='block' : this.refs.allClassify.style.display='none';this.setState({isShow:!this.state.isShow});this.state.isShow ? ev.target.style.color = 'orange' : ev.target.style.color = "#666";}}>分类</span>
                    </div>
                    <ol className="allClassify" ref="allClassify">
                        <li>全部分类</li>
                        <li>进口水果</li>
                        <li>国产水果</li>
                        <li>柑橘橙柚</li>
                        <li>国产水果</li>
                        <li>进口水果</li>
                    </ol>
                    {
                        goodsMenu.map((item,index)=>(
                        <ul className={that.changeDisplay(index)} key={index} ref="re">
                            {lists.map((item,i) => (
                                <li key={i}>
                                    <img src={item.img} alt="" onClick={this.clickHandler.bind(null,item.id,'list')}/>
                                    <div className="content-des">
                                        <p>{item.title}...{index}</p>
                                        <div className="content-opt">
                                            <span>￥{item.price}</span>
                                            <p><i>-</i><b>0</b><i>+</i></p>
                                        </div>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                        )
                        )
                    }
                </div>
            </div>
        )
    }
}
const initMapStateToProps = state=>({
    scrollTop:state.scrollTop
});

const initMapDispatchToProps = dispatch=>({
    tScroll:(val) => dispatch({type:GET_SCROLL,payload:val}),
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Classify);