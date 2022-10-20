import {useNavigate} from 'react-router-dom'
import React from 'react'
import '../styles/Landing.css'

const LandingPage =() =>{

    let navigate = useNavigate(); 
    return( 
        <div id='container'>
            <div className='box'>
                    <img className='image' src={require('../styles/assets/Low Resolution Logo - Transparent Background.png')}
                        id="logo" alt='something'/>
                    <div className='content'>
                            <div className='button-margin'>                        
                            <button className='button-landing' onClick={()=>{navigate('/create')}}><img className='icon' src={require('../styles/assets/layer.png')} alt='s'/>Create Project</button>
                            </div>
                            <div className='button-margin'>
                            <button className='button-landing' ><img className='icon' src={require('../styles/assets/folders.png')} alt='s'/> Open Project</button>
                            </div>
                            <div className='button-margin'>
                            <button className='button-landing' ><img className='icon' src={require('../styles/assets/reload.png')} alt='s'/> Sync Project</button>
                            </div>
                            <div className='button-margin'>
                            <button className='button-landing' ><img className='icon' src={require('../styles/assets/archive.png')} alt='s'/> Archive Project</button>
                            </div>
                            <div className='button-margin'>
                            <button className='button-landing' onClick={()=> {navigate('/projects')}}> <img className='icon' src={require('../styles/assets/archived-list.png')} alt='s'/>Projects (DB test)</button>
                            </div>
                            <div className='button-margin'>
                            <button className='button-landing' onClick={()=>{navigate('/displayer')}}> <img className='icon' src={require('../styles/assets/archived-list.png')} alt='s'/>Displayer</button>                                               
                            </div>
                    </div>
            </div>
        </div>                    
    );
}
export default LandingPage