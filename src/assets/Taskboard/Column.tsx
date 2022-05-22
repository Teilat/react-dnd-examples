import {COLUMN_NAMES, TaskboardColRoot, DroppableRoot} from "../../constants";
import React from "react";
import {Button} from "antd";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {MovableItem, TaskboardItemCardProps} from "./Item";
import {ProjectItem} from "../../tasks";

export type TaskboardColProps = Pick<TaskboardItemCardProps,
    'onEdit' | 'onDelete'> & {
    items: ProjectItem[];
    title: COLUMN_NAMES;
    onClickAdd?: VoidFunction;
};

export const Column = ({
    items,
    title,
    onClickAdd,
    onEdit,
    onDelete,
}: TaskboardColProps) => {
    return (
        <TaskboardColRoot
            title={`${title} (${items.length})`}
            extra={
                <Button type="primary">
                    Add
                </Button>
            }>
            <Droppable droppableId={title}>
                {(provided, snapshot) => (
                    <DroppableRoot
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {items
                            .map((item, index) => {
                                return (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div key={item.id}
                                                 ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}>
                                                <MovableItem
                                                    item={item}
                                                    isDragging={snapshot.isDragging}
                                                    onDelete={onDelete}
                                                    onEdit={onEdit}
                                                    title={title}/>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })
                        }
                        {provided.placeholder}
                    </DroppableRoot>
                )}
            </Droppable>
        </TaskboardColRoot>
    )
}