import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {COMMENT} from '../constants';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Discussion extends Component {
    state = {
        collapsed: false,
        comments: [],
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    getPost() {
        fetch(`${COMMENT}/comments`, {
            method: 'GET',
            headers: {
                // Accept: `*/*`,
                // Accept-Encoding: `gzip, deflate`,
                // Accept-Language: `en-US,en;q=0.9`,
                // Cache-Control: `max-age=0`,
                // Connection: `keep-alive`,
                // Host: `34.237.218.116:8080`,
                // Upgrade-Insecure-Requests: `1`,
                // User-Agent: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load comments.');
        }).then((data) => {
            console.log(data);
            this.setState({
                comments: data ? data : [],
            })
        }).catch((error) => {
            this.setState({
                errorMessage: error.message,
            })

        })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                  <span>User</span>
                </span>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                  {/*<TeamOutlined />*/}
                  <span>Team</span>
                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.getPost()}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Discussion;