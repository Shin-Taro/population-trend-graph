import { GraphController } from "@/components/GraphController"
import { GetServerSideProps, NextPage } from "next"
import { ComponentPropsWithoutRef } from "react"
import { resasApiClient } from "@/shared/utiles/resasApiClient"

type PageProps = ComponentPropsWithoutRef<typeof GraphController>

const Home: NextPage<PageProps> = (props) => <GraphController {...props} />

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  // TODO: エラーハンドリング

  const response = await resasApiClient.getPrefectures()
  return { props: { prefecturesData: response } }
}

export default Home
