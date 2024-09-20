import React from "react";
import EventSignUp from "./eventSignUp";
import EventRequest from "./eventRequest";
import  AmbassadorInterest from "./ambassadorIntrest";
import WholesaleInterest from "./wholesaleInterest";
import AmbassadorSignUp from "./ambassadorSignup";
import { BrowserRouter as Routes, Route,Switch } from "react-router-dom";
import Landing from "./Landing";
import Science from "./Science";
import Coming from "./Coming";
import Preorder from "./Preorder";
import Order from "./Ambassdor";
import Career from "./career";
import Signup from "./Signup";
import Signinone from "./Signinone";
import Signintwo from "./Signintwo";
import Signinthree from "./Signinthree";
import Login from "./Login";
import Fyr from "./Fyr";
import Reset from "./Reset";
import ConfirmPage from "./ConfirmPage";
import OnScreenPopup from "./onScreenPopup";
import Account from "./account";
import ProductEditPage from "./ProductEditPage";
import ProductListPage from "./ProductListPage";
import OrderListPage from "./OrderListPage";
import UserListPage from "./UserListPage";
import UserEditPage from "./UserEditPage";
// import ComingSoon from "./comingSoon"
// import Read from './grid';
import Tab3 from "../components/Tab3";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import Tab4 from "../components/Tab4";
import Tab5 from "../components/Tab5";
import Bloomer from "./Bloomer";
// import Products from './products';
import Allproduct from "../components/allproduct";
import ProductDesc from "../components/productdesc";
import Cart from "../components/cart";
import QuickAdd from "../components/quikadd";
import Shipping from "../components/Shipping";
import Payment from "../components/payment";
import YourOrder from "../components/yourorder";
import Confirmorder from "../components/confirmorder";
import AddToCart from "../components/addtocart";
import LoginShop from "../components/loginshop";

import Subscription from "../components/subscription";

import Billing from "../components/billing";

import Orders from "../components/order";

import Rewards from "../components/reward";

import Refer from "../components/refer";


import ContactUs from "./contactus";
import Ambassadorlist from "./Ambassadorlist";
import Contactlist from "./contactlist";
import ShippingGuest from "./ShippingGuest";
import PaymentGuest from "./paymentGuest";
import SummaryGuest from "./SummaryGuest";
import Topaid from "./Topaid";
import Unsubscibesurveylist from "./unsubscribesurveylist";
import Subscriptionlist from "./subscriptionlist";
import Pkstudy from "./pkstudy";
import UnpaidOrders from "./UnpaidOrders";
import Kevin from './kevinblog';
import TermsOfService from "./TermsOfServicePg";
import IntermittentFasting from "./IntermittentFasting";
import ContactDetailGuest from "./Contactdetailguest";
import ContactDetail from "./Contactdetails";
import KetonSaltvsKetonEster from "./ketonSaltvsKetonEster";

import PrivacyPolicy from "./privacyPolicy";
import Discount from "./DiscountPage";
import VeteranList from "./veteransList";
import EmployeeList from './EmployeeList';
import CouponEditPage from "./couponeditpage";
import CouponCreatingPage from "./couponcreatingpage";
import CouponListPage from "./couponlistpage";
import pageNotFound from "./pageNotFound";
import SetPwd from "./setPassword";
import RefundPolicy from "./Refundpolicy";
import EditShippingPrice from "./Editshippingprice";
import Ambassdoredit from "./ambassdoredit";
import Ambassdorstestimoniallist from "./ambassdorstestimoniallist";
import Ambassdorcreate from "./ambassdortestimonialcreatepage";
import NewsCreatePage from "./NewsCreatePage";
import NewsEditPage from "./NewsEditPage";
import NewsInfoList from "./newsinfolist"
import ShopLanding from "./shoplanding";
import RatingReviewAdmin from "./RatingReviewAdmin";
import RedirectExternal from "./externalRedirect"
import Sitemap from "./sitemap";
import LogList from "./LogList";
import LogViewer from "./LogViewer";
// import ComingSoon from './comingSoon';


const externalRedirects = {
  // Define your route-URL mappings here
  '/contact-us': 'https://blog.tectonlife.com/contact-us/',
  '/science': 'https://blog.tectonlife.com/science/',
'/science/Pkstudy':'https://blog.tectonlife.com/pk-study/',
'/science/KetonesandConcussions':'https://blog.tectonlife.com/can-ketones-help-mitigate-concussions/',
'/true-purpose':'https://blog.tectonlife.com/true-purpose/',
'/science/ketonesandsugar':'https://blog.tectonlife.com/are-ketones-better-than-glucose-as-an-energy-source/',
'/science/ketoneSaltvsKetoneEster':'https://blog.tectonlife.com/ketone-salts-vs-ketone-esters/',
'/science/WhatCanYouDrinkDuringIntermittentFasting':'https://blog.tectonlife.com/what-can-you-drink-during-intermittent-fasting/',
'/exogenous-ketones':'https://blog.tectonlife.com/benefits-of-exogenous-ketones/',
'/all-products':'https://tectonlife.com/shop/',
}


class Body extends React.Component {
  
  render() {
    return (
      <div className="content">
        <Routes>
          <Switch>
          <Route path="/" exact component={Landing}></Route>
          {Object.keys(externalRedirects).map((routePath) => (
           <Route key={routePath} path={routePath}>
          <RedirectExternal to={routePath} />
        </Route>
          ))}
          <Route path="/sitemap" exact component={Sitemap}></Route>
          <Route path="/account" exact component={Account}></Route>
          <Route path="/shop" exact component={ShopLanding}></Route>
          {/* <Route path='/comingsoon' element={<ComingSoon />}></Route> */}
          <Route path="/pop" exact component={OnScreenPopup}></Route>
          <Route path="/science" exact component={Science}></Route>
          <Route path="/contact-us" exact component={ContactUs}></Route>
          <Route path="/careers" exact component={Career}></Route>
          <Route path="/science/ketonesandsugar" exact component={Bloomer}></Route>
          {/* <Route path="/product/sugar" exact component={Bloomer}></Route> */}
          {/* <Route path='/science/preorder' exact element={<Preorder/>}></Route> */}

          {/* <Route path='/science/ambassdor' exact element={<Order/>}></Route> */}

          {/* <Route path='/science/be-great' exact element={<Tab1/>}></Route> */}

          <Route path="/admin/editAmbassdorTestimonial/:id" exact component={Ambassdoredit}></Route>
<Route path="/admin/AmbassdorsTestimonialList" exact component={Ambassdorstestimoniallist}></Route>
<Route path="/admin/createAmbassadorTestimonial" exact component={Ambassdorcreate}></Route>
<Route path="/admin/createnews" exact component={NewsCreatePage}></Route>
<Route path="/admin/editnews/:id" exact component={NewsEditPage}></Route>
<Route path="/admin/news" exact component={NewsInfoList}></Route>
         
<Route path="/event-sign-up" exact component={EventSignUp}></Route>
<Route path="/ambassador-event-signup" exact component={AmbassadorSignUp}></Route>
<Route path="/event-requests" exact component={EventRequest}></Route>
<Route path="/ambassador-interest" exact component={ AmbassadorInterest}></Route>
<Route path="/wholesale-interest" exact component={WholesaleInterest}></Route>

          <Route path="/coming" exact component={Coming}></Route>
          <Route path="/termsOfService" exact component={TermsOfService}></Route>
          <Route path="/setpassword" exact component={SetPwd}></Route>
          <Route path="/preorder" exact component={Preorder}></Route>

          <Route path="/ambassador" exact component={Order}></Route>

          <Route path="/be-great" exact component={Tab1}></Route>
          <Route path="/user/confirm/:token" component={ConfirmPage} />
          <Route path="/user/password/reset/:token" component={Reset} />
          <Route path="/science/Pkstudy" exact component={Pkstudy}></Route>
          <Route path="/science/KetonesandConcussions" exact component={Kevin}></Route>
          {/* <Route path='/be-great/preorder' exact element={<Preorder/>}></Route> */}

          {/* <Route path='/be-great/ambassdor' exact element={<Order/>}></Route> */}

          <Route path="/true-purpose" exact component={Tab3}></Route>

          {/* <Route path='/true-purpose/preorder' exact element={<Preorder/>}></Route> */}

          {/* <Route path='/true-purpose/ambassdor' exact element={<Order/>}></Route> */}

          <Route path="/keto-diets" exact component={Tab2}></Route>

          {/* <Route path='/keto-diets/preorder' exact element={<Preorder/>}></Route> */}

          {/* <Route path='/keto-diets/ambassdor' exact element={<Order/>}></Route> */}

          <Route path="/exogenous-ketones" exact component={Tab4}></Route>

          {/* <Route path='/fasting/preorder' exact element={<Preorder/>}></Route> */}

          {/* <Route path='/fasting/ambassdor' exact element={<Order/>}></Route> */}

          <Route path="/fasting" exact component={Tab5}></Route>

          {/* <Route path='/fasting/keto-diets' exact element={<Tab2/>}></Route> */}

          {/* <Route path='/exogenous-ketones/preorder' exact element={<Preorder/>}></Route> */}

          {/* <Route path='/exogenous-ketones/ambassdor' exact element={<Order/>}></Route> */}

          {/* <Route path='/ambassdor/true-purpose' exact element={<Tab3/>}></Route> */}
          {/* 
                    <Route path='/ambassdor/science' exact element={<Science/>}></Route> 

                    <Route path='/ambassdor/contact' exact element={<Preorder/>}></Route>

                    <Route path='/ambassdor/account' exact element={<Preorder/>}></Route>

                    <Route path='/ambassdor/shop' exact element={<Preorder/>}></Route> 
                    
                    <Route path='/preorder/true-purpose' exact element={<Tab3/>}></Route>

                    <Route path='/preorder/science' exact element={<Science/>}></Route> 

                    <Route path='/preorder/contact' exact element={<Preorder/>}></Route>

                    <Route path='/preorder/account' exact element={<Preorder/>}></Route>

                    <Route path='/preorder/shop' exact element={<Preorder/>}></Route> 

                    <Route path='/preorder/ambassdor' exact element={<Order/>}></Route> */}

                    <Route path="/contactdetails" exact component={ContactDetail}></Route>

          <Route path="/contactdetailsguest" exact component={ContactDetailGuest}></Route>

          <Route path="/signinone" exact component={Signinone}></Route>

          <Route path="/signup" exact component={Signintwo}></Route>

          <Route path="/signup/:id" exact component={Signintwo}></Route>

          <Route path="/verify/:id" exact component={Signinthree}></Route>

          <Route path="/Login" exact component={Login}></Route>

          {/* <Route path="/signup" exact component={Signup}></Route> */}

          <Route path="/fyr" exact component={Fyr}></Route>

          {/* <Route path='/reset' exact component={Reset }></Route> */}

          {/* <Route path='/product' exact component={Products}></Route> */}

         
          {/* <Route
							path='/admin/product/:id/edit'
							component={ProductEditPage}
						/>
          <Route
							path='/admin/productlist'
							exact
							component={ProductListPage}
						/> */}
          {/* <Route path="/product" exact component={ProductDesc}></Route> */}

          {<Route path="/cart/:id?" exact component={Cart}></Route>}


          {/* {<Route path="/Login/:id?" exact component={Login}></Route>} */}

          <Route path="/product/:id" exact component={ProductDesc}></Route>
          {/* <Route path="/product/:id" exact component={QuickAdd}></Route> */}
       
          <Route path="/admin/logs" exact component={LogList} />
          <Route path="/admin/logs/:filename" exact component={LogViewer} />
          <Route path="/shipping/:id" exact component={Shipping}></Route>

          <Route path="/shippingguest/:id" exact component={ShippingGuest}></Route>

          <Route path="/order/:id" exact component={Payment}></Route>

          <Route path="/guestorder/:id" exact component={PaymentGuest}></Route>

          <Route path="/Summary/:id" exact component={YourOrder}></Route>

          <Route path="/SummaryGuest/:id" exact component={SummaryGuest}></Route>
          <Route path="/refundpolicy" exact component={RefundPolicy}></Route>
          <Route path="/confirmorder" exact component={Confirmorder}></Route>

          <Route path="/Addtocart" exact component={AddToCart}></Route>

          <Route path="/Log" exact component={LoginShop}></Route>

          <Route path="/subscription" exact component={Subscription}></Route>

          <Route path="/billing" exact component={Billing}></Route>

          <Route path="/order" exact component={Orders}></Route>

          <Route path="/reward" exact component={Rewards}></Route>

          <Route path="/refer" exact component={Refer}></Route>

          
          <Route path="/api/orders/:id/toedit" exact component={Topaid}></Route>
          <Route
          path='/admin/editshippingprice'
          exact
          component={ EditShippingPrice}
        />
          <Route
							path='/admin/productlist'
							exact
							component={ProductListPage}
						/>
						<Route
							path='/admin/productlist/:pageNumber'
							component={ProductListPage}
							exact
						/>
						<Route
							path='/admin/product/:id/edit'
							component={ProductEditPage}
						/>
						<Route
							path='/admin/orderlist'
							component={OrderListPage}
							exact
						/>
						<Route
							path='/admin/orderlist/:pageNumber'
							component={OrderListPage}
							exact
						/>
            <Route
							path='/admin/userlist'
							component={UserListPage}
							exact
						/>
						<Route
							path='/admin/userlist/:pageNumber'
							component={UserListPage}
							exact
						/>
						<Route
							path='/admin/user/:id/edit'
							component={UserEditPage}
						/>

<Route
							path='/admin/ambassadorslist'
							component={Ambassadorlist}
							exact
						/>

<Route
							path='/admin/contactlist'
							component={Contactlist}
							exact
						/>

<Route
							path='/admin/subscriptionlist'
							component={Subscriptionlist}
							exact
						/>

<Route
							path='/admin/unsubscibesurveylist'
							component={Unsubscibesurveylist}
							exact
						/>
            <Route
							path='/admin/unpaidorders'
							component={UnpaidOrders}
							exact
						/>
        
        <Route path="/privacyPolicy" exact component={PrivacyPolicy}></Route>
        <Route path="/science/ketoneSaltvsKetoneEster" exact component={KetonSaltvsKetonEster}></Route>

          <Route path="/science/WhatCanYouDrinkDuringIntermittentFasting" exact component={IntermittentFasting}></Route>
          <Route

              path='/admin/veteranList'

              exact

              component={VeteranList}

            />

             <Route

              path='/admin/employeeList'

              exact

              component={EmployeeList}

            />

 

<Route path="/admin/discount" exact component={Discount}></Route>


<Route path="/admin/editcoupon/:id" component={CouponEditPage} exact />          <Route            path="/admin/createcoupon"            component={CouponCreatingPage}            exact          />          <Route path="/admin/couponlist" component={CouponListPage} exact />
<Route path="/admin/ratingreview" exact component={RatingReviewAdmin} ></Route>
<Route
  component={pageNotFound}
/>
</Switch>
</Routes>
      </div>
    );
  }
}

export default Body;
