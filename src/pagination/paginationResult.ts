export interface PaginationResult<Task> {
  items: Task[]; // Mảng dữ liệu của trang hiện tại
  totalItems: number; // Tổng số bản ghi
  totalPages: number; // Tổng số trang
  currentPage: number;
  itemsPerPage: number;
}
