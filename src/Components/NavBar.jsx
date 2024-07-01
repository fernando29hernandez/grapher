import React from 'react';
import { Navbar } from "flowbite-react";
import { PiGraph } from "react-icons/pi";


const NavBar = ({setSeletedGrapher}) => {

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
    if(index==4){
      setSeletedGrapher(index)
      return;
    }
  }

  return (
    <Navbar fluid rounded className='bg-gray-900'>
    <Navbar.Brand >
      <PiGraph className="mr-3"  />
      <span className="self-center whitespace-nowrap text-xl font-semibold ">Grapher</span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
    <Navbar.Link href="#" active className="hover:text-white text-xl ">
        Home
      </Navbar.Link>
      {navItems.map((item)=>{
        return  <Navbar.Link key={item.id} href="#"  className="text-white hover:text-white text-xl" onClick={()=>{ selectGrapher(item.id)}}>
        {item.text}
        </Navbar.Link>
       
      })}
    </Navbar.Collapse>
  </Navbar>
  );
};

export default NavBar;