import React from 'react';
import { Layout, Menu } from 'antd';
import './navbar.css'
const { Header} = Layout;
const Navbar = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Articles</Menu.Item>
                    <Menu.Item key="2">Create Article</Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
}

export default Navbar;