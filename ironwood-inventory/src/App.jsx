import { useState, useEffect } from 'react'
import './App.css'
import search from './assets/search-icon.svg'
import camping from './assets/camping_kit1.jpg'
import herobanner from './assets/herobanner.jpg'

import camping2 from './assets/camping_kit5.jpg'

import {Inventory, InventoryItem} from './subpages/inventory.jsx'
import { Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import Admin from './subpages/admin.jsx'
import Signin, { Signup } from './subpages/signin.jsx'



function Footer(){
    return (
        <footer className="w-full h-60 bg-[#090909] pt-5 flex flex-col gap-4 justify-center text-sm items-center text-(--text-tertiary)">
            <div className="border-b border-(--border) w-[80%] flex flex-col justify-center items-center gap-2 md:w-[40%]">
                <h3 className="text-[1.25rem] text-(--text-primary)">IronWood</h3>
                <h6 className=" mb-2">© 2026 IronWood. All rights reserved.</h6>
                
            </div>
            
            <div className="flex flex-col gap-2 justify-center items-center">
                <p className=" min-w-[360px]  text-center  md:w-[500px]">
                    This was a project I made to learn more about backend and tinker around with SQLite and Flask. 
                    I wanted to make a simple inventory management system that could be used for a small business or personal use. 
                    The project is open source and can be found on my GitHub. 
                    If you have any questions or suggestions, feel free to reach out to me on GitHub or LinkedIn!
                </p>
                <label className="">Made with ❤️ by Samuel Parnell</label>
            </div>
        </footer>
    )
}

function Home(){
  return (
    <>
      <div className="w-full md:w-[65%] text-(--text-primary) mx-auto min-h-screen md:min-h-dvh">
        <section id="hero" className="pt-5">
          <div className=" ">
            <div className='bg-[#1d1f28] relative min-h-[340px] max-h-[550px] md:h-dvh w-full p-2 md:w-full mx-auto rounded-2xl ' >
              <div className="absolute inset-0 z-20">
                <h3 className="text-5xl mt-5 md:mt-10 mb-5 px-10 text-(--text-primary)">IronWood</h3>
                <p className="text-3xl py-0 px-15 font-light">Put the nails in fashion.</p>
                <div className="relative inset-0 z-20">
                  <p className="text-2xl py-5 px-13 relative font-light">Shop the latest in outdoor gear and apparel:</p>
                  <Link className="border-(--border) border px-2.5 mx-15 bg-transparent hover:pointer hover:bg-(--bg-tertiary) ease-in duration-300  px-3 py-1 rounded self-center" to="/inventory">Shop Now</Link>
                </div>
              </div>
              {/* webkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100 */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black z-0">
                <img src={camping} alt="hero banner" className="w-fit h-full absolute top-0 right-0 " style={{ webkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)' }} />
              </div> 
            </div>
          </div>
        </section>
        <section id="featured" >
          <div className="flex flex-col  md:w-full gap-4">
            <div className="border-b-1 border-(--border) md:p-4 flex flex-row ">
              <div className="flex flex-col justify-between gap-4 p-5 w-full md:w-[50%]">
                <h2>Shop!</h2>
                <p className="text-(--text-secondary)">Prepair for the worst! Prep for your next adventure:</p>
                <Link className="border-(--border) text-(--text-primary) border md:px-2.5 mx-10 bg-transparent hover:pointer hover:bg-(--bg-tertiary) ease-in duration-300  px-3 py-1 rounded self-center" to="/inventory">Shop Now</Link>
              </div>
              <img src={camping} alt="camping kit" className="w-[50%] h-auto p-2 md:p-5 object-scale-down " />
            </div>
            <div className="flex flex-row md:w-full gap-4">
              <div className="flex flex-col gap-4 p-2 md:p-5 w-full md:w-[50%]">
                <h2>Explore!</h2>
                <p className="text-(--text-secondary)">Pick up some axes for your next camping trip!</p>
                <Link className="border-(--border) text-(--text-primary) border md:px-2.5 mx-10 bg-transparent hover:pointer hover:bg-(--bg-tertiary) ease-in duration-300  px-3 py-1 rounded self-center" to="/inventory">Shop Now</Link>
              </div>
              <img src={camping2} alt="camping kit" className="w-[40%] h-auto p-2 md:p-5 object-scale-down mx-auto " />

            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [active, setActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async() => {
        const res = await axios.get("http://localhost:8080/api/auth/me", {withCredentials:true})
        setUser(res.data)
    }
    fetchUser()

    console.log(user)
  }, [])

  return (
    <>
      <section id="header" className="w-full p-3 text-(--text-primary) bg-(--bg-primary) border-b-1 border-(--border) flex flex-row shadow-2xl justify-between items-center">
        <div className="w-[85%] mx-auto  flex flex-row justify-between items-center">
          <Link to="/" className="text-3xl  font-medium">IronWood</Link>
          <div className="w-[30%] p-2  flex flex-row justify-between item-auto border-1-transparent rounded-[sm]">
              <input type="text" placeholder="Search for products, collections, and more" className='w-[85%]' />
              <img src={search} alt="search icon" className="w-fit h-4" />
          </div>
          {user ? (
            <div className="hidden md:block relative">
              
              <button className="text-2xl p-2.5 hover:bg-(--bg-secondary)" onClick={() => setActive(prev => !prev)}>{user.username}</button>
              {active && (
                <div className="absolute right-0 top-full mt-2 p-2 bg-(--bg-secondary) border rounded">
                  <button className="bg-(--error) border rounded py-2" onClick={() => {
                    axios.post("http://localhost:8080/api/auth/logout", {}, {withCredentials:true})
                    .then(() => {
                      setUser(null)
                      setMenuOpen(false)
                    })
                  }}>
                    Log Out
                  </button>
                </div>
              )}
                </div>
              ) : (
                <div className="hidden md:flex text-lg border-2 rounded-3xl">
                  <Link to="/signup" className="bg-(--bg-tertiary) p-2 rounded-3xl">
                    Sign-Up
                  </Link>
                  <Link to="/signin" className="p-2">
                    Sign-in
                  </Link>
                </div>
          )}
        </div>
      </section>
      
      <section id="display_area" className="w-full min-h-screen bg-(--bg-secondary)">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>


            <Route path="/inventory" element={<Inventory />}/>
            <Route path="/inventory/:id" element={<InventoryItem />}/>
        </Routes>
      </section>
      <Footer />
    </>
  )
}

export default App
