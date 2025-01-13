import axios from "axios";
import { BASEURL } from "../../baseUrl";
import { toast } from "react-toastify";
export const GET_All_BOOK = 'GET_All_BOOK'
export const VIEW_BOOK = 'VIEW_BOOK'
export const ADD_CART = 'ADD_CART'
export const GET_CART = 'GET_CART'
export const REMOVE_CART = 'REMOVE_CART'

const getAllBookAction = (payload) => ({ type: GET_All_BOOK, payload: payload });
const viewBookAction = (payload) => ({ type: VIEW_BOOK, payload: payload });
const addCartAction = (payload) => ({ type: ADD_CART, payload: payload });
const getCartAction = (payload) => ({ type: GET_CART, payload: payload });
const removeCartAction = (payload) => ({ type: REMOVE_CART, payload: payload });

const getAuthHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzgyOThiMjY2ZTA3MzAxNDMwNjEwY2YiLCJpYXQiOjE3MzY3NjY2NjUsImV4cCI6MTczNjc3MDI2NX0.FvH3x-68IXQCXwswiPWQjKb-vnIgwDb8s6crxlXTYcs`

        },
    };
};

export const getAllBook = (payload) => {
    return async (dispatch) => {
        try {
            await axios.get(`${BASEURL}/books/getBooks`, payload).then((res) => {
                dispatch(getAllBookAction(res))
                console.log(res)
            })
        } catch (error) {
            console.log(error)
            dispatch(getAllBookAction(error))
        }
    }
}

export const viewBook = (id) => {
    return async (dispatch) => {
        try {
            await axios.get(`${BASEURL}/books/viewBook/${id}`).then((res) => {
                dispatch(viewBookAction(res))
                console.log(res)
            })
        } catch (error) {
            console.log(error)
            dispatch(viewBookAction(error))
        }
    }
}

export const addCart = (payload) => {
    return async (dispatch) => {
        try {
            const payload1 = JSON.parse(localStorage.getItem("cart")) || []
            const response = await axios.post(`${BASEURL}/cart/addToCart`, payload, getAuthHeaders());
            dispatch(addCartAction(response));
            dispatch(getCart(payload1))
            console.log('res', response);
            return response;
        } catch (error) {
            console.log(error)
            dispatch(addCartAction(error))
        }
    }
}
export const getCart = (payload) => {
    return async (dispatch) => {
        try {
            await axios.post(`${BASEURL}/cart/getCartItems`, payload, {
                headers: {
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzgyOThiMjY2ZTA3MzAxNDMwNjEwY2YiLCJpYXQiOjE3MzY3NjY2NjUsImV4cCI6MTczNjc3MDI2NX0.FvH3x-68IXQCXwswiPWQjKb-vnIgwDb8s6crxlXTYcs`
                }
            }).then((res) => {
                dispatch(getCartAction(res))
                console.log(res)
            })
        } catch (error) {
            console.log(error)
            dispatch(getCartAction(error))
        }
    }
}
export const removeCart = (id) => {
    return async (dispatch) => {
        try {
            const payload = JSON.parse(localStorage.getItem("cart")) || []
            await axios.delete(`${BASEURL}/cart/deleteFromCart/${id}`, {
                headers: {
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzgyOThiMjY2ZTA3MzAxNDMwNjEwY2YiLCJpYXQiOjE3MzY3NjY2NjUsImV4cCI6MTczNjc3MDI2NX0.FvH3x-68IXQCXwswiPWQjKb-vnIgwDb8s6crxlXTYcs`
                }
            }).then((res) => {
                dispatch(removeCartAction(res))
                dispatch(getCart(payload))
                console.log(res)
            })
        } catch (error) {
            console.log(error)
            dispatch(removeCartAction(error))
        }
    }
}

