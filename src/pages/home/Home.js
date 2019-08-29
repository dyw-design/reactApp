import React from 'react';
import './Home.css';
import {Carousel, NoticeBar, WhiteSpace} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {NavLink} from 'react-router-dom';
import Loading from "../../components/loading/Loading";
import PubSub from "pubsub-js";
import { GET_SCROLL } from '../../store/types';
let scrollTop = 0
import {connect} from 'react-redux';
console.log(document.getElementById('root'));

document.getElementById('root').onscroll = function(){
    console.log(123);
};
class Home extends React.Component{
    state = {
        glikes:[],
        banners:[],
        imgHeight:200,
        intDiff:parseInt(12000),
        time:null
    }
    constructor(props){
        super(props);
        this.hour = React.createRef();
        this.minute = React.createRef();
        this.second = React.createRef();
    }
  componentWillReceiveProps(nextProps){//props改变时
    if(this.props.location !== nextProps.location){//当前地址不等于目标地址
      window.scrollTo(0,0);//滚动到顶部
    }
  }
  //倒计时总秒数量

  timer = (that)=>{
    let {intDiff} = that.state;
        clearInterval(time)
      var time = setInterval(()=>{
        //   console.log(this)
          var day = 0;
          var hour = 0;
          var minute = 0; 
          var second = 0;
          //时间默认值
          if (intDiff > 0) {
              day = Math.floor(intDiff / (60 * 60 * 24));
              hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
              minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
              second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (minute <= 9)
              minute = '0' + minute;
          if (second <= 9)
              second = '0' + second;
            this.hour.current.innerHTML = '0<s id="h"></s>' + hour + ' ';
            this.minute.current.innerHTML = '<s></s>' + minute + ' ';
            this.second.current.innerHTML = '<s></s>' + second + ' ';
            intDiff--;
      }, 1000);
      this.setState({
          time
      })
  }
    componentDidMount(){
        // this.onload();
        // await Home.axios({
        //     url:'/mock/banner',
        //     params:{_page:1,_limit:3}
        // }).then(res=>{
        //     // console.log(res.data.data);
        //     this.setState(
        //         {
        //             banners:res.data.data
        //         }
        //     )
        // })
        // await Home.axios({
        //     url:'/mock/glike',
        //     params:{_page:1,_limit:6}
        // }).then(
        //         res=> {
        //             this.setState(
        //                 {glikes: res.data.data}
        //             )
        //         }
        //     )
    function getBanner() {
        return axios.get('/mock/banner',{params:{_page:1,_limit:3}});
    }     
    function getGlike() {
        return axios.get('/mock/glike',{params:{_page:1,_limit:6}});
    } 
    axios.all([getBanner(),getGlike()])
    .then(axios.spread((banner,glike)=>{
        this.setState(
            {
                banners:banner.data.data,
                glikes: glike.data.data
            }
        )
        let {sTop} = this.props;
        document.documentElement.scrollTop = sTop;
    }));
        var that = this;
        this.timer(that)
        // window.addEventListener('scroll', this.handleScroll);
     }
     handleScroll=(event)=>{
            //滚动条高度
           console.log(123)
    }
     
    componentWillUnmount() {
        let sTop = document.documentElement.scrollTop;
        this.props.tScroll(sTop);
        clearInterval(this.state.time)
    }

    clickHandler=(id,dataName,ev)=>{
        this.props.history.push({
            pathname:'/detail/'+id, 
            search:'?dataName='+dataName
        })
    };
    
    render() {
        let banner = this.state.banners;
        let bLoading = this.state.bLoading;
        let glikes = this.state.glikes;
        return (
            <div className="home" ref="home">
                {/*轮播图*/}
                <WhiteSpace size="md" />
                <div>
                    <Carousel
                        autoplay={true}
                        infinite
                        dotActiveStyle={{background:"green"}}
                    >
                        {
                            banner.map(item => (
                                <a
                                    key={item.id}
                                    style={{display:'inline-block',width:'100%',height:this.state.imgHeight}}
                                    onClick={this.clickHandler.bind(null,item.id,'banner')}
                                >
                                    <img
                                        src={item.banner}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                    <div className="home-swiper__item__title">
                                        <div>{item.title}</div>
                                        <div>{item.sub_title}</div>
                                    </div>
                                </a>
                            ))
                        }
                    </Carousel>
                </div>
                <WhiteSpace size="md" />
                <div className="aui-flex aui-flex-one">
                    <div className="aui-flex-box"><i className="icon icon-in"></i>最快20分钟送达</div>
                    <div className="aui-flex-box"><i className="icon icon-im"></i>0元起送0元配送</div>
                    <div className="aui-flex-box"><i className="icon icon-il"></i>七天无理由退货</div>
                </div>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    大白菜3元/斤，胡萝卜黄瓜免费送，本店亏本大甩卖，全部两块，全部只要两块
                </NoticeBar>
                <div className="aui-img-ad">
                    <img src="/asserts/img/ad-001.png" alt=""/>
                </div>
                <div className="aui-palace aui-palace-one ">
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-001.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>蔬菜豆制</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-002.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>肉禽蛋</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-003.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>水产海鲜</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-004.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>水果</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-005.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>乳品烘焙</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-006.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>米面粮油</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-007.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>方面素食</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-008.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>酒饮零食</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-009.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>为你心选</h2>
                        </div>
                    </a>
                    <a href="" className="aui-palace-grid">
                        <div className="aui-palace-grid-icon">
                            <img src="/asserts/img/nav-010.png" alt=""/>
                        </div>
                        <div className="aui-palace-grid-text">
                            <h2>邀请有礼</h2>
                        </div>
                    </a>
                </div>
                <div className="divHeight"></div>
                <div className="aui-flex aui-flex-two">
                    <div className="aui-flex-title">
                        <h2>限时抢购</h2>
                    </div>
                    <div className="aui-flex-box clearfix">
                        <div className="time-item">
                            <span className="hour_show" ref={this.hour}>00</span>
                            <em>:</em>
                            <span className="minute_show" ref={this.minute}>00</span>
                            <em>:</em>
                            <span className="second_show" ref={this.second}>00</span>
                        </div>
                    </div>
                    <div className="aui-arrow">
                        <span>更多</span>
                    </div>
                </div>
                <div className="aui-list-theme-box">
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-001.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">海底捞麻辣香锅调味料220g</h3>
                            <span><em>￥</em>21.<i>80</i></span>
                            <p>￥22.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-002.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">中粮家家里脊肉340g限时抢购中</h3>
                            <span><em>￥</em>11.<i>80</i></span>
                            <p>￥12.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-003.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">小白嘴山药大约400g左右限时钱够中</h3>
                            <span><em>￥</em>9.5.<i>80</i></span>
                            <p>￥10.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="divHeight"></div>
                <div className="aui-flex aui-flex-two">
                    <div className="aui-flex-title">
                        <h2>特色专区</h2>
                    </div>
                </div>
                <div className="aui-flow-list">
                    <div className="aui-flex">
                        <div className="aui-flex-box border-r">
                            <div className="aui-news-text">
                                <h2>新品品尝</h2>
                                <p>低头弄莲蓬 莲子清又甜</p>
                            </div>
                            <div className="aui-news-img">
                                <img src="/asserts/img/fl-001.png" alt=""/>
                            </div>
                        </div>
                        <div className="aui-flex-box border-b">
                            <div className="aui-news-text">
                                <h2 style={{color:'#ff3754'}}>7月爆款</h2>
                                <p>8848西瓜 暑假大放价</p>
                            </div>
                            <div className="aui-news-img">
                                <img src="/asserts/img/fl-002.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="aui-flex">
                        <div className="aui-flex-box border-f">
                            <div className="aui-news-text">
                                <h2>绿卡专享</h2>
                                <p>特仑苏绿卡价38元一箱</p>
                            </div>
                            <div className="aui-news-img">
                                <img src="/asserts/img/fl-003.png" alt=""/>
                            </div>
                        </div>
                        <div className="aui-flex-box">
                            <div className="aui-news-text">
                                <h2 style={{color:'#333'}}>晚上吃什么</h2>
                                <p>8848西瓜 暑假大放价</p>
                            </div>
                            <div className="aui-news-img">
                                <img src="/asserts/img/fl-004.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divHeight"></div>
                <div className="aui-ad-img">
                    <img src="/asserts/img/ad-002.png" alt=""/>
                </div>
                <div className="aui-list-theme-box aui-list-theme-one">
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-004.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">农家本地西红柿大约 400g</h3>
                            <span><em>￥</em>21.<i>80</i></span>
                            <p>￥22.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-005.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">农家青菜豆角 大约400g</h3>
                            <span><em>￥</em>11.<i>80</i></span>
                            <p>￥12.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-006.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">小白嘴山药大约400g左右</h3>
                            <span><em>￥</em>9.5.<i>80</i></span>
                            <p>￥10.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="divHeight"></div>
                <div className="aui-ad-img">
                    <img src="/asserts/img/ad-003.png" alt=""/>
                </div>
                <div className="aui-list-theme-box aui-list-theme-one">
                    <a href="
                    " className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-007.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">农家本地西红柿大约 400g</h3>
                            <span><em>￥</em>21.<i>80</i></span>
                            <p>￥22.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-008.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">农家青菜豆角 大约400g</h3>
                            <span><em>￥</em>11.<i>80</i></span>
                            <p>￥12.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-009.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">小白嘴山药大约400g左右</h3>
                            <span><em>￥</em>9.5.<i>80</i></span>
                            <p>￥10.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="divHeight"></div>
                <div className="aui-ad-img">
                    <img src="/asserts/img/ad-004.png" alt=""/>
                </div>
                <div className="aui-list-theme-box aui-list-theme-one">
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-010.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">农家本地西红柿大约 400g</h3>
                            <span><em>￥</em>21.<i>80</i></span>
                            <p>￥22.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-011.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">农家青菜豆角 大约400g</h3>
                            <span><em>￥</em>11.<i>80</i></span>
                            <p>￥12.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                    <a href="" className="aui-list-item">
                        <div className="aui-list-theme-img">
                            <img src="/asserts/img/pd-012.png" alt=""/>
                        </div>
                        <div className="aui-list-theme-message">
                            <h3 className="aui-list-theme-title">小白嘴山药大约400g左右</h3>
                            <span><em>￥</em>9.5.<i>80</i></span>
                            <p>￥10.00</p>
                            <div className="aui-car-icon">
                                <img src="/asserts/img/car.png" alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="aui-sol-list">
                    <div className="aui-flex">
                        <div className="aui-flex-box">
                            <h3>猜你喜欢</h3>
                        </div>
                        <div className="aui-arrow">
                            <NavLink to="/glike"><span>更多</span></NavLink>
                        </div>
                    </div>
                    <div className="aui-list-theme-box aui-list-theme-two">
                        {
                        glikes.map(item=>(
                            <a className="aui-list-item" onClick={this.clickHandler.bind(null,item.id,'glike')} key={item.id}>
                                <div className="aui-list-theme-img">
                                    <img src={item.banner} alt=""/>
                                </div>
                                <div className="aui-list-theme-message">
                                    <h3 className="aui-list-theme-title">{item.title}400g</h3>
                                    <span><em>￥</em>{item.price}<i>.80</i> <em className="line">￥{item.origin_price}.00</em></span>
                                    <div className="aui-car-icon">
                                        <img src="/asserts/img/car.png" alt=""/>
                                    </div>
                                </div>
                            </a>
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const initMapStateToProps = state=>({
    sTop:state.scrollTop
});

const initMapDispatchToProps = dispatch=>({
    tScroll:(val) => dispatch({type:GET_SCROLL,payload:val}),
});

export default connect(initMapStateToProps,initMapDispatchToProps)(Home);