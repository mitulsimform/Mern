
import React, { useEffect, useState } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Card, Radio, Button, message, Spin } from 'antd';


function QuestionPaper(props) {

    const [questionPaper, setQuestionPaper] = useState([])
    const [answers, setAnswers] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [result, setResult] = useState({})
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

        if (props?.questionPaper) {
            setQuestionPaper(props.questionPaper)
        }
    }, [props.questionPaper])

    useEffect(() => {
        if (props.isSubmit) {
            setIsSaving(true)
        }
    }, [props.isSubmit])

    useEffect(() => {

        if (props.result._id) {

            setIsSaving(false)
            setResult(props.result)
        }
    }, [props.result])
    const onChange = (e, qp) => {
        let answersDetail = answers.find(a => a.question_id === qp._id)
        if (answersDetail) {
            let index = answers.findIndex(a => a.question_id === qp._id)
            let ans = JSON.parse(JSON.stringify(answers))
            ans[index] = { question_id: qp._id, submitted_answer: e.target.value }
            setAnswers(ans)
        } else {
            let ans = JSON.parse(JSON.stringify(answers))
            ans.push({ question_id: qp._id, submitted_answer: e.target.value })
            setAnswers(ans)
        }
        console.log('radio checked', e.target.value);
    };

    const onSubmit = () => {

        if (props.questionPaper.length !== answers.length) {
            message.error('Please complete all questions first')
            return
        }
        let ansObj = {
            "exam_id": id,
            "subject_id": subject_id,
            "grade_id": grade_id,
            "answers": answers
        }
        props.submittPaper(ansObj)

    }
    return (
        <div style={{ marginTop: '10px' }}>
            {!isSaving && !result._id && <div>

                {questionPaper.map(qp => {
                    return <div style={{ margin: '10px' }}>
                        <Card>
                            {console.log('qp', qp)}
                            <h2>{qp.question}</h2>
                            <Radio.Group onChange={(e) => onChange(e, qp)}>
                                <Radio value={'a'}>{qp.options.a}</Radio>
                                <Radio value={'b'}>{qp.options.b}</Radio>
                                <Radio value={'c'}>{qp.options.c}</Radio>
                                <Radio value={'d'}>{qp.options.d}</Radio>
                            </Radio.Group>
                        </Card>
                    </div>
                })}
                <div>
                    <Button type="primary" style={{ float: 'right' }} onClick={onSubmit}>
                        Submit Paper
                </Button>
                </div>
            </div>}
            {isSaving && <Card>
                <div className="example">
                    <Spin />
                </div>
            </Card>}

            {result._id && <Card>
                <div className="example">
                    <h5>Result: {result.result}/{result.total}</h5>
                </div>
            </Card>}



        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isGetQPaper: state.exam.isGetQPaper,
        questionPaper: state.exam.questionPaper,
        isSubmit: state.exam.isSubmit,
        result: state.exam.result,
    }
};

export default connect(mapStateToProps, actions)(QuestionPaper);
