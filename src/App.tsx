import React from 'react';
import './App.css';
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MovableItem = () => {
    const [{ isDragging }, drag] = useDrag({
        item: { name: 'Any custom name', type: 'Irrelevant, for now' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{  opacity }}>
            We will move this item
        </div>
    )
}

const FirstColumn = () => {
    return (
        <div className='column first-column'>
            Column 1
            <MovableItem/>
        </div>
    )
}

const SecondColumn = () => {
    return (
        <div className='column second-column'>
            Column 2
        </div>
    )
}

export const App = () => {
    return (
        <div className="container">
            {/* Wrap components that will be "draggable" and "droppable" */}
            <DndProvider backend={HTML5Backend}>
                <FirstColumn/>
                <SecondColumn/>
            </DndProvider>
        </div>
    );
}
