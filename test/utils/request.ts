export const DefaultHeader = (accessToken: string) => ({
  Accept: 'application/json',
  Authorization: `Bearer ${accessToken}`
})
