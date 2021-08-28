export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'roto',
      },
      ...options,
    })

    if (res.ok) {
      return res.json()
    }
  } catch (e) {
    console.log(e)
  }
}

export const requestGET = (url, options) => {
  return request(url, options)
}
