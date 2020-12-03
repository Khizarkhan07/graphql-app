import React, {useCallback, useMemo} from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import {GET_ARTICLES, DELETE_ARTICLE, GET_ARTICLES_SUB} from "../queries";
import { PageHeader, Button, Descriptions, Spin , Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {HeaderWrapper} from "./Home.styles";

type article = {
    _id: string,
    title : string,
    body: string,
    createdAt: string
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Subscription:React.FC = () =>  {
    /*const articles = useQuery(GET_ARTICLES);*/
    const articles = useSubscription(GET_ARTICLES_SUB);
    console.log(articles)
    const [deleteArticle, { loading: deleting, error: deleteError }] = useMutation(DELETE_ARTICLE);
    const renderArticles = useMemo(()=> {
        if(!articles.loading) {
            return (
                <HeaderWrapper>
                    <PageHeader
                        ghost={false}
                        title= {articles.data.articleAdded.title}
                        subTitle={articles.data.articleAdded.body.substr(0,10)}
                        extra={[
                            <Button key={'2'} type="link">
                                <a href={`edit/${articles.data.articleAdded._id}`}>Edit</a>
                            </Button>,
                            <Popconfirm
                                key={'1'}
                                onConfirm={() => handleDelete(articles.data.articleAdded._id)}
                                title="Are you sure？"
                                okText="Yes"
                                cancelText="No">
                                <Button danger>
                                    Delete
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="id">
                                <a>{articles.data.articleAdded._id}</a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Creation Time">{new Date(articles.data.articleAdded.createdAt).toLocaleTimeString()}</Descriptions.Item>
                            <Descriptions.Item label="Update Time">{new Date(articles.data.articleAdded.createdAt).toLocaleTimeString()}</Descriptions.Item>
                            <Descriptions.Item label="Article">
                                <i>{articles.data.articleAdded.body}</i>
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </HeaderWrapper
                >
            )
        }

    },[articles.data])

    const handleDelete = useCallback( (id: string)=> {
        deleteArticle({ variables: { id: id } }).then((result)=> {
            window.location.href= '/'
        });
    }, [articles.data])

    if (articles.error) return <React.Fragment>Error :(</React.Fragment>;
    if (articles.loading) return <React.Fragment>LISTENING ...</React.Fragment>;


    return (
        <div className={"container"}>
            {renderArticles}
        </div>
    );
}

export default Subscription;