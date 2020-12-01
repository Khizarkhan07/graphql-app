import React, {useCallback, useState} from 'react';
import {RouteComponentProps} from "react-router";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {EDIT_ARTICLE, VIEW_ARTICLE} from "../queries";
import {Row, Col, Divider, Input, Spin,  Button} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
const { TextArea } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export type article = {
    title: string,
    body: string
}

const EditArticle: React.FC<RouteComponentProps<any>> = (props) => {

    const [state, setState] = useState<article>({title: '', body: ''})

    const { data, loading, error } = useQuery(VIEW_ARTICLE, {
        variables: { id: props.match.params.id }, onCompleted(data ){
                setState({title: data.singleArticle.title, body: data.singleArticle.body})
        }
    });

    const [editArticle, { loading: editing, error: editError }] = useMutation(EDIT_ARTICLE);

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }, [state])

    const handleSubmit = useCallback(() =>{
        editArticle({ variables: { id: props.match.params.id, title: state.title, body: state.body } }).
        then(result => {
            window.location.href = '/'
        })
    },[state])

    if (loading ) return <Spin indicator={antIcon} />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;


    return (
        <div>
            <Divider orientation="left">Edit</Divider>
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

export default EditArticle;