
import React, { useEffect, useState } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

import {
    List, Avatar,
    Card, Spin, Button
} from 'antd';
import {
    UserAddOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

function Students(props) {
    console.log('props', props)
    const [students, setStudents] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    useEffect(() => {
        props.getListOfUser('students')
    }, [])

    useEffect(() => {

        if (props?.isPending) {

            setIsLoader(true)
        } else {
            setIsLoader(false)
            setStudents([])
        }
    }, [props.isPending])
    useEffect(() => {

        if (props?.users.length > 0) {
            setIsLoader(false)
            setStudents(props.users)
        }
    }, [props.users])

    return (
        <>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ float: 'right' }} type="primary" onClick={() => props.history.push('/user-form/student')}><UserAddOutlined /></Button>

            </div>
            <div>
                <h2>Students</h2>
            </div>
            <div style={{ marginTop: '40px' }}>
                <div>
                    {!isLoader ? <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={students}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                        description={item.email}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card> :
                        <Card>
                            <div className="example">
                                <Spin />
                            </div>

                        </Card>}

                </div>

            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        isPending: state.user.isPending,
        users: state.user.users
    }
};

export default connect(mapStateToProps, actions)(Students);
