import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import { FC } from "react"
import styled from "styled-components"
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
  width: 85vw;
  margin-inline: auto;
`
