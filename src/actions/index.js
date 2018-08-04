import types from './types';

export function updateExpenseLog(snapshot){
    const log = [];

    // snapshot.forEach( doc => {
    //     log.push(doc.data());
    // });

    snapshot.forEach( document => {
        const doc = document.data();
        doc.id = document.id;
        
        log.push(doc);
    });

    // console.log('Log in Action Creator', log);

    return {
        type: types.UPDATE_EXPENSE_LOG,
        log
    }
}