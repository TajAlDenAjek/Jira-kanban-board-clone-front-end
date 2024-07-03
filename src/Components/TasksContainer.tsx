import React, { useState } from 'react'
import SingleTask from './SingleTask';
import { useDrop } from 'react-dnd'
import { TaskType, useCreateTaskMutation, useUpdateTaskMutation } from '../features/taskApiSlice';
import { useDeleteTaskContainerMutation, useUpdateTaskContainerMutation } from '../features/taskContainerApiSlice';
import CreateIssue from './CreateIssue';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './board.css'


interface ITaskContainerProps {
    id: React.Key | undefined,
    name: string,
    tasks: TaskType[]
}
const Tasks: React.FC<ITaskContainerProps> = ({ id, name, tasks }) => {
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const [deleteContainer] = useDeleteTaskContainerMutation();
    const [updateContainer] = useUpdateTaskContainerMutation();
    const [collectedProps, drop] = useDrop(() => ({
        accept: 'Tasks',
        async drop(item: TaskType) {
            await updateTask({ id: item.id, taskContainerId: id, title: '', description: '' }).unwrap()
        },
    }))

    const [updateMode, setUpdateMode] = useState(false);
    const [containerName, setContainerName] = useState<string>(name);

    const handleUpdateTask = async () => {
        await updateContainer({ id, name: containerName }).unwrap()
        setUpdateMode(false);
        setContainerName(containerName);
    }

    const handleDelete = async () => {
        const result = window.confirm('Are you sure you want to delete the column?');
        if (result) {
            await deleteContainer(id).unwrap();
        }
    }
    const handleSaveTask = async (taskDetails: string) => {
        await createTask({ taskContainerId: id, title: taskDetails, description: '' }).unwrap()
    };
    return (
        <>
            <div className="task-container" ref={drop}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        {
                            updateMode
                                ? <div className="container-update-input">
                                    <textarea className='container-name-input' value={containerName} onChange={(e) => setContainerName(e.target.value)} />
                                    <div className="containerName-button-title-input-container">
                                        <button className="containerName-input-button" onClick={handleUpdateTask}><CheckOutlined /></button>
                                        <button className="containerName-input-button" onClick={() => setUpdateMode(!updateMode)}><CloseOutlined /></button>
                                    </div>
                                </div>
                                : <h2 onClick={() => setUpdateMode(!updateMode)}>
                                    {`${name} ${tasks.length >= 1 ? tasks.length : ''}`}
                                </h2>
                        }
                    </div>
                    <div>
                        <CloseOutlined style={{ marginRight: '10px', cursor: 'pointer' }} title='Delete taskContainer' onClick={handleDelete} />
                    </div>
                </div>
                <div className='task-container-sub' key={id}>
                    {
                        tasks.map((task: TaskType) => (<SingleTask taskContainerName={name} task={task} key={task.id} />))
                    }
                </div>
                <CreateIssue onSave={handleSaveTask} />
            </div>
        </>
    )
}

export default Tasks