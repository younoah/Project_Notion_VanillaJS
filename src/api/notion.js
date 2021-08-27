import { request } from "./config/index.js";

async function getDocuments(id) {
  const url = id ? `/${id}` : "";
  return await request(url, { method: "GET" });
}

async function postDocument(document) {
  return await request("", {
    method: "POST",
    body: JSON.stringify(document),
  });
}

async function putDocument(id, document) {
  return await request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(document),
  });
}

async function deleteDocument(id) {
  return await request(`/${id}`, {
    method: "DELETE",
  });
}

export { getDocuments, postDocument, putDocument, deleteDocument };
