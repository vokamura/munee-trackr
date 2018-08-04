import types from '../actions/types';

const DEFAULT_STATE = {
    log: []
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.UPDATE_EXPENSE_LOG:
            return {...state, log: action.log}
        default:
            return state;
    }
}