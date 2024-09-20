import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OverlayEditSub from "../skeleton/OverlayEditSub";


const Discount = ({history}) => {
useEffect(()=>{
    if(userInfo?.isAdmin===false){
history.push("/")
    }
})
    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
        },
    };


    const [discount, setDiscout] = useState();
    const [discountper, setDiscoutPer] = useState()
    const [user, setUser] = useState()
    const [per, setPer] = useState()
    const [res, setRes] = useState()
    const [error, setError] = useState('');
    const [discountData, setDiscoutData] = useState();
    const [overlay, setoverlay] = useState();
    const [show, setShow] = useState(false);
    const [editDiscountError,setEditDiscountError] = useState();
    const [govxCode,setgovxCode] = useState();
    const [govxCodeui,setgovxCodeui] = useState();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_PROXY_URL}/api/discount/get-all-userType-discount`, config).then((val) => {
                setDiscoutData(val?.data?.discountData[0])
            }
            )


    }, [])
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_PROXY_URL}/api/govxcode/get-govx-code`, config).then((val) => {
            setgovxCodeui(val.data.data)
        }
        )


    }, [])

    const handleChange = event => {
        setDiscoutPer(event.target.value);
        console.log('input :', event.target.value);
        console.log(typeof (event.target.value))
    };

    const handleSelectChange = event => {
        setUser(event.target.value)
        console.log('User Type :', event.target.value);

    }


    const handleSubmit = () =>{
        setoverlay(<OverlayEditSub />);
        setShow(true);
        if (!discountper) {
            setError('Please enter some discount value');
            setShow(false)
          } else if (isNaN(discountper)) {
            setError('Input is not a number');
            setShow(false)
          } else if (discountper < 1 || discountper > 100) {
            setError('Enter Value  between 1 and 100');
            setShow(false)
          }  else if (!/^[0-9]*$/.test(discountper)) {
            setError('Input should be a positive integer');
            setShow(false)
          } 
          
        axios.put(`${process.env.REACT_APP_PROXY_URL}/api/discount/user-type-discount`, {
            userType: user,
            discountPercent: Number(discountper)
        }, config).then((res) => { if(res){
            window.location.reload(false)
        }}).catch((err)=>{if(err){
            setShow(false);
            setEditDiscountError(err.response.data.err)
        }});
    }

    return (
        <>
{show ? overlay : <></>}
            <div className="container mt-5 mt-5">
                <table className="table"><h1 className='productListPage_heading' style={{marginTop:"50px"}}>Current user-type Discounts</h1>
                    <tr>
                        <th>User-type</th>
                        <th>Discount-percentage(%)</th>
                        <th>GovX-code</th>
                    </tr>
                    <tr>
                        <td>
                            Ambassador
                        </td>
                        <td>
                            {discountData?.ambassador?.discountPercent}
                        </td>
                        </tr>
                        <tr>
                        <td>
                            AmbassadorReferral
                        </td>
                        <td>
                        {discountData?.ambassadorReferral?.discountPercent}
                        </td>
                        </tr>
                        <tr>
                        <td>
                            Employee
                        </td>
                        <td>
                        {discountData?.employee?.discountPercent}
                        </td>
                        </tr>
                        <tr>
                        <td>
                            Veteran
                        </td>
                        <td>
                            {discountData?.veteran?.discountPercent}
                        </td>
                        <td>{govxCodeui}</td>
                        </tr>
                        <tr>
                        <td>
                            Test User
                        </td>
                        <td>
                            {discountData?.test?.discountPercent}
                        </td>
                        
                    </tr>
                </table>
                <table className="table" ><h1 className='productListPage_heading'>Edit user-type Discounts</h1>
                    <tr>
                        <th>User Type</th>
                        <th>Discount-percentage(%)</th>
                    </tr>
                    <tr>
                        <td>
                            <select class="form-select" aria-label="Default select example"
                                onChange={handleSelectChange} value={user}>
                                <option selected> Select user</option>
                                <option value="Ambassador" >Ambassador</option>
                                <option value="AmbassadorReferral" >Ambassador Referral</option>
                                <option value="Employee" >Employee</option>
                                <option value="Veteran">Veteran</option>
                                <option value="Test">Test</option>
                            </select>
                        </td>
                        <td> <input type="number" className="form-control"
                            onChange={handleChange} value={discountper} />  </td>
                            <td>{error && <p className="my-auto lead text-danger">{error}</p>} </td>
                        <td> <button onClick={handleSubmit} > confirm </button>
 </td>
                    </tr>
                </table>
                <span style={{color:"red"}}>{editDiscountError}</span>
                {/* edit govs code */}
                <table className="table" ><h1 className='productListPage_heading'>Edit GovX-code</h1>
                    <input type="text" onChange={(e)=>{setgovxCode(e.target.value)}}></input>&nbsp;<button onClick={()=>{setShow(true);
                         axios
                         .put(`${process.env.REACT_APP_PROXY_URL}/api/govxcode/update-govx-code`,{
                            govxCode:govxCode
                        }, config).then((val) => {
                             window.location.reload(false)
                         }
                         )
                    }}> confirm </button>
                </table>
            </div>



        </>
    )
}

export default Discount;