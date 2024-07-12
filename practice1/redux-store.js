//Actions 

const newBooking = (name,amount) => {
    return {
        type:"NEW_BOOKING",
        payload:{
            name,
            amount
        }
    }
}

const cancelBooking=(name,refundAmount)=>{
    return{
        type:"CANCEL_BOOKING",
        payload:{
            name,
            refundAmount
        }
    }
}

//Reducers

const reservationHistory = (oldReservationHistory=[],action) => {
    if(action.type === "NEW_BOOKING"){
        return [...oldReservationHistory,action.payload]
    }
    else if(action.type === "CANCEL_BOOKING"){
        return oldReservationHistory.filter(record => record.name != action.payload.name)
    }
    else{
        return oldReservationHistory
    }
}

const cancellationHistory = (oldCancellationHistory=[],action) => {
    if(action.type === "CANCEL_BOOKING"){
        return [...oldCancellationHistory,action.payload]
    }
    else{
        return oldCancellationHistory
    }
}

const accounting = (totalMoney = 100, action) => {
    if(action.type === "NEW_BOOKING"){
        return totalMoney + action.payload.amount
    }
    else if(action.type === "CANCEL_BOOKING"){
        return totalMoney - action.payload.refundAmount
    }
    else{
        return totalMoney
    }
}

//Store

const {createStore, combineReducers} = Redux;

const railwayCentralStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory
})

const store = createStore(railwayCentralStore);

const action = newBooking("Jaya Surya",20);
store.dispatch(action);
store.dispatch(newBooking("Venkatesh",50))
store.dispatch(cancelBooking("Jaya Surya",10));
store.dispatch(newBooking("SNR",25))
console.log(store.getState());