
export default {
    bHead:false,
    bFoot:false,
    bLoading:false,
    allGoods:0,
    goods:JSON.parse(localStorage.getItem("goods_item")),
    login:{},
    user:{
        err:1
    },
    scrollTop:0
}