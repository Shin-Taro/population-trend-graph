import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import { FC } from "react"
import styled from "styled-components"
import { FontSize } from "@/shared/const/FontSize"
import { Colors } from "@/shared/const/Colors"
import { FontWeight } from "@/shared/const/FontWeight"
import { MediaQuery } from "@/shared/const/MediaQuery"
import { GraphController } from "../GraphController"

type Props = {
  prefecturesData: PrefecturesResponse
}

export const HomeTemplate: FC<Props> = (props) => (
  <section>
    <Title>人口推移グラフ</Title>
    <Container>
      <GraphController {...props} />
    </Container>
  </section>
)

const Title = styled.h1`
  background-color: ${Colors.COLOR_C4C4C4};
  text-align: center;
  padding-block: 20px;
  font-size: ${FontSize.FONT_SIZE_25};
  font-weight: ${FontWeight.FONT_WEIGHT_600};
`

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
