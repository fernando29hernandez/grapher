import React, { useState } from 'react';
import { Navbar } from "flowbite-react";
import { PiGraph } from "react-icons/pi";
const NavBar = ({setSeletedGrapher}) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Trees' },
    { id: 2, text: 'LinkedList' },
    { id: 3, text: 'Graph' },
    { id: 4, text: 'PlayGround' },
  ];

  const selectGrapher = (index) => {

    if(index==1){
      setSeletedGrapher(index)
      return;
    }
    if(index==2){
      setSeletedGrapher(index)
      return;
    }

    if(index==3){
      setSeletedGrapher(index)
      return;
    }

  }

  return (
    <Navbar fluid rounded className='bg-gray-900'>
    <Navbar.Brand >
      <PiGraph className="mr-3 h-6 sm:h-9"  />
      <span className="self-center whitespace-nowrap text-xl font-semibold ">Grapher</span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
    <Navbar.Link href="#" active className="hover:text-white ">
        Home
      </Navbar.Link>
      {navItems.map((item)=>{
        return  <Navbar.Link key={item.id} href="#"  className="text-white hover:text-white" onClick={()=>{ selectGrapher(item.id)}}>
        {item.text}
        </Navbar.Link>
       
      })}
    </Navbar.Collapse>
  </Navbar>
  );
};

export default NavBar;