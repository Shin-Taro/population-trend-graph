import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import { FC } from "react"
import styled from "styled-components"
import { MediaQuery } from "@/shared/const/MediaQuery"
import { GraphController } from "../GraphController"

type Props = {
  prefecturesData: PrefecturesResponse
}

export const HomeTemplate: FC<Props> = (props) => (
  <section>
    <h1>人口推移グラフ</h1>
    <Container>
      <GraphController {...props} />
    </Container>
  </section>
)

const Container = styled.div`
  margin-top: 30px;
  margin-inline: auto;

  ${MediaQuery.MEDIA_QUERY_SP} {
    width: 95vw;
  }

  ${MediaQuery.MEDIA_QUERY_PC} {
    width: 85vw;
  }
`
