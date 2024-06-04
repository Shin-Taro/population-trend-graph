import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { PopulationResponse } from "@/shared/types/PopulationResponse"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import { resasApiClient } from "@/shared/utiles/resasApiClient"
import { ChangeEventHandler, useState } from "react"

// TODO: 別ファイルに切り出す
const convertToPrefectureStateList = (prefectures: PrefecturesResponse) =>
  prefectures.result.map((prefecture) => ({
    prefectureName: prefecture.prefName,
    prefectureCode: prefecture.prefCode,
    isChecked: false,
  }))

// TODO: 別ファイルに切り出す
const extractGraphData = (
  prefectureCode: number,
  populationResponse: PopulationResponse,
): PopulationGraphData[] => {
  const { data } = populationResponse.result
  const populationResult =
    data.find((populationData) => populationData.label === "総人口")?.data ?? []

  return populationResult.map((targetData) => ({
    [prefectureCode]: targetData.value,
    [GraphDataKey]: targetData.year,
  }))
}

export const usePopulationByPrefectures = (prefectures: PrefecturesResponse) => {
  const [prefectureStateList, setPrefectureStateList] = useState(
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
            ? previous.filter((data) => data[prefectureCode] !== prefectureCode)
            : [...previous, ...targetGraphData]
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

  const selectedPrefectureList = prefectureStateList.flatMap((prefectureState) =>
    prefectureState.isChecked
      ? {
          prefectureName: prefectureState.prefectureName,
          colorCode: `#${Math.floor(Math.random() * 16_777_215).toString(16)}`,
        }
      : [],
  )

  return {
    prefectureStateList,
    initPrefectureChangeHandler,
    selectedPrefectureList,
    populationData,
  }
}
