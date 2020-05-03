import {
  ADD_MONTH,
  ADD_NEW_LINE_IN_BUDGET,
  REMOVE_MONTH_BUDGET_ITEM,
  REMOVE_MONTH,
} from './types';

export const addMonth = (date, id) => ({
  type: ADD_MONTH,
  date,
  id,
});

export const addNewLineinMonthBudget = (id, payload) => ({
  type: ADD_NEW_LINE_IN_BUDGET,
  id,
  payload,
});

export const removeMonthBudgetItem = (id, itemId) => ({
  type: REMOVE_MONTH_BUDGET_ITEM,
  id,
  itemId,
});

export const removeMonth = (id) => ({
  type: REMOVE_MONTH,
  id,
});

export const counts = (arr) => {
  let incomes = 0;
  let expense = 0;
  let balance = 0;
  let percent = 0;

  for (let val of arr) {
    if (val.itemType == 'income') {
      incomes += parseInt(val.itemPrice);
    } else {
      expense += parseInt(val.itemPrice);
    }
  }

  balance = incomes - expense;
  percent = Math.round((expense / incomes) * 100);

  return {
    incomes,
    expense,
    balance,
    percent: percent >= 0 ? percent : 0,
  };
};
