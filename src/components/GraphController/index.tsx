import { FC } from "react"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import styled from "styled-components"
import { Graph } from "../Graph"
import { PrefectureCheckbox } from "../PrefectureCheckbox"
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
      <PrefectureCheckbox
        prefectureStateList={prefectureStateList}
        initPrefectureChangeHandler={initPrefectureChangeHandler}
      />
      <GraphContainer>
      <Graph selectedPrefectureList={selectedPrefectureList} populationData={populationData} />
      </GraphContainer>
    </>
  )
}

const GraphContainer = styled.div`
  margin-top: 20px;
`
