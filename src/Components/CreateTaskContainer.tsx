import React, { useState } from 'react';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useCreateTaskContainerMutation } from '../features/taskContainerApiSlice';


const CreateTaskContainer = () => {
    const [expanded, setExpanded] = useState<Boolean>(false);
    const [taskContainerName, setTaskContainerName] = useState<string>('');
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskContainerName(event.target.value);
    };
    const [createContainer] = useCreateTaskContainerMutation()
    const handleSave = async (event: any) => {
        if (taskContainerName.trim() !== '') {
            await createContainer({ name: taskContainerName })
            setTaskContainerName('');
            setExpanded(false)
        }
    };
    const content = (
        <div className="task-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div className="container-update-input" >
                        <textarea className='container-name-input' value={taskContainerName} onChange={handleInputChange} style={{ width: '285px' }} />
                        <div className="containerName-button-title-input-container">
                            <button className="containerName-input-button" onClick={handleSave}><CheckOutlined /></button>
                            <button className="containerName-input-button" onClick={() => setExpanded(!expanded)}><CloseOutlined /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        expanded ? content : <div style={{
            backgroundColor: '#F7F8F9',
            width: '24px',
            height: '24px',
            marginTop: '12px',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '2px',
            padding: '3px',
            cursor: 'pointer'
        }} title='Create column' onClick={() => setExpanded(!expanded)}><PlusOutlined style={{ fontSize: '150%' }} /></div>
    );
};

export default CreateTaskContainer;