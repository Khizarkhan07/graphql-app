import React, {useCallback, useState} from 'react';
import {Button, Col, Divider, Input, Row} from "antd";
import {article} from "./EditArticle";
import {useMutation} from "@apollo/react-hooks";
import {ADD_ARTICLE} from "../queries";
const { TextArea } = Input;

const CreateArticle = () => {
    const [state, setState] = useState<article>({title: '', body: ''})
    const [addArticle, { loading: editing, error: editError }] = useMutation(ADD_ARTICLE);

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }, [state])

    const handleSubmit = useCallback(() =>{
        addArticle({variables: {title: state.title, body: state.body}}).then(result => {
            window.location.href= '/'
        })
    },[state])

    return (
        <div>
            <Divider orientation="left">Create</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>

                </Col>
                <Col className="gutter-row" span={12}>
                    <form>
                        <div className="form-group col-md-12">
                            <label htmlFor="title"><h6>Article Title</h6></label>
                            <Input placeholder="Enter Article Title" name= "title" value={state.title} onChange={handleChange}/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="body"><h6>Article Body</h6></label>
                            <TextArea
                                name="body"
                                onChange={handleChange}
                                placeholder="Article goes here"
                                value={state.body}
                                autoSize={{ minRows: 5 }}
                            />
                        </div>
                        <div className={"form-group col-md-12"}>
                            <Button
                                type={"primary"}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>

                    </form>


                </Col>
                <Col className="gutter-row" span={6}>

                </Col>
            </Row>
        </div>
    );
}

export default CreateArticle;