import React from "react";
import {COLUMN_NAMES, StyledCard, TaskboardItemCardTitle} from "../../constants";
import {TaskItem} from "../../tasks";
import BaseTooltip from "../../BaseTooltip";

export interface TaskboardItemCardProps {
    item: TaskItem;
    isDragging: boolean;
    onEdit: (itemToEdit: TaskItem) => void;
    onDelete: (args: {
        status: COLUMN_NAMES;
        itemToDelete: TaskItem;
    }) => void;
}

export const MovableItem = ({
    item,
    isDragging,
    onEdit,
    onDelete,
}: TaskboardItemCardProps) => {
    return (
        <StyledCard
            size="small"
            title={
                <BaseTooltip overlay={item.title}>
                    <span>
                        <TaskboardItemCardTitle level={5} ellipsis={{rows: 2}}>
                          {item.title}
                        </TaskboardItemCardTitle>
                    </span>
                </BaseTooltip>
            }
        >
            <BaseTooltip overlay={item.description}>
                    {item.description}
            </BaseTooltip>
        </StyledCard>
    )
}
