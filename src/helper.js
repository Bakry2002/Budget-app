import { toast } from "react-toastify";

// wait for 1 second
export const waait = () => new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

// fetch the data from local storage (username)
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData('budgets')?.length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`; // hsl(0, 65%, 50%) to hsl(340, 65%, 50%) and so on...
}

// create budget 
export const createBudget = ({ name, amount }) => {
    const newBudget = {
        id: crypto.randomUUID(), 
        name: name, 
        amount: +amount, 
        createdAt: Date.now(), 
        color: generateRandomColor()
    }
    const existingBudgets = fetchData('budgets') ?? [];
/*     const budgetNameExists = existingBudgets.some((budget) => budget.name === newBudget.name);
    if (budgetNameExists) {
        toast.error('Budget already exists!');
        return;
    } */
    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newBudget])); 
} 

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newExpense = {
        id: crypto.randomUUID(), 
        name: name, 
        amount: +amount, 
        createdAt: Date.now(), 
        budgetId: budgetId,
    } 

    const budget = fetchData("budgets").find((budget) => budget.id === newExpense.budgetId)
    const totalBudgetSpent = calculateTotalSpentByBudget(budget.id)
    const remaining = budget.amount - totalBudgetSpent;
    console.log(remaining)
    if (newExpense.amount > remaining) {
        toast.error('Expense amount cannot be greater than the remaining budget amount');
        return null; 
    }
    toast.success(`Expense for "${newExpense.name}" has been created.`)
    const existingExpenses = fetchData('expenses') ?? [];
    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newExpense])); 
}

// Get all budgets
export const getAllMatchingItems = ({ category, key, value}) => {
    const data = fetchData(category) ?? []; // budgets or expenses depending on the category
    return data.filter((item) => item[key] === value ); // meaning item.id === budgetId 
}


// delete items 
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}

// total spent by a budget
export const calculateTotalSpentByBudget = (budgetId) => {
    const expenses = fetchData('expenses') ?? [];
    const budgetSpent = expenses.filter((expense) => expense.budgetId === budgetId)
    .reduce((acc, expense) => acc + expense.amount, 0);
    return budgetSpent;
}

// FORMATTING FUNCTIONS 

// format date 
export const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
}

// Format currency
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, { 
        style: 'currency', 
        currency: 'USD' 
    });
}

// format percentage 
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, { 
        style: 'percent', 
        minimumFractionDigits: 0, 
    });
}
