import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"

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

    return fn(context)
  }
}