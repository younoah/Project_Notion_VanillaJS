const API_END_POINT = `https://Kdt.roto.codes`;
const userName = "alajillo";
export async function getDocuments() {
  try {
    const result = await fetch(`${API_END_POINT}/documents`, {
      headers: { "x-username": userName },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}

export async function getDocumentById(id) {
  try {
    const result = await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: { "x-username": userName },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}

export async function updateDocumentById({ id, title, content }) {
  try {
    const result = await fetch(`${API_END_POINT}/documents/${id}`, {
      headers: { "x-username": userName, "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  } catch (e) {
    alert("서버와 통신이 원활하지않습니다.");
  }
}

export async function createDocument(parent = null) {
  try {
    let title = "새로운파일";
    if (parent) title = `${parent.title}의 하위 문서`;
    const result = await fetch(`${API_END_POINT}/documents`, {
      method: "POST",
      headers: { "x-username": userName, "Content-Type": "application/json" },
      body: JSON.stringify({
        // prettier-ignore
        "title": title,
        // prettier-ignore
        "parent": parent,
      }),
    });
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}

export async function deleteDocument(id) {
  try {
    await fetch(`${API_END_POINT}/documents/${id}`, {
      method: "DELETE",
      headers: { "x-username": userName },
    });
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}
