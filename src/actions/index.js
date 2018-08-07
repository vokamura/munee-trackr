import types from './types';

export function updateExpenseLog(snapshot){
    const log = [];

    snapshot.forEach( document => {
        const doc = document.data();
        doc.id = document.id;
        
        log.push(doc);
    });

    return {
        type: types.UPDATE_EXPENSE_LOG,
        log
    }
}
