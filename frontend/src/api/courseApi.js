import { api } from "../lib/axios";

export const getAllCourses = async () => {
  const res = await api.get("/admin/courses");
  return res.data;
};

export const getCourseBySlug = async (slug) => {
  const res = await api.get(`/admin/courses?slug=${slug}`);
  return res.data[0];
};
