import { CategoryResponse } from '../category/CategoryResponse.model';
export interface TodoListResponse {
  id: number;
  title: string;
  body: string;
  state_code: number;
  category: CategoryResponse;
}
