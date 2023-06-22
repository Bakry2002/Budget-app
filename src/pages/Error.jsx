/* eslint-disable react/no-unescaped-entities */

//? react router  
import { useRouteError, useNavigate, Link } from "react-router-dom"

//? Library
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export const Error = () => {
    const error = useRouteError() // this is a hook that react router provides to access the error that was returned from the loader function.
    const navigate = useNavigate(); 

    return (
        <div className="error">
            <h1>Uh oh! We've got a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => navigate(-1)}>
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>
                <Link to="/" className="btn btn--dark">
                    <span>Go Home</span>
                    <HomeIcon width={20} />
                </Link>
            </div>
        </div>
    )
}
