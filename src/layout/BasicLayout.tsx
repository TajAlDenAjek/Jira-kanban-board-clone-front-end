import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { Layout } from 'antd';
import './basicLayout.css'

const BasicLayout: React.FC = () => {
  const content = (
    <>
      <NavBar></NavBar>
      <Layout>
        <SideBar></SideBar>
        <Layout.Content>
          <MainContent />
        </Layout.Content>
      </Layout>
    </>
  );
  return content;
};

export default BasicLayout;