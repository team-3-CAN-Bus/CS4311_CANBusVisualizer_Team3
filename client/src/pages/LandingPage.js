import {useNavigate} from 'react-router-dom'
import React from 'react'
import '../styles/Landing.css'

const LandingPage =() =>{

    let navigate = useNavigate(); 
    return(
    <label className='box'>
        <div>
            <div id="container">
                <h2>CAN Bus Visualizer</h2>
            </div>
        </div>
        <div>
            <div id='container'>
                <button onClick={()=>{navigate('/create')}}>Create Project</button>
                <button>Open Project</button>
                <button>Sync Project</button>
                <button>Archive Project</button>
                <button onClick={()=>{navigate('/projects')}}>Project List (DB test)</button>
                <button onClick={()=>{navigate('/displayer')}}>Displayer</button>
            </div>
        </div>
    </label>
    );
}
export default LandingPage