//? react router
import { redirect } from "react-router-dom";

//? helpers
import { deleteItem } from "../helper";

//? library
import { toast } from "react-toastify";

export async function logoutAction() {
    // delete the username from local storage
    deleteItem({key: 'username'});
    deleteItem({key: 'budgets'});
    deleteItem({key: 'expenses'});
    toast.success("You've deleted your account!")
    // redirect to login page
    return redirect('/');
}