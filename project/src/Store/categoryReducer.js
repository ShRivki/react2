import actions, * as actiontype from './actions'
const initialState = {
    categories: []
}
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontype.SET_CATEGORY: {
            return { ...state, categories: action.data };
        }
        case actiontype.ADD_CATEGORY: {
            const categories = [...state.categories];
            categories.push(action.data);
            return { ...state, categories }
        }
        default: return { ...state };
    }

}
export default categoryReducer