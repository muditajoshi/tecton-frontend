import axios from "axios";
import {
  GET_DISCOUNTS,
  GET_DISCOUNT,
  CREATE_DISCOUNT,
  UPDATE_DISCOUNT,
  DELETE_DISCOUNT,
} from "../constants/discountConstants";

// Get all discounts
export const getDiscounts = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

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
    const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/api/discount/get-all-discount`, config);
    console.log(res)
    dispatch({
      type: GET_DISCOUNTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Get a single discount
export const getDiscount = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

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
    const res = await axios.get(`${process.env.REACT_APP_PROXY_URL}/api/discount/get-discount-by-id`, config);
    dispatch({
      type: GET_DISCOUNT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// Create a discount
export const createDiscount = (formData) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

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
    const res = await axios.post(
      `${process.env.REACT_APP_PROXY_URL}/api/discount/create-discount`,
      formData,
      config
    );
    dispatch({
      type: CREATE_DISCOUNT,
      payload: res.data,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateDiscount = (id, formData) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
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
    const res = await axios.put(
      `${process.env.REACT_APP_PROXY_URL}/api/discount/update-discount/${id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_DISCOUNT,
      payload: res.data,
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Delete a discount
export const deleteDiscount = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

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
    await axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/discount/delete-discount`, {
      ...config,
      data: { id },
    }).then((res)=>{if(res){window.location.reload(false)}});
    dispatch({
      type: DELETE_DISCOUNT,
      payload: id,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
