//import { ActionCreators } from "../app/expensesReducer"
import { setExpenses, newExpense, editExpense, deleteExpense } from "../app/expensesSlice"
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Expenses`,
})

axiosInstance.interceptors.request.use(config=> {
    config.headers = {authorization: 'Bearer ' + sessionStorage.getItem('token')};
    return config;
})

export const GetExpenses = async (dispatch) => {
    try{
        //api call
        const { data } = await axiosInstance.get();
        dispatch(setExpenses(data));
    } catch (error){
        console.error('Error fetching expenses:', error.message);
    }
}

export const NewExpense = async (dispatch, expense) => {
    try{
        //api call
        const { data } = await axiosInstance.post('', expense);
        dispatch(newExpense(data));
    } catch{
        console.log('error!');
    }
}

export const EditExpense = async (dispatch, expense) => {
    try {
        //api call
        await axiosInstance.put('', expense);
        dispatch(editExpense(expense));
    } catch {
        console.log('error!');
    }
}

export const DeleteExpense = async (dispatch, expense) => {
    try {
        //api call
        await axiosInstance.post('/DeleteExpense', expense);
        dispatch(deleteExpense(expense));
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
    }
}