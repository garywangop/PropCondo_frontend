import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, CommentOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { Row, Col } from 'antd';
import '../styles/Post.css';
import {API_ROOT} from "../constants";
const { TextArea } = Input;
// list card input collapse

// comment list component
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

// comment editor component
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class Post extends React.Component {
    state = {
        comments: [],
        posts: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    callback = (key) => {
        console.log(key);
    }

    addComments = () => {
        alert('sdfsd');
    };

    getPost() {
        fetch(`${API_ROOT}/posts`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts.');
        }).then((data) => {
            console.log(data);
            this.setState({
                posts: data ? data : [],
            });
        }).catch((error) => {
            console.log(error.message);
        });
    }

    getComments() {
        fetch(`${API_ROOT}/comments/2`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load comments.');
        }).then((data) => {
            console.log(data);
            if (data) {
                let newComment = {
                    author: `@${data.to_whom_id} Roy`,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{data.text}</p>,
                    datetime: data.time,
                };
                this.setState({
                    comments: [newComment],
                });
            }
        }).catch((error) => {
            console.log(error.message);
        });
    }

    componentDidMount() {
        this.getPost();
        this.getComments();
    }

    render() {
        const { comments, submitting, value, posts } = this.state;
        const { Meta } = Card;
        const { Panel } = Collapse;
        const text =
            `
              A dog is a type of domesticated animal.
              Known for its loyalty and faithfulness,
              it can be found as a welcome guest in many households across the world.
            `;
        return (
            <div>
                {
                    posts.map((post, index) => {
                        return (
                            <Row key={index}>
                                <Col span={24}>
                                    {post.post_id}
                                    {/*post*/}
                                    <Card className='post-card'
                                          style={{ width: '65%' }}
                                          actions={[
                                              <SettingOutlined key="setting" />,
                                              <CommentOutlined key="edit" onClick={this.addComments} />,
                                              <EllipsisOutlined key="ellipsis" />,
                                          ]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Post title"
                                            description={post.text}
                                        />
                                        <img className='post-image'
                                             alt="example"
                                             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        />
                                        <Collapse defaultActiveKey={['0']} onChange={this.callback}>
                                            <Panel header="Comments" key="1">
                                                {/*comment*/}
                                                {comments.length > 0 && <CommentList comments={comments} />}
                                                <Comment
                                                    avatar={
                                                        <Avatar
                                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                            alt="Han Solo"
                                                        />
                                                    }
                                                    content={
                                                        <Editor
                                                            onChange={this.handleChange}
                                                            onSubmit={this.handleSubmit}
                                                            submitting={submitting}
                                                            value={value}
                                                        />
                                                    }
                                                />
                                            </Panel>
                                        </Collapse>
                                    </Card>
                                </Col>
                            </Row>
                        );
                    })
                }
            </div>
        );
    }
}

export default Post;