import {COLUMN_NAMES} from "./constants";
import {v4 as uuid} from 'uuid';

export interface TaskItem {
    // @ts-ignore
    id: uuid;
    // @ts-ignore
    projectId: uuid;
    title: string;
    description: string;
    column: string;
}

export type TaskboardData = Record<COLUMN_NAMES, TaskItem[]>;

export const tasks: TaskboardData =
    {
        [COLUMN_NAMES.TO_DO]:
            [{
                id: uuid(),
                title: 'Item 1',
                projectId: uuid(),
                description: "desc",
                column: "TO_DO",
            }],
        [COLUMN_NAMES.IN_PROGRESS]:
            [
                {
                    id: uuid(),
                    title: 'Item 2',
                    projectId: uuid(),
                    description: "desc",
                    column: "IN_PROGRESS",
                },
                {
                    id: uuid(),
                    title: 'Item 4',
                    projectId: uuid(),
                    description: "desc",
                    column: "IN_PROGRESS",
                }
            ],
        [COLUMN_NAMES.DONE]:
            [{
                id: uuid(),
                title: 'Item 3',
                projectId: uuid(),
                description: "desc",
                column: "DONE",
            }],
        [COLUMN_NAMES.AWAITING_REVIEW]:
            [],
    };
