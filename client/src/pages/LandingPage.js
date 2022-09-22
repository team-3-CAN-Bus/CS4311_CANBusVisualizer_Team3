import {useNavigate} from 'react-router-dom'
import React from 'react'
import '../styles/Landing.css'

const LandingPage =() =>{

    let navigate = useNavigate(); 
    return( 
        <div id='container'>
            <div className='something' style={{height:'10vh',width:'20vw', float:'left'}}></div>
            <label className='box'>
                    <div className='content'>
                        <h2>CAN Bus Visualizer</h2>
                    </div>
                    <div className='content'>
                        <button onClick={()=>{navigate('/create')}}>Create Project</button>
                        <button>Open Project</button>
                        <button>Sync Project</button>
                        <button>Archive Project</button>
                        <button onClick={()=>{navigate('/projects')}}>Project List (DB test)</button>
                        <button onClick={()=>{navigate('/displayer')}}>Displayer</button>
                    </div>
            </label>
        </div>                    
    );
}
export default LandingPage