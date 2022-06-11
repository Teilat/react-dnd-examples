import {DragDropContext, DragDropContextProps} from "react-beautiful-dnd";
import {
    COLUMN_NAMES,
    StyledContent,
    StyledHeader,
    TaskboardColProps,
    TaskboardContent,
    TaskboardRoot
} from "../../constants";
import {Column} from "./Column";
import React, {useEffect, useMemo, useState} from "react";
import {TaskboardData, TaskItem} from "../../tasks";
import produce from "immer";
import {v4 as uuid} from 'uuid';
import {Button, Typography} from "antd";
import {TaskboardItemFormModal} from "./TaskboardItemFormModal";

let data: TaskboardData = {
    [COLUMN_NAMES.TO_DO]: [],
    [COLUMN_NAMES.IN_PROGRESS]: [],
    [COLUMN_NAMES.AWAITING_REVIEW]: [],
    [COLUMN_NAMES.DONE]: []
}

interface TaskboardProps {
    ProjectId: string,
}

export const Taskboard = ({
                              ProjectId,
                          }: TaskboardProps) => {

    useEffect(() => {
          fetch(`http://localhost:8080/api/v1/project/task?id=${ProjectId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    throw response
                }
            })
            .then(res => {
                let arr: TaskItem[] = JSON.parse(res)
                for (let i = 0; i < arr.length; i++) {
                    switch (arr[i].column as COLUMN_NAMES) {
                        case COLUMN_NAMES.TO_DO: {
                            data[COLUMN_NAMES.TO_DO].push(arr[i]);
                            break
                        }
                        case COLUMN_NAMES.IN_PROGRESS: {
                            data[COLUMN_NAMES.IN_PROGRESS].push(arr[i]);
                            break
                        }
                        case COLUMN_NAMES.AWAITING_REVIEW: {
                            data[COLUMN_NAMES.AWAITING_REVIEW].push(arr[i]);
                            break
                        }
                        case COLUMN_NAMES.DONE: {
                            data[COLUMN_NAMES.DONE].push(arr[i]);
                            break
                        }
                    }
                }
                return data
            })
            .then(d => {
                setItems(d)
            })
            .finally(() => {
                setLoaded(true)
            })
    }, [ProjectId]);

    const [items, setItems] = useState<TaskboardData>(data);

    const [isLoaded, setLoaded] = useState(false)

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

    const [itemToEdit, setItemToEdit] = useState<TaskItem | null>(null);

    const openTaskItemModal = (itemToEdit: TaskItem | null) => {
        setItemToEdit(itemToEdit);
        setIsModalVisible(true);
    };

    const closeTaskItemModal = () => {
        setItemToEdit(null);
        setIsModalVisible(false);
    };

    const initialValues = useMemo(
        () => ({
            title: itemToEdit?.title ?? '',
            description: itemToEdit?.description ?? '',
        }),
        [itemToEdit]
    );

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

    if (!isLoaded) {
        return (<div></div>)
    } else {
        return (
            <>
                <StyledHeader>
                    <Typography.Title level={3} type="secondary">
                        Drag & Drop Taskboard
                    </Typography.Title>
                    <Button type="primary">userName</Button>
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
                                            status === COLUMN_NAMES.TO_DO
                                                ? () => openTaskItemModal(null)
                                                : undefined
                                        }
                                        onDelete={handleDelete}
                                        onEdit={closeTaskItemModal}/>
                                ))}
                            </TaskboardContent>
                        </TaskboardRoot>
                    </DragDropContext>
                    <TaskboardItemFormModal
                        visible={isModalVisible}
                        onCancel={closeTaskItemModal}
                        onOk={(values) => {
                            setItems((current) =>
                                produce(current, (draft) => {
                                    if (itemToEdit) {
                                        // Editing existing item
                                        const draftItem = Object.values(draft)
                                            .flatMap((items) => items)
                                            .find((item) => item.id === itemToEdit.id);
                                        if (draftItem) {
                                            draftItem.title = values.title;
                                            draftItem.description = values.description;
                                        }
                                    } else {
                                        // Adding new item as "to do"
                                        draft[COLUMN_NAMES.TO_DO].push({
                                            id: uuid(),
                                            projectId: uuid(),
                                            title: values.title,
                                            description: values.description,
                                            column: COLUMN_NAMES.TO_DO
                                        });
                                    }
                                })
                            );
                        }}
                        initialValues={initialValues}
                    />
                </StyledContent>
            </>
        )
    }
}