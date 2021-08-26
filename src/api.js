const API_END_POINT = `https://Kdt.roto.codes`;

export async function getDocuments() {
  try {
    const result = await fetch(`${API_END_POINT}/documents`, {
      headers: { "x-username": "roto" },
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
      headers: { "x-username": "roto" },
    });
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    alert("서버와 통신 원할하지않습니다.");
  }
}
