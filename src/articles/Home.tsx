import React, {useCallback, useMemo} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {GET_ARTICLES, DELETE_ARTICLE} from "../queries";
import { PageHeader, Button, Descriptions, Spin , Popconfirm } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css'
type article = {
    _id: string,
    title : string,
    body: string,
    createdAt: string
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Home:React.FC = () =>  {
    const articles = useQuery(GET_ARTICLES);
    const [deleteArticle, { loading: deleting, error: deleteError }] = useMutation(DELETE_ARTICLE);
    const renderArticles = useMemo(()=> {
        return articles.data?.articles.map ((article: article)  => {
                return (
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={false}
                            title= {article.title}
                            subTitle={article.body.substr(0,10)}
                            extra={[
                                <Button key={'2'} type="link">
                                    <a href={`edit/${article._id}`}>Edit</a>
                                </Button>,
                                <Popconfirm
                                    key={'1'}
                                    onConfirm={() => handleDelete(article._id)}
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
                                    <a>{article._id}</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="Creation Time">{new Date(article.createdAt).toLocaleTimeString()}</Descriptions.Item>
                                <Descriptions.Item label="Update Time">{new Date(article.createdAt).toLocaleTimeString()}</Descriptions.Item>
                                <Descriptions.Item label="Article">
                                    <i>{article.body}</i>
                                </Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </div>
                )
            })

    },[articles.data])

    const handleDelete = useCallback( (id: string)=> {
        deleteArticle({ variables: { id: id } }).then((result)=> {
            window.location.href= '/'
        });
    }, [articles.data])

    if (articles.loading ) return <Spin indicator={antIcon} />;
    if (articles.error) return <React.Fragment>Error :(</React.Fragment>;


    return (
        <div className={"container"}>
            {renderArticles}
        </div>
    );
}

export default Home;