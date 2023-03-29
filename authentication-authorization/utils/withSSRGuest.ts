import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"

export function withSSRGuest(fn: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const cookie = parseCookies(context)

    if (cookie['token:nextauth']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return await fn(context)
  }
}