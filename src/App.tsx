import {Typography, Button} from 'antd';
import React, {useState} from 'react';
import {DragDropContext, DragDropContextProps} from 'react-beautiful-dnd';
import './assets/styles/App.css';
import "antd/dist/antd.css";
import {COLUMN_NAMES, StyledLayout, StyledHeader, StyledContent, TaskboardRoot, TaskboardContent} from "./constants";
import {ProjectItem, tasks} from "./tasks";
import produce from "immer";
import {Column, TaskboardColProps} from "./assets/Taskboard/Column";
import {MovableItem} from "./assets/Taskboard/Item";

export const App = () => {

    const [items, setItems] = useState(tasks);

    const onDragEnd: DragDropContextProps['onDragEnd'] = ({
        source,
        destination,
    }) => {
        setItems((current) =>
            produce(current, (draft) => {
                // dropped outside the list
                if (!destination) {
                    return;
                }
                const [removed] = draft[
                    source.droppableId as COLUMN_NAMES
                    ].splice(source.index, 1);
                draft[destination.droppableId as COLUMN_NAMES].splice(
                    destination.index,
                    0,
                    removed
                );
            })
        );
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [itemToEdit, setItemToEdit] = useState<ProjectItem | null>(null);


    const openTaskItemModal = (itemToEdit: ProjectItem | null) => {
        setItemToEdit(itemToEdit);
        setIsModalVisible(true);
    };

    const closeTaskItemModal = () => {
        setItemToEdit(null);
        setIsModalVisible(false);
    };

    const handleDelete: TaskboardColProps['onDelete'] = ({
        status,
        itemToDelete,
    }) =>
        setItems((current) =>
            produce(current, (draft) => {
                draft[status] = draft[status].filter(
                    (item) => item.id !== itemToDelete.id
                );
            })
        );

    return (
        <>
            <StyledLayout>
                <StyledHeader>
                    <Typography.Title level={3} type="secondary">
                        Drag & Drop Taskboard
                    </Typography.Title>
                    <Button type="primary">Primary Button</Button>
                </StyledHeader>
                <StyledContent>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <TaskboardRoot>
                            <TaskboardContent>
                                {Object.values(COLUMN_NAMES).map((status) => (
                                    <Column
                                        key={status}
                                        title={status}
                                        items={items[status]}
                                        onClickAdd={
                                            status === COLUMN_NAMES.DO_IT
                                                ? () => openTaskItemModal(null)
                                                : undefined
                                        }
                                        onDelete={handleDelete}
                                        onEdit={null}/>
                                ))}
                            </TaskboardContent>
                        </TaskboardRoot>
                    </DragDropContext>
                </StyledContent>
            </StyledLayout>
        </>
    );
}
