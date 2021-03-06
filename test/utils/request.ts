// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const DefaultHeader = (accessToken: string) => ({
  Accept: 'application/json',
  Authorization: `Bearer ${accessToken}`
})
