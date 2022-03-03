import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    LoginOutlined
} from '@ant-design/icons';
import * as actions from '../../actions'
const jwt = require('jsonwebtoken');


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        state = {
            collapsed: false,
            role: null,
            selected: '1',
            grade_id: null,
            subject_id: null
        }


        onCollapse = (collapsed) => {
            this.setState({ collapsed })

        };
        componentWillMount() {
            let token = localStorage.getItem('token')
            if (token) {
                const decode = jwt.verify(token, 'test');
                this.setState({ role: decode.role, grade_id: decode.grade_id, subject_id: decode.subject_id })
            }
            if (!this.props.authenticated) {
                this.props.history.push('/signin');
            }

            this.selectMenu(this.props.match.path)
        }

        selectMenu(location) {

            switch (location) {
                case '/dashboard':
                    this.setState({ selected: '1' })

                    // code block
                    break;
                case '/teachers':
                    this.setState({ selected: '2' })

                    // code block
                    break;
                case '/students':
                    this.setState({ selected: '3' })
                    // code block
                    break;
                case '/exams':
                    this.setState({ selected: '4' })
                    // code block
                    break;
                default:
                    this.setState({ selected: '5' })
                    break
                // code block
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        render() {
            console.log('process', process.env)
            let { collapsed } = this.state;


            return <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    {console.log('this.state.role', this.state.role)}
                    <Menu theme="dark" defaultSelectedKeys={[this.state.selected]} mode="inline">
                        <Menu.Item onClick={() => this.props.history.push('/teachers')} key="1" icon={<PieChartOutlined />}>
                            Dashboard
                  </Menu.Item>
                        {this.state.role === 1 && <Menu.Item onClick={() => this.props.history.push('/teachers')} key="2" icon={<PieChartOutlined />}>
                            Teachers
                  </Menu.Item>}
                        {(this.state.role === 1 || this.state.role === 2) && <Menu.Item key="3" onClick={() => this.props.history.push('/students')} icon={<DesktopOutlined />}>
                            Students
                  </Menu.Item>}

                        <Menu.Item key="4" onClick={() => this.props.history.push('/exams')} icon={<DesktopOutlined />}>
                            Exams
                  </Menu.Item>
                        <Menu.Item key="5" icon={<DesktopOutlined />}>
                            Others
                  </Menu.Item>


                        <Menu.Item key="6" onClick={() => {
                            localStorage.removeItem('token')
                            this.props.signoutUser()
                            this.props.history.push('/signin')
                        }} icon={<LoginOutlined />}>
                            Log Out
                  </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <ComposedComponent {...this.props} role={this.state.role} grade_id={this.state.grade_id} subject_id={this.state.subject_id} />
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>


        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps, actions)(Authentication);
}
