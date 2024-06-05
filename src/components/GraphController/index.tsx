import { FC } from "react"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import styled from "styled-components"
import { FontSize } from "@/shared/const/FontSize"
import { Graph } from "../Graph"
import { PrefectureCheckboxList } from "../PrefectureCheckboxList"
import { usePopulationByPrefectures } from "./modules/usePopulationByPrefectures"

type Props = {
  prefecturesData: PrefecturesResponse
}

export const GraphController: FC<Props> = (props) => {
  const { prefecturesData } = props
  const {
    prefectureStateList,
    initPrefectureChangeHandler,
    selectedPrefectureList,
    populationData,
  } = usePopulationByPrefectures(prefecturesData)

  return (
    <>
      <Title>都道府県</Title>
      <CheckboxContainer>
        <PrefectureCheckboxList
          prefectureStateList={prefectureStateList}
          initPrefectureChangeHandler={initPrefectureChangeHandler}
        />
      </CheckboxContainer>
      <GraphContainer>
        <Graph selectedPrefectureList={selectedPrefectureList} populationData={populationData} />
      </GraphContainer>
    </>
  )
}

const Title = styled.h2`
  font-size: ${FontSize.FONT_SIZE_18};
`

const CheckboxContainer = styled.div`
  padding-inline: 20px;
  margin-top: 20px;
`

const GraphContainer = styled.div`
  margin-top: 20px;
`
