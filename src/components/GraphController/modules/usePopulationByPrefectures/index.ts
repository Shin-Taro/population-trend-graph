import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import { resasApiClient } from "@/shared/utils/resasApiClient"
import { ChangeEventHandler, useState } from "react"
import { PrefectureState } from "@/shared/types/PrefectureState"
import { removeGraphData } from "./modules/removeGraphData"
import { convertToPrefectureStateList } from "./modules/convertToPrefectureStateList"
import { extractGraphData } from "./modules/extractGraphData"
import { mergeGraphData } from "./modules/mergeGraphData"
import { convertToPrefecturesWithColor } from "./modules/convertToPrefecturesWithColor"

export const usePopulationByPrefectures = (prefectures: PrefecturesResponse) => {
  const [prefectureStateList, setPrefectureStateList] = useState<PrefectureState[]>(
    convertToPrefectureStateList(prefectures),
  )

  const [populationData, setPopulationData] = useState<PopulationGraphData[]>([])

  const initPrefectureChangeHandler =
    (prefectureCode: number): ChangeEventHandler =>
    async () => {
      try {
        // APIリクエスト
        const result = await resasApiClient.getPopulation(prefectureCode)
        const targetGraphData = extractGraphData(prefectureCode, result)

        setPopulationData((previous) => {
          const isAlreadySelected =
            prefectureStateList.find(
              (prefectureState) => prefectureState.prefectureCode === prefectureCode,
            )?.isChecked ?? false

          return isAlreadySelected
            ? removeGraphData(previous, prefectureCode)
            : mergeGraphData(previous, targetGraphData)
        })

        // checkboxの管理
        setPrefectureStateList((previous) =>
          previous.map((prefectureState) =>
            prefectureState.prefectureCode === prefectureCode
              ? { ...prefectureState, isChecked: !prefectureState.isChecked }
              : prefectureState,
          ),
        )
      } catch {
        // TODO: エラーハンドリング
      }
    }

  const selectedPrefectureList = convertToPrefecturesWithColor(prefectureStateList)

  return {
    prefectureStateList,
    initPrefectureChangeHandler,
    selectedPrefectureList,
    populationData,
  }
}
