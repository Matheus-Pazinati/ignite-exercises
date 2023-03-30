import { AuthTokenError } from "@/lib/errors/AuthTokenError"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies } from "nookies"
import decode from 'jwt-decode'
import { verifyUserPermissions } from "./verifyUserPermissions"

interface WithSSRAuthParams {
  permissions: string[]
  roles: string[]
}

export function withSSRAuth(fn: GetServerSideProps, options?: WithSSRAuthParams) {
  return async (context: GetServerSidePropsContext) => {
    const cookie = parseCookies(context)
    const token = cookie['token:nextauth']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const user = decode<{permissions: string[], roles: string[]}>(token)
      const { permissions, roles } = options
      const userHasValidPermissions = verifyUserPermissions({
        user,
        permissions,
        roles
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(context)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(context, 'token:nextauth'),
        destroyCookie(context, 'refreshToken:nextauth')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}