import { untracked } from "@angular/core";

export interface TodoResponse {
    id: number;
    title: string;
    body: string;
    state: number;
    category_name: string;
}
