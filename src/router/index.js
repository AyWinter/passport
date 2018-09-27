import Home from '@/components/Home'
import SignIn from '@/components/account/SignIn'
import ProductList from '@/components/product/List'
import ProductDetail from '@/components/product/Detail'
import ProductPublish from '@/components/product/publish'
import ProductResult from '@/components/product/Result'
import ProductAuction from '@/components/product/Auction'
import ProductBond from '@/components/product/Bond'
import BondAgreement from '@/components/agreement/Bond'
import ProductBidJoinUser from '@/components/product/BidJoinUser'
import ShopcartIndex from '@/components/shopcart/Index'
import OrderConfirm from '@/components/order/Confirm'
import PaymentIndex from '@/components/payment/Index'
import SearchIndex from '@/components/search/Index'
import WechatAuth from '@/components/wechat/Auth'
import Register from '@/components/account/Register'
import ResistAgreement from '@/components/agreement/Regist'
import RegisterResult from '@/components/account/Result'
import PaymentResult from '@/components/payment/Result'
import Map from '@/components/map/Index'
import UserHome from '@/components/userhome/Index'
import UserHomeOrder from '@/components/userhome/order/Index'
import OrderPicture from '@/components/userhome/order/Picture'
import OrderPictureUpload from '@/components/userhome/order/Upload'
import UserHomeOrderDetail from '@/components/userhome/order/Detail'
import UserInfo from '@/components/userhome/auth/Userinfo'
import UserHomePerson from '@/components/userhome/auth/Person'
import UserHomeCostomer from '@/components/userhome/auth/Customer'
import UserHomeEnterprise from '@/components/userhome/auth/Enterprise'
import UserHomeResult from '@/components/userhome/auth/Result'
import UserHomeProduct from '@/components/userhome/product/Index'
import UserHomeProductOrder from '@/components/userhome/product/Order'
import UserHomeProductDetail from '@/components/userhome/product/Detail'
import UserHomeActivity from '@/components/userhome/activity/Index'
import UserHomeActivityAdd from '@/components/userhome/activity/Add'
import UserHomeBid from '@/components/userhome/bid/Index'
import UserHomeBidResult from '@/components/userhome/bid/BidResult'
import UserHomeBidBond from '@/components/userhome/bid/Refund'
import Publish from '@/components/publish/Index'
import PublishDemand from '@/components/publish/Demand'
import PublishDemandResult from '@/components/publish/Result'
import ProductBid from '@/components/bid/Index'
import Test from '@/components/Product/Test'
import Damei from '@/components/Damei'
import Position from '@/components/Map'
import FindPassword from '@/components/account/FindPassword'
import Navigation from '@/components/Navigation'
import Favorites from '@/components/userhome/favorites/Index'
import OrderRefund from '@/components/userhome/refund/Index'
import OrderRefundResult from '@/components/userhome/refund/Result'

// 执行单相关
import ExecuteLogin from '@/components/execute/Login'
import ExecuteList from '@/components/execute/list'
import ExecuteDetail from '@/components/execute/detail'


let routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/damei',
    component: Damei
  },
  {
    path: '/sign',
    component: SignIn
  },
  {
    path: '/product/list/',
    component: ProductList
  },
  {
    path: '/product/publish/',
    component: ProductPublish
  },
  {
    path: '/product/detail/:id',
    component: ProductDetail
  },
  {
    path: '/shopcart/index',
    component: ShopcartIndex
  },
  {
    path: '/order/confirm',
    component: OrderConfirm
  },
  {
    path: '/payment/index/:orderNo',
    component: PaymentIndex
  },
  {
    path: '/search/index',
    component: SearchIndex
  },
  {
    path: '/product/result',
    component: ProductResult
  },
  {
    path: '/product/auction/:id',
    component: ProductAuction
  },
  {
    path: '/product/bond/:id',
    component: ProductBond
  },
  {
    path: '/agreement/bond',
    component: BondAgreement
  },
  {
    path: '/wechat/auth/:id(\\d+)?',
    component: WechatAuth
  },
  {
    path: '/regist',
    component: Register
  },
  {
    path: '/agreement/regist',
    component: ResistAgreement
  },
  {
    path: '/regist/result',
    component: RegisterResult
  },
  {
    path: '/payment/result',
    component: PaymentResult
  },
  {
    path: '/map/index',
    component: Map
  },
  {
    path: '/userhome',
    component: UserHome
  },
  {
    path: '/userhome/order/:payState',
    component: UserHomeOrder
  },
  {
    path: '/userhome/order/detail/:orderNo',
    component: UserHomeOrderDetail
  },
  {
    path: '/userhome/userinfo',
    component: UserInfo
  },
  {
    path: '/favorites',
    component:Favorites
  },
  {
    path: '/userhome/person',
    component: UserHomePerson
  },
  {
    path: '/userhome/customer',
    component: UserHomeCostomer
  },
  {
    path: '/userhome/enterprise',
    component: UserHomeEnterprise
  },
  {
    path: '/userhome/result',
    component: UserHomeResult
  },
  {
    path: '/userhome/product',
    component: UserHomeProduct
  },
  {
    path: '/userhome/product/detail/:id',
    component: UserHomeProductDetail
  },
  {
    path: '/userhome/activity',
    component: UserHomeActivity
  },
  {
    path: '/userhome/activity/add',
    component: UserHomeActivityAdd
  },
  {
    path: '/userhome/product/order',
    component: UserHomeProductOrder
  },
  {
    path: '/userhome/bid',
    component: UserHomeBid
  },
  {
    path: '/userhome/bid/result',
    component: UserHomeBidResult
  },
  {
    path: '/userhome/bid/bond',
    component: UserHomeBidBond
  },
  {
    path: '/publish',
    component: Publish
  },
  {
    path: '/publish/demand',
    component: PublishDemand
  },
  {
    path: '/publish/demand/result',
    component: PublishDemandResult
  },
  {
    path: '/product/bidJoinUser/:productId',
    component: ProductBidJoinUser
  },
  {
    path: '/product/bid',
    component: ProductBid
  },
  {
    path: '/product/test',
    component: Test
  },
  {
    path: '/position',
    component: Position
  },
  {
    path: '/findPassword',
    component: FindPassword
  },
  {
    path: '/navigation',
    component: Navigation
  },
  {
    path: '/execute/login',
    component: ExecuteLogin
  },
  {
    path: '/execute/list',
    component: ExecuteList
  },
  {
    path: '/execute/detail/:executeId',
    component: ExecuteDetail
  },
  {
    path: '/order/picture/:orderNo',
    component: OrderPicture
  },
  {
    path: '/order/picture/upload/:scheduleNumber',
    component: OrderPictureUpload
  },
  {
    path: '/order/refund/result',
    component: OrderRefundResult
  },
  {
    path: '/order/refund/:orderNo',
    component: OrderRefund
  }
]

export default routes;
