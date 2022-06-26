import {geekblue, red} from '@ant-design/colors';
import styled from "styled-components";
import Layout, {Content, Header} from "antd/lib/layout/layout";
import {Card, Typography} from "antd";
import {TaskboardItemCardProps} from "./assets/Taskboard/Item";
import {TaskItem} from "./tasks";

export enum COLUMN_NAMES {
    TO_DO = 'To Do',
    IN_PROGRESS = 'In Progress',
    AWAITING_REVIEW = 'Awaiting review',
    DONE = 'Done',
}

export type TaskboardColProps = Pick<TaskboardItemCardProps,
    'onEdit' | 'onDelete'> & {
    items: TaskItem[];
    title: COLUMN_NAMES;
    onClickAdd?: VoidFunction;
};

export const colors = {
    primary: geekblue,
};

export const StyledLayout = styled(Layout)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
`;

export const StyledContent = styled(Content)`
  background-color: ${colors.primary[6]};
  display: flex;
  flex-direction: row;
`;


export const TaskboardColRoot = styled(Card)`
  user-select: none;
  flex: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  // To force each flex item to have equal width
  // even if they have long texts with no spaces etc.
  min-width: 0;
  > .ant-card-body {
    overflow: hidden;
    height: 100%;
    padding: 0;
  }
`;

export const DeleteMenuItem = styled.div`
  color: ${red.primary};
`;

export const TaskboardRoot = styled.div`
  min-height: 0;
  height: 100%;
  min-width: 80%;
  margin: auto;
`;

export const TaskboardContent = styled.div`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
`;

export const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.5rem;
`;

export const TaskboardItemCardTitle = styled(Typography.Title)`
  white-space: pre-wrap;
  // To make ellipsis of the title visible.
  // Without this margin, it can be go behind the "extra" component.
  // So, we give it a little space.
  margin-right: 0.25rem;
`;

export interface DroppableRootProps {
    isDraggingOver: boolean;
}

export const DroppableRoot = styled.div<DroppableRootProps>`
  height: 100%;
  overflow-y: auto;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? colors.primary[2] : colors.primary[1]};
`;
