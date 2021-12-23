import React, { useEffect, useState } from "react";
import axios from "axios";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

import AuthContext from "../store of browser provider/auth-context";
import { useContext } from "react";

const Wallet = () => {
  const DUMMY_EXPENSES = [];
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userData;

  const thextractID = { id: localStorage.getItem("userdata") };

  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  useEffect(() => {
    axios
      .post("https://note-wallet-app.herokuapp.com/app/GetItems", thextractID)
      .then((response) => {
        setExpenses(response.data.data);
      });
  }, [userId]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default Wallet;
