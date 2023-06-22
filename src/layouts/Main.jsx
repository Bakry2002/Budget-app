// ? react router
import { Outlet, useLoaderData } from "react-router-dom"

//?  helper functions 
import { fetchData } from "../helper"

//? assets 
import waveImg from "../assets/wave.svg"

//? components
import { Nav } from "../components/Nav"


//? loader 
export const mainLoader = () => {
    const username = fetchData("username") 
    const budgets = fetchData("budgets") 
    const expenses = fetchData("expenses") 
    return { username, budgets, expenses }
}

const Main = () => {

    const { username } = useLoaderData() // this is a hook that react router provides to access the data that was returned from the loader function.

    return (
        <div className="layout">
            <Nav username={username}/>
            <main>
                <Outlet />
            </main>
            <img src={waveImg} alt="" />
        </div>
    )
}

export default Main