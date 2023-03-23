import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

const {'token:nextauth': token} = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

api.interceptors.response.use((response) => {
  return response
},
 (error) => {
  if (error.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      const {'refreshToken:nextauth': refreshToken} = parseCookies()
      api.post('/refresh', {
        refreshToken
      })
      .then((response) => {
        const { token } = response.data
        setCookie(undefined, 'token:nextauth', token, {
          maxAge: 60 * 60 *24 * 30, //1 month
          path: '/'
        })
        setCookie(undefined, 'refreshToken:nextauth', response.data.refreshToken)
        api.defaults.headers['Authorization'] = `Bearer ${token}`
      })
    } else {
      //Deslogar usuário
    }
  }
 }
)