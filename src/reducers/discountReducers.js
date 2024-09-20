import {
  GET_DISCOUNTS,
  GET_DISCOUNT,
  CREATE_DISCOUNT,
  UPDATE_DISCOUNT,
  DELETE_DISCOUNT,
} from "../constants/discountConstants";

const initialState = {
  discounts: [],
  discount: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DISCOUNTS:
      return {
        ...state,
        discounts: payload,
      };
    case GET_DISCOUNT:
      return {
        ...state,
        discount: payload,
      };
    case CREATE_DISCOUNT:
      return {
        ...state,
        discounts: [payload, ...state.discounts],
      };
    case UPDATE_DISCOUNT:
      return {
        ...state,
        discounts: state.discounts.map((d) =>
          d._id === payload._id ? payload : d
        ),
      };
    case DELETE_DISCOUNT:
      return {
        ...state,
        discounts: state.discounts.filter((d) => d._id !== payload),
        discount: null,
      };
    default:
      return state;
  }
}
