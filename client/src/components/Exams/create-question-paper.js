import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Table, Row, Col } from 'antd';
import * as actions from '../../actions'
import { connect } from 'react-redux';
const { Column, ColumnGroup } = Table;

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


function CreateQuestionPaper(props) {
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState([])
    const [newQuestions, setNewQuestions] = useState([])
    const { id,
        subject_id,
        grade_id, } = props.match.params;

    useEffect(() => {
        let examDet = {
            exam_id: id,
            subject_id,
            grade_id
        }
        props.getQuestionPaper(examDet)
    }, [])

    useEffect(() => {
        // if (props.questionPaperSave.length > 0) {
        //     props.history.push('/exams')
        // }
    }, [props.questionPaperSave])

    useEffect(() => {

    }, [props.isGetQPaper])

    useEffect(() => {
        let Qarray = []
        if (props.questionPaper) {

            props.questionPaper.forEach(q => {
                Qarray.push({
                    question: q.question,
                    right_answer: q.right_answer,
                    a: q.options.a,
                    b: q.options.b,
                    c: q.options.c,
                    d: q.options.d,
                })
            });
            setQuestions(Qarray)
        }
    }, [props.questionPaper])
    const onFinish = (values) => {
        let arryOfQue = JSON.parse(JSON.stringify(newQuestions))
        arryOfQue.push(values)

        setNewQuestions(arryOfQue)
        setQuestions([...questions, ...arryOfQue])
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const saveQuestionPaper = () => {

        console.log(props, questions, newQuestions)
        let Qpaper = []

        newQuestions.forEach((que) => {

            Qpaper.push({
                exam_id: id,
                subject_id,
                grade_id,
                question: que.question,
                right_answer: que.right_answer,
                options: {
                    a: que.a,
                    b: que.b,
                    c: que.c,
                    d: que.d
                }
            })
        })

        props.createQuestionPaper(Qpaper)
    }


    return (
        <div>
            <div >
                <Row>
                    <Col span={24}>
                        <div style={{ margin: '20px 400px 0px 0px' }}>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Question"
                                    name="question"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Option A"
                                    name="a"
                                    rules={[
                                        {
                                            required: true
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Option B"
                                    name="b"
                                    rules={[
                                        {
                                            required: true
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Option C"
                                    name="c"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Option D"
                                    name="d"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>


                                <Form.Item
                                    name="right_answer"
                                    label="Answer"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select a option "
                                        allowClear
                                    >
                                        <Option value='a'>A</Option>
                                        <Option value="b">B</Option>
                                        <Option value="c">C</Option>
                                        <Option value="d">D</Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Add To Question Bank
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Table dataSource={questions}>
                            <Column title="Question" dataIndex="question" key="question" />
                            <Column title="Answer" dataIndex="right_answer" key="right_answer" />
                            <Column title="A" dataIndex="a" key="a" />
                            <Column title="B" dataIndex="b" key="b" />
                            <Column title="C" dataIndex="c" key="c" />
                            <Column title="D" dataIndex="d" key="d" />
                        </Table>
                    </Col>
                </Row>

            </div>
            <Row>
                <Col span={24}>
                    {questions.length > 0 && <Button type="primary" onClick={() => saveQuestionPaper()}>
                        Save Question Paper
                    </Button>}
                </Col>
            </Row>


        </div>

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

        isCreateQPaper: state.exam.isCreateQPaper,
        questionPaperSave: state.exam.questionPaperSave,

        isGetQPaper: state.exam.isGetQPaper,
        questionPaper: state.exam.questionPaper,
    }
};
export default connect(mapStateToProps, actions)(CreateQuestionPaper);

