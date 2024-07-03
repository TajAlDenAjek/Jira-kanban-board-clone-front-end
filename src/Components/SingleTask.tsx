import React, { useState } from 'react';
import { UnlockFilled, EyeFilled, LikeOutlined, ShareAltOutlined, EllipsisOutlined, CloseOutlined, EditFilled, ApiOutlined, DisconnectOutlined, ApartmentOutlined, DownOutlined, AlignLeftOutlined, ThunderboltOutlined, PushpinOutlined, SettingFilled, UpOutlined, CheckOutlined } from '@ant-design/icons';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../features/taskApiSlice';
import { useDrag } from 'react-dnd'
import { Breadcrumb, Modal, Input, Button } from 'antd';
import './board.css'
import { TaskType } from '../features/taskApiSlice';
import CommentsContainer from './CommentsContainer';
import { useCreateCommentMutation } from '../features/commentApiSlice';


interface ISingleTaskProps {
  taskContainerName: string;
  task: TaskType;
}

const SingleTask: React.FC<ISingleTaskProps> = ({ taskContainerName, task }) => {
  const [showFloatingScreen, setShowFloatingScreen] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [desc, setDesc] = useState<string>(task.description);
  const [collected, drag]: [any, any, any] = useDrag(() => ({
    type: 'Tasks',
    item: task
  }))
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [createComment] = useCreateCommentMutation();

  const handleUpdateTask = async () => {
    await updateTask({ id: task.id, title: taskTitle }).unwrap();
    setUpdateMode(false);
    setTaskTitle(taskTitle);
  }
  const handleDelete = async () => {
    const result = window.confirm('Are you sure you want to delete the task?');
    if (result) {
      await deleteTask(task.id).unwrap();
      setShowFloatingScreen(false)
    }
  }
  const handleUpdateDescMode = async () => {
    await updateTask({ id: task.id, description: desc }).unwrap();
    setDesc(desc)
  }

  const ToggleShowFloatingScreen=()=>{
    setShowFloatingScreen(!showFloatingScreen)
  }
  const handleCreateComment = async (event: any) => {
    if (newCommentText.trim() !== '') {
      if (event.key === 'Enter') {
        await createComment({ taskId: task.id, text: newCommentText }).unwrap()
        setNewCommentText('')
      }
    }
  }
  const iconsForFloatingScreen = [
    { title: 'No restrictions', icon: <UnlockFilled style={{ fontSize: '150%' }} /> },
    { title: 'Watch options', icon: <EyeFilled style={{ fontSize: '150%', marginRight: '5px' }} />, count: 1 },
    { title: 'Vote options', icon: <LikeOutlined style={{ fontSize: '150%' }} /> },
    { title: 'Share', icon: <ShareAltOutlined style={{ fontSize: '150%' }} /> },
    { title: 'Delete Task', icon: <EllipsisOutlined style={{ fontSize: '150%' }} onClick={handleDelete} /> },
    { title: 'Close', icon: <CloseOutlined style={{ fontSize: '150%' }} onClick={ToggleShowFloatingScreen}/> },
  ];

  return (
    <>
      <Modal className="floating-screen" open={showFloatingScreen} closable={false} footer={null} >
        <div className="floating-screen-child">
          <div className='sub-floating'>
            <Breadcrumb style={{ color: '#44546F' }} items={[
              {
                title: <>
                  <EditFilled /> Add epic
                </>
              },
              {
                title: <>
                  <div>
                    <img src="https://tajaldenajek.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=small" alt="" />
                    KAN-{task.id}
                  </div>
                </>,
              }
            ]}>
            </Breadcrumb>
          </div>
          <div className='sub-floating'>
            {
              iconsForFloatingScreen.map((icon, index) => (
                <div className="icon-container" key={index} title={icon.title} onClick={icon.onClick}>
                  {icon.icon}
                  {icon.count && <span>{icon.count}</span>}
                </div>
              ))
            }
          </div>
        </div>
        <div className="floating-screen-child">
          <div className="sub-col">
            <div className="sub-col-row">
              {
                updateMode
                  ? <div className="container-title-input">
                    <textarea className='titleInput' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                    <div className="button-title-input-container">
                      <button className="title-input-button" onClick={handleUpdateTask}><CheckOutlined /></button>
                      <button className="title-input-button" onClick={() => setUpdateMode(!updateMode)}><CloseOutlined /></button>
                    </div>
                  </div>
                  : <h1 onClick={() => setUpdateMode(!updateMode)}>
                    {task.title}
                  </h1>
              }
              <div className="buttons">
                <div className='sub-button' title='Add attachment'>
                  <ApiOutlined style={{ fontSize: '150%' }} /> Attach
                </div>
                <div className='sub-button' title='Add a child issue'>
                  <ApartmentOutlined style={{ fontSize: '150%' }} /> Add a child issue
                </div>
                <div className='sub-button' title='Link issue'>
                  <DisconnectOutlined style={{ fontSize: '150%' }} /> Link issue <DownOutlined style={{ fontSize: '90%', marginTop: '4px', marginLeft: '4px' }} />
                </div>
                <div className='sub-button' title=''>
                  <EllipsisOutlined style={{ fontSize: '150%' }} />
                </div>
              </div>
              <div className="desc">
                <h2 style={{ fontWeight: '600' }}>Description</h2>
                <Input placeholder="Add a description..." value={desc} onMouseOut={handleUpdateDescMode} onChange={(e) => {
                  setDesc(e.target.value)
                }}
                  style={{
                    width: '770px',
                    height: '32px',
                  }} />
              </div>
              <div className="activity">
                <h2 style={{ fontWeight: '600' }}>Activity</h2>
                <div className="activity-history-list">
                  <div className="list-container">
                    Show:
                    <div className="list-item">
                      All
                    </div>
                    <div className="list-item">
                      Comments
                    </div>
                    <div className="list-item">
                      History
                    </div>
                  </div>
                  <span>Newest first<AlignLeftOutlined /></span>
                </div>
              </div>
              <div className="comment">
                <div className="comment-pic">
                  <img src="https://secure.gravatar.com/avatar/4139e1d0136c2421ad5a5bece95f2d7d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTA-4.png" alt="Profile image of Taj Al Den Ajek" style={{ borderRadius: "50%" }} />
                </div>
                <div className="comment-input">
                  <Input placeholder="Add a comment..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} onKeyDown={handleCreateComment}
                    style={{
                      width: '722px',
                      height: '40px',
                    }} />
                  <span><span style={{ fontWeight: 'bold' }}>Pro tip:</span> press <span style={{ fontWeight: 'bold', color: '#44546F', backgroundColor: '#091E420F', width: '19px', height: '16px' }}>M</span> to comment </span>
                </div>
              </div>
              <div className="sub-col-row" style={{ width: '750px', height: '250px' }}>
                <CommentsContainer taskId={task.id} />
              </div>
            </div>
          </div>
          <div className="sub-col">
            <div className="sub-col-div">
              <Button key="button" type="primary">
                {taskContainerName}
                <DownOutlined style={{ fontSize: '75%' }} />
              </Button>
              <div className="sub-actions">
                <ThunderboltOutlined style={{ fontSize: '150%' }} />
                Actions
                <DownOutlined style={{ fontSize: '77%', marginLeft: '-10px', marginTop: '5px' }} />
              </div>
            </div>
            <div className="sub-col-div">
              <div className="sub-col-div-sub">
                <div>
                  Pinned fields
                </div>
                <div>
                  <span>
                    Click on the <PushpinOutlined style={{ fontSize: '100%' }} />  next to a field label to start pinning.
                  </span>
                </div>
              </div>
              <div className="sub-col-div-sub">
                <CloseOutlined />
              </div>
            </div>
            <div className="sub-col-div">
              <div className="sub-col-div-sub">
                <div>
                  Details
                </div>
                <div>
                  <UpOutlined />
                </div>
              </div>
              <div className="sub-col-div-sub">
                <div className='sub-col-div-sub-row'>
                  <div>Assignee</div>
                  <div>
                    <div>
                      <img src="https://secure.gravatar.com/avatar/bb417d0b08f4e8314b3b11f591010698?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAO-6.png" alt="" style={{ borderRadius: "50%" }} />Ahmad Omar</div>
                    <div>Assign to me</div>
                  </div>
                </div>
                <div className='sub-col-div-sub-row'>
                  <div>Labels</div>
                  <div>None</div>
                </div>
                <div className='sub-col-div-sub-row'>
                  <div><span>Parent <span style={{ color: "#5E4DB2", fontSize: '11px', backgroundColor: '#F3F0FF', padding: '0px 4px', fontWeight: '700' }}>NEW</span></span></div>
                  <div>None</div>
                </div>
                <div className='sub-col-div-sub-row'>
                  <div>Fix versions</div>
                  <div>None</div>
                </div>
                <div className='sub-col-div-sub-row'>
                  <div>Development</div>
                  <div>
                    <div><strong >1</strong> branch</div>
                    <div><span><strong >14</strong> commits</span><span style={{ color: '#626F86', fontSize: '12px', marginLeft: '20px' }}>18 hours ago</span></div>
                    <div><span><strong >1</strong> pull request</span> <span style={{
                      color: ' #0C66E4',
                      backgroundColor: '#E9F2FF', fontSize: '11px', display: 'flex', alignItems: 'center', fontWeight: '700'
                    }}>OPEN</span></div>
                  </div>
                </div>
                <div className='sub-col-div-sub-row'>
                  Releases
                </div>
                <div className='sub-col-div-sub-row'>
                  <div>Reporter</div>
                  <div>
                    <div>
                      <div>
                        <img src="https://secure.gravatar.com/avatar/4139e1d0136c2421ad5a5bece95f2d7d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTA-4.png" alt="Profile image of Taj Al Den Ajek" style={{ borderRadius: "50%" }} />
                      </div>
                      <div>Taj Al Den Ajek</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sub-col-div">
              <div>
                <div>
                  Created last week
                </div>
                <div>
                  Updated last week
                </div>
              </div>
              <div className='config'>
                <SettingFilled style={{ fontSize: '120%' }} /> Configure
              </div>
            </div>
          </div>
        </div>
      </Modal >
      <div key={task.id} className='task' ref={drag} {...collected} onClick={() => { setShowFloatingScreen(!showFloatingScreen) }}>
        <div className='task-title' >
          <div>
            {task.title}
          </div>
        </div>
        <div className="task-details">
          <div>
            <img src="https://tajaldenajek.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=small" alt="" />
            KAN-{task.id}
          </div>
          <div>
            <img src="https://secure.gravatar.com/avatar/bb417d0b08f4e8314b3b11f591010698?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAO-6.png" alt="" style={{ borderRadius: "50%", width: '24px' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;