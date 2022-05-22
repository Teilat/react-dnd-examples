import {COLUMN_NAMES} from "./constants";
import {v4 as uuid} from 'uuid';

export interface ProjectItem {
    // @ts-ignore
    id: uuid;
    // @ts-ignore
    parentId: uuid;
    name: string;
    description: string;
    creationDate: number;
    ownerId: uuid;
}

export type TaskboardData = Record<COLUMN_NAMES, ProjectItem[]>;

export let tasks: TaskboardData =
    {
        [COLUMN_NAMES.DO_IT]:
            [{
                id: uuid(),
                name: 'Item 1',
                parentId: uuid(),
                description: "desc",
                creationDate: Date.now(),
                ownerId: uuid()
            }],
        [COLUMN_NAMES.IN_PROGRESS]:
            [
                {
                    id: uuid(),
                    name: 'Item 2',
                    parentId: uuid(),
                    description: "desc",
                    creationDate: Date.now(),
                    ownerId: uuid()
                },
                {
                    id: uuid(),
                    name: 'Item 4',
                    parentId: uuid(),
                    description: "desc",
                    creationDate: Date.now(),
                    ownerId: uuid()
                }
            ],
        [COLUMN_NAMES.DONE]:
            [{
                id: uuid(),
                name: 'Item 3',
                parentId: uuid(),
                description: "desc",
                creationDate: Date.now(),
                ownerId: uuid()
            }],
        [COLUMN_NAMES.AWAITING_REVIEW]:
            [],
    };