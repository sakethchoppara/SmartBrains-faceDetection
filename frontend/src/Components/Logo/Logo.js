import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css'


const Logo = ({handleSignOut}) => {
    return (
      <div className='ma4 mt0' style={{display:'flex',flexDirection:'row'}}>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
          <div className="Tilt-inner pa3">
            <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
          </div>
        </Tilt>

        <button style={{
          marginLeft:'auto',
          background:'transparent',
          border:'none',
          cursor:'pointer',
          fontSize:'25px'
        }} onClick={handleSignOut} >Sign Out</button>
      </div>
    );
  }


  export default Logo