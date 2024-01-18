import  * as actionType from './actions'
const initialState = {
    shoppingList: [" "]
}
const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_SHOPPING_LIST: {
            return { ...state, shoppingList: action.data }
        }

        case actionType.EDIT_PRODUCT: {
            const shoppingList = [...state.shoppingList];
            // let index = shoppingList.findIndex(x => x.Name == action.data.Name)
            const index = shoppingList.findIndex(x => action.data.Id === x.Id)
            if (index === undefined) {
                const shoppingList = [...state.shoppingList];
                shoppingList.push(action.data);
                return { ...state, shoppingList }
            }
            shoppingList[index].Count += action.data.Count;
            if (shoppingList[index].Count === 0)
                shoppingList.splice(index, 1);
            return { ...state, shoppingList }
        }
        case actionType.DELETE_PRODUCT: {
            const shoppingList = state.shoppingList.filter(product => product.Id !== action.data);
            return { ...state, shoppingList }
        }
        default: return { ...state }
    }
}

export default shoppingListReducer;