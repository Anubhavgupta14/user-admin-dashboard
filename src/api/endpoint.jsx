import Headers from "./Header";
import { ProcessAPI, Const } from "../utils/Constant";


export const createUser = async (body) => {
  const res = await fetch(Const.Link + "api/users", {
    method: "POST",
    body: body,
  });
  return res.json();
};

export const allList = async () => {
  const res = await fetch(Const.Link + `api/users`, new Headers("GET"));
  return ProcessAPI(res);
};
export const getUser = async (id) => {
  const res = await fetch(Const.Link + `api/users/${id}`, new Headers("GET"));
  return ProcessAPI(res);
};

export const editUser = async (id, body) => {
  const res = await fetch(Const.Link + `api/users/${id}`, {
    method: "PUT",
    body: body,
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(Const.Link + `api/users/${id}`, new Headers("DELETE"));
  return ProcessAPI(res);
};
