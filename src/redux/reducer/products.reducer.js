import { FETCH_PRODUCTS_REQUEST, GET_PRODUCTS, FETCH_PRODUCTS_FAILURE, GET_PRODUCT_DETAILS, ADD_PRODUCTS_FILTER, CLEAR_PRODUCTS_FILTER, SET_PRODUCTS_SORTING } from '../constants'

const initialState = {
  data: [],
  productDetail: {},
  filter: {},
  pagination: {},
  page: 1,
  isLoading: true
}

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_PRODUCTS:
      return {
        ...state,
        data: payload.rows,
        pagination: payload.pagination,
        isLoading: false
      }
    case FETCH_PRODUCTS_FAILURE: // Acción para manejar errores
      return {
        ...state,
        isLoading: false
      }
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetail: payload
      }

    case ADD_PRODUCTS_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          page: 1,
          [payload.name]: [payload.value]
        }
      }

    case SET_PRODUCTS_SORTING:
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: payload
        }
      }
    case CLEAR_PRODUCTS_FILTER:
      return {
        ...state,
        filter: {}
      }

    default:
      return state
  }
}

export default productsReducer
