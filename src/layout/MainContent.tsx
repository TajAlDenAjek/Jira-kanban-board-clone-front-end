import { Breadcrumb, Layout, theme, Input, Avatar, Tooltip } from 'antd';
import { DownOutlined, UserAddOutlined, ThunderboltOutlined, StarOutlined, SwapOutlined, EllipsisOutlined, UserOutlined, CloudUploadOutlined, LineChartOutlined, DashOutlined, SearchOutlined } from '@ant-design/icons';
import Board from '../components/Board';
import './basicLayout.css';

const MainContent = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const content = (
        <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }} >
            <div className='content-container'>
                <Breadcrumb style={{ color: '#44546F' }} items={[
                    { title: 'Projects' },
                    { title: 'My Kanban Project' }
                ]} />
                <Layout.Content style={{ padding: '0 24px' }}>
                    <div className="upper-content">
                        <div style={{ marginTop: '10px' }}> <h2 style={{ color: '#172B4D' }}>KAN board</h2> </div>
                        <div className='upper-content-sub'>
                            <Tooltip title='Automation'>
                                <ThunderboltOutlined />
                            </Tooltip>
                            <Tooltip title='Add to Starred'>
                                <StarOutlined />
                            </Tooltip>
                            <Tooltip title='Enter full screen'>
                                <SwapOutlined />
                            </Tooltip>
                            <EllipsisOutlined />
                        </div>
                    </div>
                    <div className="content-search-start">
                        <div className='content-search-start-sub'>
                            <div className="first">
                                <Input placeholder="" suffix={<SearchOutlined style={{ width: '16px', height: '16px', }} />} style={{ width: '120px', height: '39.97px', marginTop: '10px' }} />
                                <Avatar.Group>
                                    <Avatar src="https://secure.gravatar.com/avatar/4139e1d0136c2421ad5a5bece95f2d7d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTA-4.png" style={{ width: '32px', zIndex: '1' }} />
                                    <Avatar src="https://secure.gravatar.com/avatar/bb417d0b08f4e8314b3b11f591010698?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAO-6.png" style={{ width: '32px' }} />
                                </Avatar.Group>
                                <Tooltip title='Add people'>
                                    <span className='content-invite-button' > <UserAddOutlined /> <div>Invite</div> </span>
                                </Tooltip>
                            </div>
                            <div className="second">
                                <p>GROUP BY</p>
                                <Tooltip title='None'>
                                    <div className='second-like-button' > None <DownOutlined /></div>
                                </Tooltip>
                                <Tooltip title='Import work'>
                                    <div className="second-like-button" > <CloudUploadOutlined />Import work</div>
                                </Tooltip>
                                <Tooltip title='Board insights'>
                                    <div className="second-like-button" > <LineChartOutlined />Insights</div>
                                </Tooltip>
                                <div className="second-like-button"> <DashOutlined />View settings</div>
                            </div>
                        </div>
                    </div>
                    <div className='board'> <Board /> </div>
                </Layout.Content>
            </div>
        </Layout>
    );
    return content;
}

export default MainContent