import { signOut } from '@/context/AuthContext'
import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { AuthTokenError } from './errors/AuthTokenError'


let isRefreshed = false
let failedRequestsQueue: { onSuccess: (token: string) => void; onFailure: (err: AxiosError<unknown, any>) => void }[] = []

export function setupApiClient(ctx: GetServerSidePropsContext | undefined = undefined) {

  const {'token:nextauth': token} = parseCookies(ctx)
  const api = axios.create({
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
        const {'refreshToken:nextauth': refreshToken} = parseCookies(ctx)
  
        const originalConfig = error.config
  
        if (!isRefreshed) {
          isRefreshed = true
          api.post('/refresh', {
            refreshToken
          })
          .then((response) => {
            const { token } = response.data
            setCookie(ctx, 'token:nextauth', token, {
              maxAge: 60 * 60 *24 * 30, //1 month
              path: '/'
            })
            setCookie(ctx, 'refreshToken:nextauth', response.data.refreshToken)
            api.defaults.headers['Authorization'] = `Bearer ${token}`
  
            failedRequestsQueue.forEach((request) => request.onSuccess(token))
            failedRequestsQueue = []
          })
          .catch(err => {
            failedRequestsQueue.forEach((request) => request.onFailure(err))
            failedRequestsQueue = []
  
            if (typeof window !== "undefined") {
              signOut()
            }
  
          })
          .finally(() => {
            isRefreshed = false;
          })
        }
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
  
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      }
      else {
        if (typeof window !== "undefined") {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
    return Promise.reject(error)
   }
  )
  return api;
}