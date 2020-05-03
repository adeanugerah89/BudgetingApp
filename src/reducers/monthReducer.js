import {
  ADD_MONTH,
  ADD_NEW_LINE_IN_BUDGET,
  REMOVE_MONTH_BUDGET_ITEM,
  REMOVE_MONTH,
} from '../actions/types';

const InitialState = {
  balance: 0,
  monthList: [],
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case ADD_MONTH:
      return {
        ...state,
        monthList: [
          ...state.monthList,
          {id: action.id, date: action.date, budget: []},
        ],
      };
    case ADD_NEW_LINE_IN_BUDGET:
      const updated = state.monthList.map((item) => {
        if (action.id !== item.id) {
          return item;
        } else {
          const budget = item.budget || [];
          return {
            ...item,
            budget: [...budget, action.payload],
          };
        }
      });
      return {...state, monthList: updated};
    case REMOVE_MONTH_BUDGET_ITEM:
      let updatedBudget = state.monthList.map((item) => {
        if (item.id !== action.id) {
          return item;
        } else {
          return {
            ...item,
            budget: item.budget.filter((item) => item.id !== action.itemId),
          };
        }
      });
      return {...state, monthList: updatedBudget};
    case REMOVE_MONTH:
      let listUpdated = state.monthList.filter((item) => item.id !== action.id);
      return {...state, monthList: listUpdated};
    default:
      return state;
  }
};
