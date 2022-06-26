import {Button, Tree, Typography} from "antd";
import Taskboard from "./Taskboard";
import "../styles/App.css"
import {
    StyledContent,
    StyledHeader,
} from "../../constants";
import Cookies from 'js-cookie'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface TaskboardTreeProps {
    ProjectId: number,
}

function TaskboardTree({
                           ProjectId,
                       }: TaskboardTreeProps) {
    const [treeItems, setTreeItems] = useState(null)
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const dataList = [];
    const defaultData = [];
    const navigate = useNavigate()

    useEffect(() => {

        fetch(`http://localhost:8080/project/tree`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                if (response.ok) {
                    return response.text()
                } else {
                    if (JSON.parse(await response.text())["content"] === "Please login first") {
                        navigate("/login", {replace: true})
                    }
                    throw response
                }
            })
            .then(res => {
                setTreeItems(JSON.parse(res))
            })
    },[])

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const getParentKey = (key, tree) => {
        let parentKey;

        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];

            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }

        return parentKey;
    };

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const handleLogout = () => {
        fetch(`http://localhost:8080/logout`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Accept: 'application/json',
            }
        }).then(res => {
            if (res.ok) {
                Cookies.remove("token")
                navigate("/login", {replace: true})
            }
        })
    };

    return (
        <>
            <StyledHeader>
                <Typography.Title level={3} type="secondary">
                </Typography.Title>
                <Button type="primary" onClick={() => handleLogout()}>Logout</Button>
            </StyledHeader>
            <StyledContent>
                    <Tree
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onSelect={onSelect}
                        treeData={treeItems}
                    />
                <Taskboard ProjectId={ProjectId}/>
            </StyledContent>
        </>
    )
}

export default TaskboardTree;
