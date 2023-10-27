import React, { useState } from "react";
import "./Sidebar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { logout } from "./redux/UserSlice";

const Sidebar = ({ onMenuItemSelect }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true)
  const dispatch = useDispatch();
  
  const handleMenuItemClick = (index) => {
    setSelected(index);
    onMenuItemSelect(SidebarData[index]); 
  };

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpanded(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
     <div className="logo">
        <img src={require('../imgs/logo.png')} style={{height:"100%",width:"50%"}}/>
    </div>


      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() =>  handleMenuItemClick(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}

        <div className="menuItem">
        <UilSignOutAlt onClick={() => dispatch(logout())} />

        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
