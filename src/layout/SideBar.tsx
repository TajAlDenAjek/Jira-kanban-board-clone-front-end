import { Layout, Menu } from 'antd';
import { sideBarList } from './ItemsLists';
import './basicLayout.css'


const SideBar = () => {
  const content = (
    <Layout.Sider style={{ backgroundColor: 'white' }} width={240} className='sideBar'>
      <div className="upgrade-to-free">
        <div className="upgrade-to-free-sub">
          <img src='https://tajaldenajek.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=small' />
          <div className='kanban-project'>
            <h4>My Kanban Project</h4>
            <p>Software prject</p>
          </div>
        </div>
        <p style={{ margin: '30px 0px 0px 40px', fontWeight: 'normal', fontSize: 'smaller' }}>You're on the Free plan</p>
        <button>UPGRADE</button>
      </div>
      <Menu mode="inline" defaultSelectedKeys={['1']} items={sideBarList} />
      <div className="sider-last">
        <p>You're in a team managed project</p>
        <p>Learn more</p>
      </div>
    </Layout.Sider>
  );

  return content;
}

export default SideBar
