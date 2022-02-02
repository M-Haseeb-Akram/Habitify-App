export interface User {
  isAuthenticated: boolean,
  accessToken: string,
  user: {
    user_id: string,
    name: string,
    picture: string,
  },
  statusCode: number
}
