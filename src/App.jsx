/* Start from video No. 13 */

//? react router
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//? Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//? pages 
import Dashboard from "./pages/Dashboard"
import { dashboardLoader } from "./pages/Dashboard"
import {Error} from './pages/Error';

//? Layouts 
import Main, { mainLoader } from "./layouts/Main";

//? actions
import { logoutAction } from "./actions/logoutAction";
import { dashboardAction } from "./pages/Dashboard";

//? Routes 
import ExpensesPage, { expensesLoader } from "./pages/ExpensesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: dashboardLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: mainLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },

])
function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer 
        autoClose={2000}
        delay={1000}
      />
    </div>
  )
}

export default App
