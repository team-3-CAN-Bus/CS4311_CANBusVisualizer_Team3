
import React from 'react'
import Split from 'react-split'
import Canvas from '../components/Canvas.js'
import '../styles/SplitLayout.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar.js'

const SplitLayout = ()=>{ 
    return(
    <Split className='split'>
    <div id='col1'>
        <Navbar>
        <button>File</button>
        <button>Edit</button>
        <button>View</button>
        </Navbar>
        <table>
            <thead>
                <tr>
                    <th>something1</th>
                    <th>something2</th>
                    <th>something3</th>
                    <th>something4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>SomeValue1</td>
                    <td>SomeValue2</td>
                    <td>SomeValue3</td>
                    <td>SomeValue4</td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div id='col2'>
    <Navbar>
        <button>File</button>
        <button>Edit</button>
        <button>Nodes</button>
    </Navbar>
        <Canvas ></Canvas>
    </div>
</Split>
);}
export default SplitLayout
