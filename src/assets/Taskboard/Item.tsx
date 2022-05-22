import React from "react";
import {COLUMN_NAMES, StyledCard, TaskboardItemCardTitle} from "../../constants";
import {ProjectItem} from "../../tasks";
import BaseTooltip from "../../BaseTooltip";

export interface TaskboardItemCardProps {
    item: ProjectItem;
    isDragging: boolean;
    title: COLUMN_NAMES;
    onEdit: (itemToEdit: ProjectItem) => void;
    onDelete: (args: {
        status: COLUMN_NAMES;
        itemToDelete: ProjectItem;
    }) => void;
}

export const MovableItem = ({
    item,
    title,
    isDragging,
    onEdit,
    onDelete,
}: TaskboardItemCardProps) => {
    return (
        <StyledCard
            size="small"
            title={
                <BaseTooltip overlay={item.name}>
                    <span>
                        <TaskboardItemCardTitle level={5} ellipsis={{rows: 2}}>
                          {item.name}
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
