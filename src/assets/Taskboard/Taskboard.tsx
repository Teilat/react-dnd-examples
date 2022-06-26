import {DragDropContext, DragDropContextProps} from "react-beautiful-dnd";
import {
    COLUMN_NAMES,
    TaskboardColProps,
    TaskboardContent,
    TaskboardRoot
} from "../../constants";
import {Column} from "./Column";
import React, {useEffect, useMemo, useState} from "react";
import {TaskboardData, TaskItem} from "../../tasks";
import produce from "immer";
import TaskboardItemFormModal from "./TaskboardItemFormModal";
import {useNavigate} from "react-router-dom";

let data: TaskboardData = {
    [COLUMN_NAMES.TO_DO]: [],
    [COLUMN_NAMES.IN_PROGRESS]: [],
    [COLUMN_NAMES.AWAITING_REVIEW]: [],
    [COLUMN_NAMES.DONE]: []
}

interface TaskboardProps {
    ProjectId: number,
}

function Taskboard({
                       ProjectId,
                   }: TaskboardProps) {

    const [items, setItems] = useState<TaskboardData>(data);

    const [isLoaded, setLoaded] = useState(false)
    const [Reload, setReload] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [itemToEdit, setItemToEdit] = useState<TaskItem | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        setItems(null)

        fetch(`http://localhost:8080/project/task?id=${ProjectId}`, {
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
                    if (JSON.parse(await response.text())["content"] == "Please login first") {
                        navigate("/login", {replace: true})
                    }
                    throw response
                }
            })
            .then(res => {
                let data: TaskboardData = {
                    [COLUMN_NAMES.TO_DO]: [],
                    [COLUMN_NAMES.IN_PROGRESS]: [],
                    [COLUMN_NAMES.AWAITING_REVIEW]: [],
                    [COLUMN_NAMES.DONE]: []
                }
                let arr: TaskItem[] = JSON.parse(res)
                for (let i = 0; i < arr.length; i++) {
                    switch (arr[i].column as COLUMN_NAMES) {
                        case COLUMN_NAMES.TO_DO: {
                            if (!data[COLUMN_NAMES.TO_DO].includes(arr[i])) {
                                data[COLUMN_NAMES.TO_DO].push(arr[i]);
                            }
                            break
                        }
                        case COLUMN_NAMES.IN_PROGRESS: {
                            if (!data[COLUMN_NAMES.IN_PROGRESS].includes(arr[i])) {
                                data[COLUMN_NAMES.IN_PROGRESS].push(arr[i]);
                            }
                            break
                        }
                        case COLUMN_NAMES.AWAITING_REVIEW: {
                            if (!data[COLUMN_NAMES.AWAITING_REVIEW].includes(arr[i])) {
                                data[COLUMN_NAMES.AWAITING_REVIEW].push(arr[i]);
                            }
                            break
                        }
                        case COLUMN_NAMES.DONE: {
                            if (!data[COLUMN_NAMES.DONE].includes(arr[i])) {
                                data[COLUMN_NAMES.DONE].push(arr[i]);
                            }
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
                setReload(false)
            })

    }, [ProjectId, Reload]);

    const handleCreateTask = (item: TaskItem) => {
        fetch(`http://localhost:8080/task`, {
            method: 'POST',
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.ok) {
                setReload(true)
            }
        })
    }

    const handleUpdateTask = (item: TaskItem) => {
        fetch(`http://localhost:8080/task`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.ok) {
                setReload(true)
            }
        })
    }

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
                                    handleUpdateTask(draftItem)
                                } else {
                                    // Adding new item as "to do"
                                    let item: TaskItem = {
                                        id: 0,
                                        projectId: ProjectId,
                                        title: values.title,
                                        description: values.description,
                                        column: COLUMN_NAMES.TO_DO
                                    }
                                    draft[COLUMN_NAMES.TO_DO].push(item);
                                    handleCreateTask(item)
                                }
                            })
                        );
                    }}
                    initialValues={initialValues}
                />
            </>
        )
    }
}

export default Taskboard;
