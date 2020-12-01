import React from 'react';
import { Layout, Menu } from 'antd';
import './navbar.css'
const { Header} = Layout;
const Navbar = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><a href="/">Articles</a></Menu.Item>
                    <Menu.Item key="2"><a href="/create">Create Article</a></Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
}

export default Navbar;