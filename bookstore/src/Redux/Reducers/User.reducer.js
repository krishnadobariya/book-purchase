import { ADD_CART, GET_All_BOOK, GET_CART, REMOVE_CART, VIEW_BOOK } from "../Actions/User.action";
const initialState = {
    getAllBook: '',
    viewBook: '',
    addCart: '',
    getCart: '',
    removeCart:''
}
const BookStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_All_BOOK:
            return { ...state, getAllBook: action.payload }
        case VIEW_BOOK:
            return { ...state, viewBook: action.payload }
        case ADD_CART:
            return { ...state, addCart: action.payload }
        case GET_CART:
            return { ...state, getCart: action.payload }
        case REMOVE_CART:
            return { ...state, removeCart: action.payload }
        default:
            return state;
    }
}
export default BookStoreReducer;