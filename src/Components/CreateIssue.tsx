import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';


interface ITaskInputProps {
  onSave: (taskDetails: string) => void;
}

const CreateIssue: React.FC<ITaskInputProps> = ({ onSave }) => {
  const [expanded, setExpanded] = useState<Boolean>(false);
  const [taskDetails, setTaskDetails] = useState<string>('');

  const toggleInput = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDetails(event.target.value);
  };

  const handleSave = (event: any) => {
    if (taskDetails.trim() !== '') {
      if (event.key === 'Enter') {
        onSave(taskDetails);
        setTaskDetails('');
        setExpanded(false);
      }
    }
  };

  return (
    <div className="input-area">
      <div className="input-header" onClick={toggleInput}>
        <PlusOutlined />
        <span className="header-text">Create issue</span>
      </div>
      {expanded && (
        <div className="input-content">
          <textarea
            id="task-input"
            placeholder="What needs to be done?"
            value={taskDetails}
            onChange={handleInputChange}
            onKeyDown={handleSave}
          ></textarea>
          {/* <button onClick={handleSave}>Save</button> */}
        </div>
      )}
    </div>
  );
};

export default CreateIssue;