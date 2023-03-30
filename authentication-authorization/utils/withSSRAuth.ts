import { AuthTokenError } from "@/lib/errors/AuthTokenError"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies } from "nookies"

export function withSSRAuth(fn: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const cookie = parseCookies(context)

    if (!cookie['token:nextauth']) {
      return {
        redirect: {
          destination: '/',
          permanent: false
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