import { useEffect, useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import * as actions from '../../actions'
import { connect } from 'react-redux';


const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};



function CreateExamForm(props) {
    const [grades, setGrades] = useState([])

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        props.getGradeList()
        props.getSubjectList()
    }, [])
    useEffect(() => {
        if (props?.grades.length > 0) {
            setGrades(props?.grades)
        }
    }, [props.grades])
    useEffect(() => {

        if (props?.subjects?.length > 0) {

            setSubjects(props?.subjects)
        }
    }, [props.subjects])

    useEffect(() => {
        if (props?.exam?._id) {
            props.history.push('/exams')
        }
    }, [props.exam])
    const [form] = Form.useForm();
    const onFinish = (values) => {

        props.createExam(values)
        console.log(values);
    };

    return (
        <div className='login-form'>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="subject_id"
                    label="Subject"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {subjects.map((sub) => {
                            if (props.role === 2 && props.subject_id === sub._id) {
                                return <Option value={sub._id}>{sub.name}</Option>
                            }
                            if (props.role === 1) {
                                return <Option value={sub._id}>{sub.name}</Option>
                            }
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="grade_id"
                    label="Grade"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {grades.map((gr) => {
                            if (props.role === 2 && props.grade_id === gr._id) {
                                return <Option value={gr._id} > {gr.grade}</Option>
                            }
                            if (props.role === 1) {
                                return <Option value={gr._id} > {gr.grade}</Option>
                            }
                        })}
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                    <Button type="danger" style={{ marginLeft: '10px' }} onClick={() => props.history.push('/exams')}>
                        Cancel
        </Button>
                </Form.Item>
            </Form>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        isCreateExamPending: state.exam.isCreateExamPending,
        exam: state.exam.exam,
        isGradePending: state.classConfig.isGradePending,
        grades: state.classConfig.grades,
        isSubjectsPending: state.classConfig.isSubjectsPending,
        subjects: state.classConfig.subjects,
    }
};
export default connect(mapStateToProps, actions)(CreateExamForm);

