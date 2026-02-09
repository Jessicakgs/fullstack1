import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export interface TaskRequest {
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
}

export interface TaskResponse extends TaskRequest {
  id: number;
}

export interface TaskFilterRequest {
  pageSize?: number;
  pageNumber?: number;
  sort?: string;
  title?: string;
  status?: "PENDING" | "COMPLETED";
}

export interface SpringPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const useTasks = (filters: TaskFilterRequest) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const { data } = await api.post<SpringPage<TaskResponse>>(
        "/tasks/search",
        {
          ...filters,
        },
      );
      return data;
    },
  });
};

export const useTask = (id: number | undefined) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const { data } = await api.get<TaskResponse>(`/tasks/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: TaskRequest) => {
      const { data } = await api.post<TaskResponse>("/tasks", newTask);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TaskRequest }) => {
      const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.id] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
