import React from 'react'
import { Component } from 'react';
import { Stage, Layer, Rect} from 'react-konva';

class Canvas extends Component {
  state = {
    isDragging: false,
    x: 50,
    y: 50,
  };

  render() {
    return (
        //this is where all the figures can be drawn
      <Stage width={730} height={window.innerHeight}>
        <Layer>
            <Rect
                x={140} 
                y={140} 
                height={40} 
                width={80}
                draggable
                fill={this.state.isDragging ? 'green' : 'Red'}
                onDragStart={() => {
                this.setState({
                    isDragging: true,
                });
                }}

                onDragEnd={(e) => {
                    this.setState({
                    isDragging: false,
                    x: e.target.x(),
                    y: e.target.y(),
                    });
                }}/>

          <Rect
                text="Draggable Text"
                x={this.state.x}
                y={this.state.y}
                height={40} 
                width={80}
                draggable
                fill={this.state.isDragging ? 'green' : 'Red'}
                onDragStart={() => {
                this.setState({
                    isDragging: true,
                });
                }}
                onDragEnd={(e) => {
                this.setState({
                    isDragging: false,
                    x: e.target.x(),
                    y: e.target.y(),
                });
                }}
            />

        </Layer>
      </Stage>
    );
  }
}export default Canvas;
