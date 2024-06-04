import { FC } from "react"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
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
    <div>
      <PrefectureCheckbox
        prefectureStateList={prefectureStateList}
        initPrefectureChangeHandler={initPrefectureChangeHandler}
      />
      <Graph selectedPrefectureList={selectedPrefectureList} populationData={populationData} />
    </div>
  )
}
