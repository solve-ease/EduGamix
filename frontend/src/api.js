const { VITE_BACKEND_URL } = import.meta.env
export const createUser = async (user) => {
  const response = await fetch(`${VITE_BACKEND_URL}/user/add-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (!response.ok) {
    throw new Error('Could not create user')
  }

  return response.json()
}
