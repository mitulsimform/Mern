
import React, { useEffect, useState } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

import {
    List,
    Card, Spin, Button
} from 'antd';
import {
    UserAddOutlined,
} from '@ant-design/icons';

function Exams(props) {
    const [examsList, seExamList] = useState([])
    const [isLoader, setIsLoader] = useState(false)
    useEffect(() => {
        props.getExamsList()
    }, [])

    useEffect(() => {

        if (props?.isPending) {

            setIsLoader(true)
        } else {
            setIsLoader(false)
            seExamList([])
        }
    }, [props.isPending])
    useEffect(() => {

        if (props?.examList.length > 0) {
            setIsLoader(false)
            seExamList(props.examList)
        }
    }, [props.examList])

    return (
        <>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ float: 'right' }} type="primary" onClick={() => props.history.push('/create-exam')}><UserAddOutlined /></Button>
            </div>
            <div>
                <h2>Exams</h2>
            </div>
            <div style={{ marginTop: '40px' }}>
                <div>
                    {!isLoader ? <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={examsList}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a onClick={() => props.history.push(`${props.role === 3 ? '/question-paper' : '/create-question-paper'}/${item._id}/${item.subject_id}/${item.grade_id}`)}>{item.subject}</a>}
                                        description={item.grade}
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
        isPending: state.exam.isPending,
        examList: state.exam.examList
    }
};

export default connect(mapStateToProps, actions)(Exams);
