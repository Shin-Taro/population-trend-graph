import { GetServerSideProps, NextPage } from "next"
import { ComponentPropsWithoutRef } from "react"
import { resasApiClient } from "@/shared/utils/resasApiClient"
import { HomeTemplate } from "@/components/HomeTemplate"

type PageProps = ComponentPropsWithoutRef<typeof HomeTemplate>

const Home: NextPage<PageProps> = (props) => <HomeTemplate {...props} />

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // TODO: エラーハンドリング

  const response = await resasApiClient.getPrefectures()
  return { props: { prefecturesData: response } }
}

export default Home
