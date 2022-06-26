import {COLUMN_NAMES} from "./constants";

export interface TaskItem {
    id: number;
    projectId: number;
    title: string;
    description: string;
    column: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    parentId: number;
    ownerId: number;
}

export type TaskboardData = Record<COLUMN_NAMES, TaskItem[]>;

export const tasks: TaskboardData =
    {
        [COLUMN_NAMES.TO_DO]:
            [{
                id: 1,
                title: 'Item 1',
                projectId: 1,
                description: "desc",
                column: "TO_DO",
            }],
        [COLUMN_NAMES.IN_PROGRESS]:
            [
                {
                    id: 2,
                    title: 'Item 2',
                    projectId: 1,
                    description: "desc",
                    column: "IN_PROGRESS",
                },
                {
                    id: 4,
                    title: 'Item 4',
                    projectId: 1,
                    description: "desc",
                    column: "IN_PROGRESS",
                }
            ],
        [COLUMN_NAMES.DONE]:
            [{
                id: 3,
                title: 'Item 3',
                projectId: 1,
                description: "desc",
                column: "DONE",
            }],
        [COLUMN_NAMES.AWAITING_REVIEW]:
            [],
    };
