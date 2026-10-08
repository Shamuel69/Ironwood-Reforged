import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signin() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    let username;
    let password;

    const handleSignin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData.entries());
        
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", 
                credentials, 
            {withCredentials: true});
            navigate("/");
            navigate(0)
        }catch{
            setError("There was an error signing in. Please check your credentials and try again.");
        }
    }
    
    
    return (
        <div className="w-full  text-(--text-primary) md:pt-15 flex justify-center items-center">
            <div className="w-full md:w-[35%]  bg-(--bg-secondary) rounded-lg md:border border-(--border) md:shadow-2xl  flex flex-col justify-center items-center">
                <h2 className="text-3xl  font-semibold p-7 ">Sign In Page</h2>
                {error && (
                <div className="w-[85%] mx-auto bg-(--warning) border-1-transparent flex flex-col rounded-md justify-center gap-5 p-3">
                    <h3>Error with signing in!</h3>
                    <p>{error}</p>
                </div>
                )}
                <form onSubmit={handleSignin} className="mx-auto w-full md:w-[85%] p-2.5 flex flex-col gap-8">
                <div className="flex flex-col gap-3 ">
                    <label for="username" className="">
                        Username: 
                    </label>
                    <input type="text" name="username" value={username} placeholder="Username/email" className="w-[80%] md:w-[70%] ml-5 focus:outline-none focus:ring-0 bg-(--bg-secondary) p-2 font-light  border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <div className="flex flex-col gap-3 ">
                    <label for="password" className="">
                        Password: 
                    </label>
                    <input type="password" name="password" value={password} placeholder="Password" className="w-[80%] md:w-[70%] ml-5 bg-(--bg-secondary) p-2 font-light focus:outline-none focus:ring-0 border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <p className="text-[16px]">Don't have an account? <span className="text-blue-500 hover:text-blue-600 "><Link to="/signup">Register!</Link></span></p>
                <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) self-end m-2.5 duration-300  px-3 py-1 rounded mr-2 w-30">
                            Submit
                        </button>
            </form>
            </div>
        </div>
    )
}
    
export function Signup() {
    const [error, setError] = useState("");
    let username;
    let password;
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post("http://localhost:8080/api/auth/signup", credentials, { withCredentials: true });
            navigate("/");
            navigate(0);

        } catch (error) {
            setError("Error signing up user: " + error.message);
            console.error("Error signing up user: ", error);
        }
    };

    return (
        <div className="w-full  text-(--text-primary) md:pt-15 flex justify-center items-center">
            <div className="w-full md:w-[35%]  bg-(--bg-secondary) rounded-lg md:border border-(--border) md:shadow-2xl  flex flex-col justify-center items-center">
                <h2 className="text-3xl  font-semibold p-7 ">Sign Up Page</h2>
                {error && (
                <div className="w-[85%] mx-auto bg-(--warning) border-1-transparent flex flex-col rounded-md justify-center gap-5 p-3">
                    <h3>Error with signing up!</h3>
                    <p>{error}</p>
                </div>
                )}
                <form onSubmit={handleSignup} className="mx-auto w-full md:w-[85%] p-2.5 flex flex-col gap-8">
                <div className="flex flex-col gap-3 ">
                    <label for="username" className="">
                        Username: 
                    </label>
                    <input type="text" name="username" value={username} placeholder="Username/email" className="w-[80%] md:w-[70%] ml-5 focus:outline-none focus:ring-0 bg-(--bg-secondary) p-2 font-light  border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <div className="flex flex-col gap-3 ">
                    <label for="password" className="">
                        Password: 
                    </label>
                    <input type="password" name="password" value={password} placeholder="Password" className="w-[80%] md:w-[70%] ml-5 bg-(--bg-secondary) p-2 font-light focus:outline-none focus:ring-0 border-b-1 border-l-[2px] border-(--border) active:outline-0"/>
                </div>
                <p className="text-[16px]">Already have an account? <span className="text-blue-500 hover:text-blue-600 "><Link to="/signin">Sign In!</Link></span></p>
                <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) self-end m-2.5 duration-300  px-3 py-1 rounded mr-2 w-30">
                    Submit
                </button>
            </form>
            </div>
        </div>
    )
}
