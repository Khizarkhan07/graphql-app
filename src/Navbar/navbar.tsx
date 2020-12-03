import React from 'react';
import { Layout, Menu } from 'antd';
const { Header} = Layout;
const Navbar: React.FC = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><a href="/">Articles</a></Menu.Item>
                    <Menu.Item key="2"><a href="/create">Create Article</a></Menu.Item>
                    <Menu.Item key="3"><a href="/sub">Sub</a></Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
}

export default Navbar;