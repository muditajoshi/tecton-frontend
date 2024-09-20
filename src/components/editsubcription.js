import React, { useEffect, useState } from 'react'
import DatalistInput from "react-datalist-input";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "react-datalist-input/dist/styles.css";
import { Link } from 'react-router-dom';
import Shipnow from '../components/shipnow';
import Unsubscribe from '../components/unsuscribe';
import Skiporder from '../components/skiporder';
import Updatesubscription from '../components/updatesubscription';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import Managebilling from '../components/managebilling';
import ManageShipping from '../components/manageshipping';
import OverlayEditSub from "../skeleton/OverlayEditSub";
import { incNumber } from "../actions/cartUpdateActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import "../css/css/editsubscription.css";


function Editsubcription(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [toggle0, setToggle0] = useState(false);
    const [toggle1, setToggle1] = useState(false);
    const [toggle11, setToggle11] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle4, setToggle4] = useState(false);
    const [toggle5, setToggle5] = useState(false);
    const [ferq, setferq] = useState(props.subinterval);
    const [ferq1, setferq1] = useState();
    const [ferq2, setferq2] = useState();
    const [quant, setquant] = useState(props.subqty);
    const [response, setresponse] = useState();
    const [newferq, setnewferq] = useState();
    const [twoweek, settwoweek] = useState();
    const [fourweek, setfourweek] = useState();
    const [sixweek, setsixweek] = useState();
    const [productvalues, setproductvalues] = useState();
    const [pid, setpid] = useState();
    const [state, set_state] = useState(null);
    const [count, setCount] = useState(0);
    const [resqty, setresqty] = useState();
    const [respValues, setRespValues] = useState();
    const [reqfre, setresfre] = useState();
    const [pwait, setPwait] = useState("block");
    const [isActive7, setIsActive7] = useState(false);
    const [isActive0, setIsActive0] = useState(false);
    const mycartupdate = useSelector((state) => state.cartUpdate);
    const [country, setCountry] = useState("United States");
    const [State, setState] = useState(userInfo?.shippingAddress?.state);
    // const [billingstate, setbillingState] = useState();
    const [billingRequired, setbillingRequired] = useState();
    const [billingcountry, setbillingCountry] = useState("United States");
    const [shipping_address, set_shipping_address] = useState();
    const [billing_address, set_billing_address] = useState();
    const [updateAddress, setUpdateAddress] = useState();
    const [updateBillingAddress, setUpdateBillingAddress] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [postalCode, setPostalCode] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [billingPhoneNo, setBillingPhoneNo] = useState();
    const [apt, setApt] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [billingaddress, setbillingAddress] = useState();
    const [billingcity, setbillingCity] = useState();
    const [billingpostalCode, setbillingPostalCode] = useState();
    const [billingphoneNo, setbillingPhoneNo] = useState();
    const [billingapt, setbillingApt] = useState();
    const [billingfirstName, setbillingFirstName] = useState();
    const [billinglastName, setbillingLastName] = useState();
    const [billingState, setbillingState] = useState(userInfo?.billingAddress?.state);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState();
    const [defaultBillingAddress, setDefaultBillingAddress] = useState();
    const [show, setShow] = useState(false);

    const [overlay, setoverlay] = useState();

    const [value, onChange] = useState();
    // console.log(updateAddress)
    // console.log(updateBillingAddress)
 


    
    const config = userInfo.isSocialLogin
        ? {
            headers: {
                Authorization: `SocialLogin ${userInfo.id}`,
            },
        }
        : {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };


    const handleToggle1 = () => {
        setToggle1(pre => !pre)
    }
    const handleToggle11 = () => {
        setToggle11(pre => !pre)
    }
    const handleToggle2 = () => {
        setToggle2(pre => !pre)
    }

    const handleToggle0 = () => {
        setToggle0(pre => !pre)
    }
    const handleToggle5 = () => {
        setToggle5(pre => !pre)
    }
    const shippingDrop = (value) => {
        if (value == "address") {
            handleToggle5();
        }

        if (value == "addAddress") {
            setIsActive7(true);
        } else {
            setIsActive7(false);
        }

    }

    const billingDrop = (value) => {
        if (value == "address") {
            handleToggle0();
        }

        if (value == "addAddress") {
            setIsActive0(true);
        } else {
            setIsActive0(false);
        }

    }
    // const handleToggle4 = () => {
    //     setToggle4(pre => !pre)
    //     axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/${props.subid}/modify`,{
    //         resumeDate:value
    //     },config).then((res)=>{if(res){ if (state?.split(",")[0] !== null && state?.split(",")[1] !== props.subinterval && quant !== null) {
    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
    //             stripeSubscriptionId: props.subid,
    //             priceId: state?.split(",")[0],
    //             stripeItemId: props.siid.toString(),
    //             frequency: state?.split(",")[1],
    //             shippingItemId: props.shippingSiid
    //         }, config).then((res) => {
    //             if (res) {
    //                 axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                     stripeSubscriptionId: props.subid,
    //                     qty: quant,
    //                     stripeItemId: props.siid.toString()
    //                 }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => {
    //                     if (err) {
    //                         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                             stripeSubscriptionId: props.subid,
    //                             qty: quant,
    //                             stripeItemId: props.siid.toString()
    //                         }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => { if (err) { setresqty(true) } })
    //                     }
    //                 })
    //             }
    //         }).catch((err) => { if (err) { setresqty(true) } })
    //     }

    //     if (state?.split(",")[0] !== null && state?.split(",")[1] !== props.subinterval && quant == null) {
    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
    //             stripeSubscriptionId: props.subid,
    //             priceId: state?.split(",")[0],
    //             stripeItemId: props.siid.toString(),
    //             frequency: state?.split(",")[1],
    //             shippingItemId: props.shippingSiid
    //         }, config).then((res) => {
    //             if (res) {
    //                 axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                     stripeSubscriptionId: props.subid,
    //                     qty: quant,
    //                     stripeItemId: props.siid.toString()
    //                 }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => {
    //                     if (err) {
    //                         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                             stripeSubscriptionId: props.subid,
    //                             qty: quant,
    //                             stripeItemId: props.siid.toString()
    //                         }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => { if (err) { setresqty(true) } })
    //                     }
    //                 })
    //             }
    //         }).catch((err) => { if (err) { setresqty(true) } })
    //     }

    //     if (state?.split(",")[0] == null && quant !== null) {

    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //             stripeSubscriptionId: props.subid,
    //             qty: quant,
    //             stripeItemId: props.siid.toString()
    //         }, config).then((res) => { if (res) { window.location.reload(false) } })

    //     }

    //     if (state?.split(",")[1] == props.subinterval && state?.split(",")[0] !== null && quant !== null) {

    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //             stripeSubscriptionId: props.subid,
    //             qty: quant,
    //             stripeItemId: props.siid.toString()
    //         }, config).then((res) => { if (res) { window.location.reload(false) } })

    //     }


    //     if (updateAddress && updateAddress !== "addAddress" && updateAddress !== "address") {
    //         axios
    //             .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
    //                 id: props.mainidd,
    //                 shippingAddress: JSON.parse(updateAddress)
    //             }, config).then((res) => console.log(res))
    //     }

    //     axios
    //         .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
    //             id: props.mainidd,
    //             billingAddress: JSON.parse(updateBillingAddress)
    //         }, config).then((res) => console.log(res))
    //         }}).catch((err)=>{if(err){ if (state?.split(",")[0] !== null && state?.split(",")[1] !== props.subinterval && quant !== null) {
    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
    //             stripeSubscriptionId: props.subid,
    //             priceId: state?.split(",")[0],
    //             stripeItemId: props.siid.toString(),
    //             frequency: state?.split(",")[1],
    //             shippingItemId: props.shippingSiid
    //         }, config).then((res) => {
    //             if (res) {
    //                 axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                     stripeSubscriptionId: props.subid,
    //                     qty: quant,
    //                     stripeItemId: props.siid.toString()
    //                 }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => {
    //                     if (err) {
    //                         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                             stripeSubscriptionId: props.subid,
    //                             qty: quant,
    //                             stripeItemId: props.siid.toString()
    //                         }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => { if (err) { setresqty(true) } })
    //                     }
    //                 })
    //             }
    //         }).catch((err) => { if (err) { setresqty(true) } })
    //     }

    //     if (state?.split(",")[0] !== null && state?.split(",")[1] !== props.subinterval && quant == null) {
    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
    //             stripeSubscriptionId: props.subid,
    //             priceId: state?.split(",")[0],
    //             stripeItemId: props.siid.toString(),
    //             frequency: state?.split(",")[1],
    //             shippingItemId: props.shippingSiid
    //         }, config).then((res) => {
    //             if (res) {
    //                 axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                     stripeSubscriptionId: props.subid,
    //                     qty: quant,
    //                     stripeItemId: props.siid.toString()
    //                 }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => {
    //                     if (err) {
    //                         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //                             stripeSubscriptionId: props.subid,
    //                             qty: quant,
    //                             stripeItemId: props.siid.toString()
    //                         }, config).then((res) => { if (res) { setresqty(true) } }).catch((err) => { if (err) { setresqty(true) } })
    //                     }
    //                 })
    //             }
    //         }).catch((err) => { if (err) { setresqty(true) } })
    //     }

    //     if (state?.split(",")[0] == null && quant !== null) {

    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //             stripeSubscriptionId: props.subid,
    //             qty: quant,
    //             stripeItemId: props.siid.toString()
    //         }, config).then((res) => { if (res) { window.location.reload(false) } })

    //     }

    //     if (state?.split(",")[1] == props.subinterval && state?.split(",")[0] !== null && quant !== null) {

    //         axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
    //             stripeSubscriptionId: props.subid,
    //             qty: quant,
    //             stripeItemId: props.siid.toString()
    //         }, config).then((res) => { if (res) { window.location.reload(false) } })

    //     }


    //     if (updateAddress && updateAddress !== "addAddress" && updateAddress !== "address") {
    //         axios
    //             .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
    //                 id: props.mainidd,
    //                 shippingAddress: JSON.parse(updateAddress)
    //             }, config).then((res) => console.log(res))
    //     }

    //     axios
    //         .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
    //             id: props.mainidd,
    //             billingAddress: JSON.parse(updateBillingAddress)
    //         }, config).then((res) => console.log(res))
    //         }})



       


    // }
    // console.log(state)
    // console.log(props.subqty)
    // console.log(quant)
    if(state?.split(",")[1] === props.subinterval){
     console.log("frequency same")
    }
    if(quant === props.subqty){
        console.log("quantity same")
    }
    const handleToggle4 = () => {
        setToggle4(pre => !pre)
        axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/${props.subid}/modify`,{
            resumeDate:value
        },config).then((res)=>{if(res){ 

            if (state !== null && quant !== props.subqty) {
   if(state?.split(",")[1] == props.subinterval){

    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
        stripeSubscriptionId: props.subid,
        qty: quant,
        stripeItemId: props.siid.toString()
    }, config).then((res) => { if (res) { window.location.reload(false)} })

   }
   if(state?.split(",")[1] !== props.subinterval){
    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
        stripeSubscriptionId: props.subid,
        priceId: state?.split(",")[0],
        stripeItemId: props.siid.toString(),
        frequency: state?.split(",")[1],
        shippingItemId: props.shippingSiid
    }, config).then((res) => {
        if (res) {
            axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
                stripeSubscriptionId: props.subid,
                qty: quant,
                stripeItemId: props.siid.toString()
            }, config).then((res) => { if (res) { window.location.reload(false)} })
        }
    })
   }

              
            }

            if(state == null && quant !== props.subqty){
                axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
                    stripeSubscriptionId: props.subid,
                    qty: quant,
                    stripeItemId: props.siid.toString()
                }, config).then((res) => { if (res) { window.location.reload(false)} })
            }

            if(state !== null && quant == props.subqty ){
                if(state?.split(",")[1] !== props.subinterval){
                    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
                        stripeSubscriptionId: props.subid,
                        priceId: state?.split(",")[0],
                        stripeItemId: props.siid.toString(),
                        frequency: state?.split(",")[1],
                        shippingItemId: props.shippingSiid
                    }, config).then((res)=>{if(res){window.location.reload(false)}})
                }
                if(state?.split(",")[1] == props.subinterval){
                    window.location.reload(false)
                }
            }

            if (state == null && quant == props.subqty) {
                window.location.reload(false);
            }
            


        if (updateAddress && updateAddress !== "addAddress" && updateAddress !== "address") {
            axios
                .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
                    id: props.mainidd,
                    shippingAddress: JSON.parse(updateAddress)
                }, config).then((res) => console.log(res))
        }

        axios
            .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
                id: props.mainidd,
                billingAddress: JSON.parse(updateBillingAddress)
            }, config).then((res) => console.log(res))
            }}).catch((err)=>{if(err){ 

                            if (state !== null && quant !== props.subqty) {
                   if(state?.split(",")[1] == props.subinterval){

                    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
                        stripeSubscriptionId: props.subid,
                        qty: quant,
                        stripeItemId: props.siid.toString()
                    }, config).then((res) => { if (res) { window.location.reload(false)} })

                   }
                   if(state?.split(",")[1] !== props.subinterval){
                    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
                        stripeSubscriptionId: props.subid,
                        priceId: state?.split(",")[0],
                        stripeItemId: props.siid.toString(),
                        frequency: state?.split(",")[1],
                        shippingItemId: props.shippingSiid
                    }, config).then((res) => {
                        if (res) {
                            axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
                                stripeSubscriptionId: props.subid,
                                qty: quant,
                                stripeItemId: props.siid.toString()
                            }, config).then((res) => { if (res) { window.location.reload(false)} })
                        }
                    })
                   }
                
                              
                            }

                            if(state == null && quant !== props.subqty){
                                axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-quantity`, {
                                    stripeSubscriptionId: props.subid,
                                    qty: quant,
                                    stripeItemId: props.siid.toString()
                                }, config).then((res) => { if (res) { window.location.reload(false)} })
                            }

                            if(state !== null && quant == props.subqty ){
                                if(state?.split(",")[1] !== props.subinterval){
                                    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/subscription/edit-subscription-frequency`, {
                                        stripeSubscriptionId: props.subid,
                                        priceId: state?.split(",")[0],
                                        stripeItemId: props.siid.toString(),
                                        frequency: state?.split(",")[1],
                                        shippingItemId: props.shippingSiid
                                    }, config).then((res)=>{if(res){window.location.reload(false)}})
                                }
                                if(state?.split(",")[1] == props.subinterval){
                                    window.location.reload(false)
                                }
                            }
                
                
                            if (state == null && quant == props.subqty) {
                                window.location.reload(false);
                            }

        if (updateAddress && updateAddress !== "addAddress" && updateAddress !== "address") {
            axios
                .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
                    id: props.mainidd,
                    shippingAddress: JSON.parse(updateAddress)
                }, config).then((res) => console.log(res))
        }

        axios
            .put(`${process.env.REACT_APP_PROXY_URL}/api/subscription/update-address`, {
                id: props.mainidd,
                billingAddress: JSON.parse(updateBillingAddress)
            }, config).then((res) => console.log(res))
            }})



       


    }
    if (resqty) {
        window.location.reload(false)
    }
    useEffect(() => {
        setoverlay(<OverlayEditSub />);

        setShow(true);
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/subscription/${props.mainidd}/get-subscription-by-id`, config).then((res) => {
            setresponse(res.data); setTimeout(() => {
                axios.get(`${process.env.REACT_APP_PROXY_URL}/api/products/${props?.productId}`).then((res) => { setShow(false); setproductvalues(res.data); settwoweek(res.data.stripePriceId[0].id); setfourweek(res.data.stripePriceId[1].id); setsixweek(res.data.stripePriceId[2].id); setPwait("none") })
            }, 1000);
        })
    }, [mycartupdate])

    useEffect(() => {
        setRespValues(response?.orderItems[0])
        setDefaultShippingAddress(response?.orderItems[1])
        setDefaultBillingAddress(response?.orderItems[2])
    })

    const dataSource1 = ["United States"];
    const handleOnChange1 = e => {
        const val = e.target.value;
        setCountry("United States");
    };
    // const mycartupdate = useSelector((state) => state.cartUpdate);
    // console.log(mycartupdate)
    let itemsParent = [
        { value1: 'AK', value: 'Alaska' },
        { value1: 'TX', value: 'Texas' },
        { value1: 'AL', value: 'Alabama' },
        { value1: 'AR', value: 'Arkansas' },
        { value1: 'AZ', value: 'Arizona' },
        { value1: 'CA', value: 'California' },
        { value1: 'CO', value: 'Colorado' },
        { value1: 'CT', value: 'Connecticut' },
        { value1: 'DC', value: 'DistrictofColumbia' },
        { value1: 'DE', value: 'Delaware' },
        { value1: 'FL', value: 'Florida' },
        { value1: 'GA', value: 'Georgia' },
        { value1: 'HI', value: 'Hawaii' },
        { value1: 'IA', value: 'Iowa' },
        { value1: 'ID', value: 'Idaho' },
        { value1: 'IL', value: 'Illinois' },
        { value1: 'IN', value: 'Indiana' },
        { value1: 'KS', value: 'Kansas' },
        { value1: 'KY', value: 'Kentucky' },
        { value1: 'LA', value: 'Louisiana' },
        { value1: 'MA', value: 'Massachusetts' },
        { value1: 'MD', value: 'Maryland' },
        { value1: 'ME', value: 'Maine' },
        { value1: 'MI', value: 'Michigan' },
        { value1: 'MN', value: 'Minnesota' },
        { value1: 'MO', value: 'Missouri' },
        { value1: 'MS', value: 'Mississippi' },
        { value1: 'MT', value: 'Montana' },
        { value1: 'NC', value: 'NorthCarolina' },
        { value1: 'ND', value: 'NorthDakota' },
        { value1: 'NE', value: 'Nebraska' },
        { value1: 'NH', value: 'NewHampshire' },
        { value1: 'NJ', value: 'NewJersey' },
        { value1: 'NM', value: 'NewMexico' },
        { value1: 'NV', value: 'Nevada' },
        { value1: 'NY', value: 'NewYork' },
        { value1: 'OH', value: 'Ohio' },
        { value1: 'OK', value: 'Oklahoma' },
        { value1: 'OR', value: 'Oregon' },
        { value1: 'PA', value: 'Pennsylvania' },
        { value1: 'RI', value: 'RhodeIsland' },
        { value1: 'SC', value: 'SouthCarolina' },
        { value1: 'SD', value: 'SouthDakota' },
        { value1: 'TN', value: 'Tennessee' },
        { value1: 'TX', value: 'Texas' },
        { value1: 'UT', value: 'Utah' },
        { value1: 'VA', value: 'Virginia' },
        { value1: 'VT', value: 'Vermont' },
        { value1: 'WA', value: 'Washington' },
        { value1: 'WI', value: 'Wisconsin' },
        { value1: 'WV', value: 'WestVirginia' },
        { value1: 'WY', value: 'Wyoming' }
    ]
    // console.log(itemsParent.filter((vals)=>vals.value1===userInfo?.shippingAddress?.state)[0].value)
    let items = [
        { value1: `${userInfo?.shippingAddress?.state}`, value: itemsParent.filter((vals) => vals?.value1 === userInfo?.shippingAddress?.state)[0]?.value },
        { value1: 'AK', value: 'Alaska' },
        { value1: 'TX', value: 'Texas' },
        { value1: 'AL', value: 'Alabama' },
        { value1: 'AR', value: 'Arkansas' },
        { value1: 'AZ', value: 'Arizona' },
        { value1: 'CA', value: 'California' },
        { value1: 'CO', value: 'Colorado' },
        { value1: 'CT', value: 'Connecticut' },
        { value1: 'DC', value: 'DistrictofColumbia' },
        { value1: 'DE', value: 'Delaware' },
        { value1: 'FL', value: 'Florida' },
        { value1: 'GA', value: 'Georgia' },
        { value1: 'HI', value: 'Hawaii' },
        { value1: 'IA', value: 'Iowa' },
        { value1: 'ID', value: 'Idaho' },
        { value1: 'IL', value: 'Illinois' },
        { value1: 'IN', value: 'Indiana' },
        { value1: 'KS', value: 'Kansas' },
        { value1: 'KY', value: 'Kentucky' },
        { value1: 'LA', value: 'Louisiana' },
        { value1: 'MA', value: 'Massachusetts' },
        { value1: 'MD', value: 'Maryland' },
        { value1: 'ME', value: 'Maine' },
        { value1: 'MI', value: 'Michigan' },
        { value1: 'MN', value: 'Minnesota' },
        { value1: 'MO', value: 'Missouri' },
        { value1: 'MS', value: 'Mississippi' },
        { value1: 'MT', value: 'Montana' },
        { value1: 'NC', value: 'NorthCarolina' },
        { value1: 'ND', value: 'NorthDakota' },
        { value1: 'NE', value: 'Nebraska' },
        { value1: 'NH', value: 'NewHampshire' },
        { value1: 'NJ', value: 'NewJersey' },
        { value1: 'NM', value: 'NewMexico' },
        { value1: 'NV', value: 'Nevada' },
        { value1: 'NY', value: 'NewYork' },
        { value1: 'OH', value: 'Ohio' },
        { value1: 'OK', value: 'Oklahoma' },
        { value1: 'OR', value: 'Oregon' },
        { value1: 'PA', value: 'Pennsylvania' },
        { value1: 'RI', value: 'RhodeIsland' },
        { value1: 'SC', value: 'SouthCarolina' },
        { value1: 'SD', value: 'SouthDakota' },
        { value1: 'TN', value: 'Tennessee' },
        { value1: 'TX', value: 'Texas' },
        { value1: 'UT', value: 'Utah' },
        { value1: 'VA', value: 'Virginia' },
        { value1: 'VT', value: 'Vermont' },
        { value1: 'WA', value: 'Washington' },
        { value1: 'WI', value: 'Wisconsin' },
        { value1: 'WV', value: 'WestVirginia' },
        { value1: 'WY', value: 'Wyoming' }
    ]
    let itemsTwo = [
        { value1: `${userInfo?.billingAddress?.state}`, value: itemsParent?.filter((vals) => vals?.value1 === userInfo?.billingAddress?.state)[0]?.value },
        { value1: 'AK', value: 'Alaska' },
        { value1: 'TX', value: 'Texas' },
        { value1: 'AL', value: 'Alabama' },
        { value1: 'AR', value: 'Arkansas' },
        { value1: 'AZ', value: 'Arizona' },
        { value1: 'CA', value: 'California' },
        { value1: 'CO', value: 'Colorado' },
        { value1: 'CT', value: 'Connecticut' },
        { value1: 'DC', value: 'DistrictofColumbia' },
        { value1: 'DE', value: 'Delaware' },
        { value1: 'FL', value: 'Florida' },
        { value1: 'GA', value: 'Georgia' },
        { value1: 'HI', value: 'Hawaii' },
        { value1: 'IA', value: 'Iowa' },
        { value1: 'ID', value: 'Idaho' },
        { value1: 'IL', value: 'Illinois' },
        { value1: 'IN', value: 'Indiana' },
        { value1: 'KS', value: 'Kansas' },
        { value1: 'KY', value: 'Kentucky' },
        { value1: 'LA', value: 'Louisiana' },
        { value1: 'MA', value: 'Massachusetts' },
        { value1: 'MD', value: 'Maryland' },
        { value1: 'ME', value: 'Maine' },
        { value1: 'MI', value: 'Michigan' },
        { value1: 'MN', value: 'Minnesota' },
        { value1: 'MO', value: 'Missouri' },
        { value1: 'MS', value: 'Mississippi' },
        { value1: 'MT', value: 'Montana' },
        { value1: 'NC', value: 'NorthCarolina' },
        { value1: 'ND', value: 'NorthDakota' },
        { value1: 'NE', value: 'Nebraska' },
        { value1: 'NH', value: 'NewHampshire' },
        { value1: 'NJ', value: 'NewJersey' },
        { value1: 'NM', value: 'NewMexico' },
        { value1: 'NV', value: 'Nevada' },
        { value1: 'NY', value: 'NewYork' },
        { value1: 'OH', value: 'Ohio' },
        { value1: 'OK', value: 'Oklahoma' },
        { value1: 'OR', value: 'Oregon' },
        { value1: 'PA', value: 'Pennsylvania' },
        { value1: 'RI', value: 'RhodeIsland' },
        { value1: 'SC', value: 'SouthCarolina' },
        { value1: 'SD', value: 'SouthDakota' },
        { value1: 'TN', value: 'Tennessee' },
        { value1: 'TX', value: 'Texas' },
        { value1: 'UT', value: 'Utah' },
        { value1: 'VA', value: 'Virginia' },
        { value1: 'VT', value: 'Vermont' },
        { value1: 'WA', value: 'Washington' },
        { value1: 'WI', value: 'Wisconsin' },
        { value1: 'WV', value: 'WestVirginia' },
        { value1: 'WY', value: 'Wyoming' }
    ]

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`, config).then((res) => set_shipping_address(res.data[0]?.shippingAddress))
    }, [mycartupdate])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/address/user`, config).then((res) => set_billing_address(res.data[0]?.billingAddress))
    }, [mycartupdate])

    const [taxError, setTaxError] = useState();
    const [billingTaxError, setBillingTaxError] = useState();

    const submitNewAddress = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_PROXY_URL}/api/avalara/validate-address`, {
            billingAddress: {
              address: address,
    
              city: city,
    
              state: State,
    
              postalCode: postalCode,
    
              firstName: firstName,
    
              lastName: lastName,
    
              email: userInfo?.email,
            },
          }).then(()=>{
            setTaxError("");
            axios
            .post(`${process.env.REACT_APP_PROXY_URL}/api/address/add-address`, {
                shippingAddress: [{
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    state: State,
                    postalCode: postalCode,
                    country: country,
                    address: address,
                    phoneNo: phoneNo,
                    apt: apt,
                    email: userInfo?.email
                }],
            }, config).then((res) => {
                if (res) {
                    dispatch(incNumber())
                    setIsActive7(!isActive7)
                }
            })}).catch((error)=>{
                setTaxError(error?.response?.data?.message);
            })
    }

    const submitNewBillingAddress = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_PROXY_URL}/api/avalara/validate-address`, {
            billingAddress: {
              address: billingaddress,
    
              city: billingcity,
    
              state: billingState,
    
              postalCode: billingpostalCode,
    
              firstName: billingfirstName,
    
              lastName: billinglastName,
    
              email: userInfo?.email,
            },
          }).then(()=>{
            setBillingTaxError("")
            axios
            .post(`${process.env.REACT_APP_PROXY_URL}/api/address/add-address`, {
                billingAddress: [{
                    firstName: billingfirstName,
                    lastName: billinglastName,
                    city: billingcity,
                    state: billingState,
                    postalCode: billingpostalCode,
                    country: billingcountry,
                    address: billingaddress,
                    phoneNo: billingPhoneNo,
                    apt: billingapt,
                    email: userInfo?.email
                }],
            }, config).then((res) => {
                if (res) { dispatch(incNumber()) }
                setIsActive0(!isActive0)
            })}).catch((error)=>{
                setBillingTaxError(error?.response?.data?.message);
            })
    }
    const [selectedTwo,setSelectedTwo]=useState(false)
    const [selectedFour,setSelectedFour]=useState(false)
    const [selectedSix,setSelectedSix]=useState(false)
    useEffect(()=>{
        if(props.subinterval==="2 weeks"){
            setSelectedTwo(true)
        }
        if(props.subinterval==="4 weeks"){
            setSelectedFour(true)
        }
        if(props.subinterval==="6 weeks"){
            setSelectedSix(true)
        }
    },[])
    
    console.log(new Date())
   
console.log(value?.toLocaleDateString())

    return (
        <div className="popup-box-quick" style={{fontFamily:"aktiv"}}>
            {show ? overlay : <></>}
            {/* <aside className='login' > */}
            <div className="box-quick">
                <div class="all-product">

                    <div class="container">
                        <div class=" cont-act-for ">
                            <div class="row">
                                <div class="m-acc">
                                    <h3 class="edit-sub-heading" style={{ float: "left" }} ><b>Modify your Subcription</b></h3>
                                    <span className="close-icon" onClick={() => props.close()} > x</span></div>
                            </div>
                           
                            
                        </div>
                        <hr  />
                        <div class="row" style={{ display: 'flex' }}>
                            <div class="edit-new-sub"
                                style={{ textAlign: "left", width: "20%" }}>
                                <img
                                    style={{ width: "100%", height: "90%" }}
                                    src={productvalues?.image} />
                            </div>&nbsp;
                            <div class="product-great-sub" style={{ width: "40%", textAlign: "left" }}>
                                <h6><b>{productvalues?.name}</b></h6><br />
                            </div>
                        </div>

                        <div class="row">
                            <div class="quantity-delivery" style={{ display: "flex" }}>
                                <div className='quantity-editsub' style={{ textAlign: "left", width: "55%", color: "#757575" }} >
                                   <div>Quantity</div> 
                                    <div  >
                                        <button class="edit-sub-quantity" style={{ paddingTop: "7px" }}>
                                            {" "}
                                            <span
                                                style={{ cursor: "pointer", border: "none", display: quant < 2 ? 'none' : '' }}
                                                disabled={quant === 1}

                                                onClick={() => setquant(quant - 1)}
                                            >
                                                {" "}
                                                <FontAwesomeIcon icon={faAngleLeft} style={{ color: "black", paddingRight: "7px", fontSize: "13px" }} />
                                            </span>{" "}
                                            {quant}
                                            <span
                                                onClick={() => setquant(quant + 1)}
                                                style={{ cursor: "pointer", border: "none" }}

                                            >
                                                <FontAwesomeIcon icon={faAngleRight} style={{ color: "black", paddingLeft: "7px", fontSize: "13px" }} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <br />
                                <div className='delivery-every-week-desktop' style={{ color: "#757575",  width: "50%" }}>
                                    <div style={{textAlign:"right"}}>Shipped Every</div>
                                    <div style={{  paddingBottom: "10px",textAlign:"right" }}>
                                        <div className='frqncy'>
                                            <button className='frqncy' style={selectedTwo ? {color:'orange',border:"1px solid orange"} : {color:"black"}} onClick={()=>{setSelectedTwo(true);setSelectedFour(false);setSelectedSix(false);set_state(`${twoweek},2 weeks`)}}> 2 Weeks</button><button className='frqncy' style={selectedFour ? {color:'orange',border:"1px solid orange"} : {color:"black"}} onClick={()=>{setSelectedFour(true);setSelectedTwo(false);setSelectedSix();set_state(`${fourweek},4 weeks`)}}>4 Weeks </button><button className='frqncy' style={selectedSix ? {color:'orange',border:"1px solid orange"} : {color:"black"}} onClick={()=>{setSelectedSix(true);setSelectedTwo(false);setSelectedFour(false);set_state(`${sixweek},6 weeks`)}}>6 Weeks</button>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                  </div>
                                  <div className='delivery-every-week-mobile' style={{ color: "#757575", textAlign: "left",paddingTop:"5px" ,paddingBottom:"5px"}}>
                                    Shipped Every
                                    <div style={{ display: "flex", paddingBottom: "10px" }}>
                                    <div className='frqncy'>
                                            <button className='frqncy' style={selectedTwo ? {color:'orange',border:"1px solid orange"} : {color:"black"}} onClick={()=>{setSelectedTwo(true);setSelectedFour(false);setSelectedSix(false);set_state(`${twoweek},2 weeks`)}}> 2 Weeks</button><button className='frqncy' style={selectedFour ? {color:'orange',border:"1px solid orange"} : {color:"black"}} onClick={()=>{setSelectedFour(true);setSelectedTwo(false);setSelectedSix();set_state(`${fourweek},4 weeks`)}}>4 Weeks </button><button className='frqncy' style={selectedSix ? {color:'orange',border:"1px solid orange"} : {color:"black"}} onClick={()=>{setSelectedSix(true);setSelectedTwo(false);setSelectedFour(false);set_state(`${sixweek},6 weeks`)}}>6 Weeks</button>
                                        </div>
                                    </div>
                                    </div>
                                    {/* <div class="dropdown-container"  >
                                        <select onChange={(e) => set_state(e.target.value)} className="edit-sub-quantity"
                                            style={{
                                                padding: "7px 10px 7px 10px",
                                                border: " 1px solid #75757575",
                                                borderRadius: "5px"
                                                , fontSize: "13px"
                                            }}>
                                            <option value={null} disabled selected>Change the frequency</option>
                                            <option value={JSON.parse(JSON.stringify([twoweek, "2 weeks"]))}>2 weeks</option>
                                            <option value={JSON.parse(JSON.stringify([fourweek, "4 weeks"]))}>4 weeks</option>
                                            <option value={JSON.parse(JSON.stringify([sixweek, "6 weeks"]))}>6 weeks</option>
                                        </select>
                                    </div> */}
                               
                            
                                {/* <div className='next-shipment' style={{ width: "39%" }}>
                                    Next Shipment By
                                    <div >
                                        <input className='skip-date' type="date">
                                        </input>
                                    </div>
                                </div> */}
                           
                        <div class="row">
                            <div className='skip-message' >
                                <FontAwesomeIcon icon={faExclamationCircle} style={{ color: "#08b608", fontSize: "18px", paddingRight: "4px" }} />  To reschedule the shipment, choose a date
                            </div>
                            <div>
                                <Calendar value={value} onChange={onChange} calendarType={"US"} tileDisabled={({date, view }) => date < new Date()} />
                            </div>
                        </div>
        
                        <div class="row">
                            <div className='shipping-subscription-new-design'>
                                <div className='shipping-name' style={{ textAlign: "left", color: "#757575" ,paddingTop:"10px"}}>
                                    Shipping
                                </div>
                                <div className="shipping-subscription-address" style={{ height: "120%", textAlign: "left" }}>
                                    <select style={{color:"black"}} onChange={(e) => { shippingDrop(e.target.value); setUpdateAddress(e.target.value) }} style={{ height: "67%", borderColor: "#75757575", padding: "7px 5px 7px 5px", borderRadius: "5px", width: "100%" }}>

                                        <option style={{ backgroundColor: "white" }} value={`${defaultShippingAddress?.address},  ${defaultShippingAddress?.apt},  ${defaultShippingAddress?.city},  ${defaultShippingAddress?.state}, ${defaultShippingAddress?.country}, ${defaultShippingAddress?.postalCode}`} >{defaultShippingAddress?.address},  {defaultShippingAddress?.apt ? (<>{defaultShippingAddress?.apt},</>) : (<></>)}  {defaultShippingAddress?.city},  {defaultShippingAddress?.state}, {defaultShippingAddress?.country}, {defaultShippingAddress?.postalCode}</option>
                                        {shipping_address?.map((value) => <>{
                                            <option value={JSON.stringify(value)}>
                                                {value?.address},{value?.apt},{value?.city},&nbsp;&nbsp;
                                                {value?.state},{value?.country},{value?.postalCode}
                                            </option>
                                        }</>)}
                                        <option onClick={(e) => shippingDrop("addAddress")} value={"addAddress"}>Add an Address</option>
                                        <option onClick={(e) => shippingDrop("address")} value={"address"}>Manage Addresses</option>
                                    </select>
                                </div>
                            </div>
                            <div className="accordion-content-shipping">
                                <div className='add-address-billing'>
                                    {toggle5 && <ManageShipping close={() => setToggle5(false)} />}
                                </div>
                                <br />
                                {isActive7 && <div class="detail-ship-billing" >
                                    <br />
                                    <form onSubmit={submitNewAddress}>
                                        <div className='bill-input-fields'>
                                            <div class="col-cvv" >
                                                <input
                                                    required

                                                    type="text"
                                                    class="form-control-ship-exp-bill-ship-edit-shipping "
                                                    placeholder="First Name"
                                                    id="fname"
                                                    name="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}

                                                />
                                                <input
                                                    required

                                                    type="text"
                                                    class="form-control-ship-exp-bill-ship-edit-shipping "
                                                    placeholder="Last Name"
                                                    id="fname"
                                                    name="lastName"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}

                                                />
                                            </div>
     {/* added phone no field */}
     <div class="col">
                                                <input
                                                    required
                                                    type="text"
                                                    class="form-control-ship-bill-ship "
                                                    placeholder="Phone Number"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={phoneNo}
                                                    onChange={(e) => setPhoneNo(e.target.value)}

                                                />
                                            </div>
                                            <div class="col">
                                                <input
                                                    required
                                                    type="text"
                                                    class="form-control-ship-bill-ship "
                                                    placeholder="Street Address"
                                                    id="fname"
                                                    name="address"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}

                                                />
                                            </div>


                                            <div class="col">
                                                <input
                                                    type="text"
                                                    class="form-control-ship-bill-ship  "
                                                    placeholder="Apt #,suite,etc.(optional)"
                                                    id="fname"
                                                    name="apt"
                                                    value={apt}
                                                    onChange={(e) => setApt(e.target.value)}

                                                />
                                            </div>

                                            <div class="col">
                                                <input
                                                    required
                                                    type="text"
                                                    class="form-control-ship-bill-ship  "
                                                    placeholder="City"
                                                    id="fname"
                                                    name="city"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}

                                                />
                                            </div>
                                            <div class="col-state">
                                                <label style={{ fontWeight: "normal", float: "left" }}>State:</label>
                                                <select required class="form-control-ship-bill-ship" onChange={(e) => setState(e.target.value)}>
                                                    {items.map((valuess) => <option value={valuess.value1}>{valuess.value}</option>)}
                                                </select>
                                            </div>
                                            <div class="col">
                                                <input
                                                    required
                                                    class="form-control-ship-bill-ship  "
                                                    placeholder="Zip Code"
                                                    type="text"
                                                    pattern="^\d{5}(?:[-\s]\d{4})?$"
                                                    title="Zip code should be in the valid format"
                                                    name="postalCode"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}

                                                />
                                            </div>
                                            <div class="col-country">
                                                <input
                                                    type="text"
                                                    placeholder="Country"
                                                    class="form-control-ship-bill-ship-country  "
                                                    required={true}
                                                    list="gameList1"
                                                    onChange={handleOnChange1}
                                                    value={country}
                                                />
                                                <datalist id="gameList1">
                                                    {dataSource1.map(item => (
                                                        <option key={item} value={item} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className='bill-cancel' style={{ float: "left" }}>
                                            <span style={{ color: "red", paddingBottom: "10px" }}>
                          {taxError} 
                        </span>
                                                <br/>
                                                <div className='save-button-billing' >
                                                    <button type="submit" style={{ paddingLeft: "20px", paddingTop: "5px", paddingBottom: "3px", paddingRight: "20px", backgroundColor: "orange", fontSize: "15px", border: "none" }} value="" >{isActive7 ? 'SAVE' : ''}</button><br />

                                                </div>
                                                <div className='cancel-button-billing'  > <button style={{ paddingTop: "4px", paddingBottom: "2px", paddingLeft: "14px", paddingRight: "14px", backgroundColor: "white", fontSize: "15px", borderRadius: "20px", border: "1px solid" }} onClick={() => setIsActive7(!isActive7)} type="button" >{isActive7 ? 'CANCEL' : ''}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <br />
                                </div>}
                            </div>
                        </div>
                <br/>
                        <div class="row">
                            <div className='shipping-subscription-new-design' >
                                <div className='shipping-name' style={{ textAlign: "left", color: "#757575" }}>
                                    Billing
                                </div>
                                <div className="shipping-subscription-address" style={{ height: "120%", textAlign: "left" }}>
                                    <select style={{color:"black"}} value={ferq1} onChange={(e) => { billingDrop(e.target.value); setUpdateBillingAddress(e.target.value) }} style={{ height: "67%", borderColor: "#75757575", padding: "7px 5px 7px 5px", borderRadius: "5px", width: "100%" }}>
                                        {defaultBillingAddress?.address && defaultBillingAddress?.city && defaultBillingAddress.state ? (<option style={{ backgroundColor: "white" }} value={`${defaultBillingAddress?.address},  ${defaultBillingAddress?.apt},  ${defaultBillingAddress?.city},  ${defaultBillingAddress?.state}, ${defaultBillingAddress?.country}, ${defaultBillingAddress?.postalCode}`} >{defaultBillingAddress?.address},  {defaultBillingAddress?.apt ? (<>{defaultBillingAddress?.apt},</>) : (<></>)}  {defaultBillingAddress?.city},  {defaultBillingAddress?.state}, {defaultBillingAddress?.country}, {defaultBillingAddress?.postalCode}</option>) : (<option>same as shippingAddress</option>)}
                                        {billing_address?.map((value) => <>{
                                            <option value={JSON.stringify(value)}>
                                                <span >{value?.address},{value?.apt},{value?.city},<br /><br />
                                                    {value?.state},{value?.country},{value?.postalCode}
                                                </span>
                                            </option>
                                        }</>)} <option onClick={(e) => billingDrop("addAddress")} value={"addAddress"}>Add an Address</option>
                                        <option onClick={(e) => billingDrop("address")} value={"address"}>Manage Addresses</option>
                                    </select>
                                </div>
                            </div>
                            <div className="accordion-content-shipping">
                                <div className='add-address-billing'>
                                    {toggle0 && <Managebilling close={() => setToggle0(false)} />}
                                </div>
                                <br />
                                {isActive0 && <div class="detail-ship-billing" >
                                    <br />
                                    <form onSubmit={submitNewBillingAddress}>
                                        <div className='bill-input-fields'>
                                            <div class="col-cvv" >
                                                <input
                                                    required
                                                    type="text"
                                                    class="form-control-ship-exp-bill-ship-edit-shipping "
                                                    placeholder="First Name"
                                                    id="fname"
                                                    name="firstName"
                                                    value={billingfirstName}
                                                    onChange={(e) => setbillingFirstName(e.target.value)}
                                                />
                                                <input

                                                    required
                                                    type="text"
                                                    class="form-control-ship-exp-bill-ship-edit-shipping "
                                                    placeholder="Last Name"
                                                    id="fname"
                                                    name="lastName"
                                                    value={billinglastName}
                                                    onChange={(e) => setbillingLastName(e.target.value)}
                                                />
                                            </div>
 {/* added phone no field */}
 <div class="col">
                                                <input
                                                    required
                                                    type="text"
                                                    class="form-control-ship-bill-ship "
                                                    placeholder="Phone Number"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={billingPhoneNo}
                                                    onChange={(e) => setBillingPhoneNo(e.target.value)}

                                                />
                                            </div>
                                            <div class="col">
                                                <input
                                                    type="text"
                                                    class="form-control-ship-bill-ship "
                                                    placeholder="Street Address"
                                                    id="fname"
                                                    name="address"
                                                    value={billingaddress}
                                                    required
                                                    onChange={(e) => setbillingAddress(e.target.value)}
                                                />
                                            </div>


                                            <div class="col">
                                                <input
                                                    type="text"
                                                    class="form-control-ship-bill-ship  "
                                                    placeholder="Apt #,suite,etc.(optional)"
                                                    id="fname"
                                                    name="apt"
                                                    value={billingapt}
                                                    onChange={(e) => setbillingApt(e.target.value)}
                                                />
                                            </div>

                                            <div class="col">
                                                <input
                                                    type="text"
                                                    class="form-control-ship-bill-ship  "
                                                    placeholder="City"
                                                    id="fname"
                                                    name="city"
                                                    value={billingcity}
                                                    required
                                                    onChange={(e) => setbillingCity(e.target.value)}
                                                />
                                            </div>

                                            <div class="col-s-billing" >
                                                <label style={{ fontWeight: "normal", float: "left" }}>State:</label>
                                                <select required class="form-control-ship-bill-ship" onChange={(e) => setbillingState(e.target.value)}>
                                                    {itemsTwo.map((valuess) => <option value={valuess.value1}>{valuess.value} </option>)}
                                                </select>
                                            </div>
                                            <div class="col">
                                                <input
                                                    class="form-control-ship-bill-ship  "

                                                    placeholder="Zip Code"
                                                    type="text"
                                                    pattern="^\d{5}(?:[-\s]\d{4})?$"
                                                    title="Zip code should be in the valid format"
                                                    name="postalCode"
                                                    value={billingpostalCode}
                                                    required
                                                    onChange={(e) => setbillingPostalCode(e.target.value)}
                                                />
                                            </div>
                                            <div class="col-country">

                                                <input
                                                    type="text"
                                                    placeholder="Country"
                                                    class="form-control-ship-bill-ship-country  "

                                                    required={true}

                                                    list="gameList1"
                                                    onChange={handleOnChange1}
                                                    value={country}
                                                />
                                                <datalist id="gameList1">
                                                    {dataSource1.map(item => (
                                                        <option key={item} value={item} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div className='bill-cancel' style={{ float: "left" }}>
                                            <span style={{ color: "red", paddingBottom: "10px" }}>
                          {billingTaxError}
                        </span>
                        <br/>
                                                <div className='save-button-billing' >
                                                    <button type="submit" style={{ paddingLeft: "20px", paddingTop: "5px", paddingBottom: "3px", paddingRight: "20px", backgroundColor: "orange", fontSize: "15px", border: "none" }} value="" >{isActive0 ? 'SAVE' : ''}</button><br />

                                                </div>
                                                <div className='cancel-button-billing'  > <button style={{ paddingTop: "5px", paddingBottom: "2px", paddingLeft: "14px", paddingRight: "14px", backgroundColor: "white", fontSize: "15px", borderRadius: "20px", border: "1px solid" }} onClick={() => setIsActive0(!isActive0)} type="button" >{isActive0 ? 'CANCEL' : ''}</button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>}
                            </div>
                        </div>
                        <br />
        
                        <div className='modify-update-cancel-desktop'>
                            <div class="row">
                                <div className='cancel-modify ' style={{ display: "flex" }}>
                                    <div style={{ textAlign: "left", width: "50%" }}>
                                        <button onClick={handleToggle2} className='edit' >CANCEL SUBSCRIPTION</button>
                                        {toggle2 && <Unsubscribe subbid={props.subid} pauseitagain={props.pauseit} close={() => setToggle2(false)} />}
                                    </div>
                                    <div style={{ textAlign: "right", width: "50%" }}>
                                        <button onClick={handleToggle4} class="modify" >CONFIRM</button>
                                        {toggle4 && <Updatesubscription close={() => setToggle4(false)} />}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='modify-update-cancel-mobile'>
                            <div class="row">
                                <div className='cancel-modify ' >
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={handleToggle4} style={{ width: "90%",color:"black" }} class="edit-sub-update-button" >CONFIRM</button>
                                        {toggle4 && <Updatesubscription close={() => setToggle4(false)} />}
                                    </div>
                                    <br />
                                    <div style={{ textAlign: "center" }}>
                                        <button onClick={handleToggle2} className='edit-skiporder' style={{color:"black"}} >CANCEL SUBSCRIPTION</button>
                                        {toggle2 && <Unsubscribe subbid={props.subid} pauseitagain={props.pauseit} close={() => setToggle2(false)} />}
                                    </div>


                                </div>
                            </div>
                        </div>

                        {/* <div className='bill-edit'>
                                    Shipping
                                </div> */}
                        <br />
                        {/* <div className='drop-shipping'>
                                    <select onChange={(e) => { shippingDrop(e.target.value); setUpdateAddress(e.target.value) }} style={{ borderColor: "#75757575", padding: "7px 5px 7px 5px", borderRadius: "5px", width: "95%" }}>

                                        <option style={{ backgroundColor: "white" }} value={`${defaultShippingAddress?.address},  ${defaultShippingAddress?.apt},  ${defaultShippingAddress?.city},  ${defaultShippingAddress?.state}, ${defaultShippingAddress?.country}, ${defaultShippingAddress?.postalCode}`} >{defaultShippingAddress?.address},  {defaultShippingAddress?.apt ? (<>{defaultShippingAddress?.apt},</>) : (<></>)}  {defaultShippingAddress?.city},  {defaultShippingAddress?.state}, {defaultShippingAddress?.country}, {defaultShippingAddress?.postalCode}</option>
                                        {shipping_address?.map((value) => <>{
                                            <option value={JSON.stringify(value)}>
                                                {value?.address},{value?.apt},{value?.city},{value?.state},{value?.country},{value?.postalCode}
                                            </option>
                                        }</>)}
                                        <option onClick={(e) => shippingDrop("addAddress")} value={"addAddress"}>Add an Address</option>
                                        <option onClick={(e) => shippingDrop("address")} value={"address"}>Manage Addresses</option>

                                    </select>
                                </div> */}

                        <br />
                        <br />

                        {/* <div className='drop-billing'>
                                    <select value={ferq1} onChange={(e) => { billingDrop(e.target.value); setUpdateBillingAddress(e.target.value) }} style={{ borderColor: "#75757575", padding: "7px 5px 7px 5px", borderRadius: "5px", width: "95%" }}>
                                       
                                        {defaultBillingAddress?.address && defaultBillingAddress?.city && defaultBillingAddress.state ? (<option style={{ backgroundColor: "white" }} value={`${defaultBillingAddress?.address},  ${defaultBillingAddress?.apt},  ${defaultBillingAddress?.city},  ${defaultBillingAddress?.state}, ${defaultBillingAddress?.country}, ${defaultBillingAddress?.postalCode}`} >{defaultBillingAddress?.address},  {defaultBillingAddress?.apt ? (<>{defaultBillingAddress?.apt},</>) : (<></>)}  {defaultBillingAddress?.city},  {defaultBillingAddress?.state}, {defaultBillingAddress?.country}, {defaultBillingAddress?.postalCode}</option>) : (<option>same as shippingAddress</option>)}
                                        {billing_address?.map((value) => <>{
                                            <option value={JSON.stringify(value)}>
                                                {value?.address},{value?.apt},{value?.city},{value?.state},{value?.country},{value?.postalCode}
                                            </option>
                                        }</>)}


                                       
                                        <option onClick={(e) => billingDrop("addAddress")} value={"addAddress"}>Add an Address</option>
                                        <option onClick={(e) => billingDrop("address")} value={"address"}>Manage Addresses</option>
                                    </select>
                                </div> */}

                        <br />
                        <br />
                        {/* <div class="edit-ship" style={{ display: "flex" }}>
                                    <div >
                                        <button onClick={handleToggle1} class="edit-subscription-ship" >Skip Order</button>
                                        {toggle1 && <Skiporder subid={props.subid} close={() => setToggle1(false)} />}
                                    </div>
                                    <div>
                                        <button onClick={handleToggle2} class="edit-subscription-ship" >Unsubscribe</button>
                                        {toggle2 && <Unsubscribe subbid={props.subid} close={() => setToggle2(false)} />}
                                    </div>
                                    <button onClick={handleToggle11} class="edit-subscription-ship"  >Ship now  </button>
                {toggle11 && <Shipnow close={() => setToggle11(false)} />}
                                </div> */}


                        {/* <div class="col-sm-6">
                                <div id="product-2" class="single22-product">

                                    <div class="pro-part11">
                                        <div class="edit-sub-summary-sub" >
                                            <b>Summary</b>
                                        </div>
                                        <br />
                                        
                                        <br/>
                                        <div class="product-k-sub" style={{display:"flex"}} >
                                            <input type="text" style={{ width: "65%" }} class="form-control-ship-exp-cnfm-edit " placeholder="Add a promo code" id="fname" name="fname" />
                                            <input style={{textAlign:"right"}} class="Edit-sub-apply-button" type="submit" value="Apply" ></input>
                                        </div>
<br/>
                                        <div className='edit-subscription-total'  style={{ paddingBottom: "20px", fontWeight: "100" }}>
                                            
                                          <div className='edit-subscription-amount-detail' style={{display:"flex"}}>
                                         < div style={{width:"50%",textAlign:"left"}}>Subtotal</div>
                                    <div style={{width:"50%",textAlign:"right"}}> ${(props?.amtt*props?.subqty).toFixed(2)}</div>
                                          </div>
                                          <div className='edit-subscription-amount-detail' style={{display:"flex"}}>
                                          <div style={{width:"50%",textAlign:"left"}}>Discount</div>
                                          <div style={{width:"50%",textAlign:"right"}}> ${((props?.diss)*((props?.shippingP?((props?.shippingP+props?.amtt)):(props?.amtt))*props?.subqty)).toFixed(2)}</div>
                                          </div>
                                          <div className='edit-subscription-amount-detail' style={{display:"flex"}}>
                                          <div style={{width:"50%",textAlign:"left"}}>Shipping</div>
                                          <div style={{width:"50%",textAlign:"right"}}>${props?.shippingP?(props?.shippingP):("0.00")}</div>
                                          </div>
                                          <div className='edit-subscription-amount-detail' style={{display:"flex"}}>
                                          <div style={{width:"50%",textAlign:"left"}}>Tax</div>
                                          <div style={{width:"50%",textAlign:"right"}}>$00.00</div>
                                          </div>
                                          <div className='edit-subscription-amount-detail' style={{display:"flex"}}>
                                          <div style={{width:"50%",textAlign:"left"}}><h5><b>Total</b></h5></div>
                                          <div style={{width:"50%",textAlign:"right"}}><h5><b>  ${((props?.amtt*props?.subqty)-((props?.diss)*((props?.shippingP?((props?.shippingP+props?.amtt)):(props?.amtt))*props?.subqty))+(props?.shippingP?(props?.shippingP):(0))).toFixed(2)}</b></h5></div>
                                          </div>
                                          <div className='veterans'>
                                          1% of revenues to Nonprofits that work with veterans.
                                          </div>
                                           

                                        </div>
                                        <div className='button-edit-sub' style={{textAlign:"center"}} >
                                            <div  >
                                                <button onClick={handleToggle4} class="edit-sub-update-button" >UPDATE SUBSCRIPTION</button>
                                                {toggle4 && <Updatesubscription close={() => setToggle4(false)} />}
                                            </div>
                                            <div class="ask-add-quick" >
                                                <button class="edit-sub-favorite-button" type="submit" value="" ><a href="/subscription">BACK TO SUBSCRIPTION</a></button>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div> */}

                    </div>


                </div>
            </div>
        </div>

    )
}

export default Editsubcription