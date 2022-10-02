

import React, { useReducer, useMemo, useContext, useEffect } from 'react';

import axios from 'axios';

import reducer, { initialState, USER_LOADED, USER_ERROR } from './reducer';
import { fetchUserContact } from '../contacts/utils';


export const api = 'http://10.0.2.2:8000/account';


export const AccountContext = React.createContext();
export const useAccount = () => React.useContext(AccountContext);


export default function App({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    const getUser = async () => {
      try {
        const user = await fetchUserContact();

        

        dispatch({ type: USER_LOADED, user })
      }
      catch (err) {
        
        dispatch({ type: USER_ERROR, err });
      }
    }

    // const getAccount = async () => {
    //     
    //     try {
            
    //         const res = await axios.post(`${api}/login`, { email, password }, await tokenConfig());

    //         dispatch({ type: CONTACTS_LOADED, contacts: res.data });
    //     }
    //     catch (err) {
    //         
    //         dispatch({ type: CONTACTS_ERROR, err });
    //     }
    // };



    const value = useMemo(() => {
        // const { contacts } = state;
        return { ...state, getUser };
    }, [state]);

  useEffect(() => {    

    getUser();
  }, []);


  return (
    <AccountContext.Provider value={value}>
        {children}
    </AccountContext.Provider>
  );
}
