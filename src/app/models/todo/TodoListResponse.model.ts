import { untracked } from "@angular/core";

export interface TodoListResponse {
    id: number;
    title: string;
    body: string;
    state_code: number;
    category_name: string;
}
