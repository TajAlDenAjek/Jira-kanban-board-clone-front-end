import React from 'react';
import Tasks from './TasksContainer';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useGetTaskContainersQuery } from '../features/taskContainerApiSlice';
import { TaskContainerType } from '../features/taskContainerApiSlice';
import CreateTaskContainer from './CreateTaskContainer.tsx';
import './board.css'



const Board: React.FC = () => {
    const {
        data: taskContainers,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTaskContainersQuery({})

    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        content = taskContainers.map((taskContainer: TaskContainerType, index: number) => (
            <Tasks key={index} id={taskContainer.id} name={taskContainer.name} tasks={taskContainer.Tasks} />
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return (
        <>
            <div className='containers'>
                <DndProvider backend={HTML5Backend}>
                    {content}
                    <CreateTaskContainer />
                </DndProvider>
            </div>
        </>
    );
};

export default Board;