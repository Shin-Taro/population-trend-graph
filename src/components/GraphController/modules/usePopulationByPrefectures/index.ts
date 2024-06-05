import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { PopulationResponse } from "@/shared/types/PopulationResponse"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"
import { resasApiClient } from "@/shared/utils/resasApiClient"
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

// TODO: 別ファイルに切り出す
const removeGraphData = (
  targetData: PopulationGraphData[],
  prefectureCode: number,
): PopulationGraphData[] =>
  targetData.map((data) => {
    // 特定要素を除外するため
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [prefectureCode]: _, ...rest } = data
    return rest
  })

// TODO: 別ファイルに切り出す
const mergeGraphData = (existData: PopulationGraphData[], targetData: PopulationGraphData[]) =>
  targetData.map((data) => {
    const newData = existData.find((target) => target[GraphDataKey] === data[GraphDataKey])
    if (newData) {
      return { ...data, ...newData }
    }
    return data
  })

// TODO: 適当過ぎるので改善する
const convertPrefectureCodeToColor = (prefectureCode: number): string => {
  const largeNumber = prefectureCode * 999
  const colorCode = largeNumber.toString(16).slice(0, 6)
  return `#${colorCode}`
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

  // TODO: 関数化して別ファイルに切り出す
  const selectedPrefectureList = prefectureStateList.flatMap((prefectureState) =>
    prefectureState.isChecked
      ? {
          prefectureCode: prefectureState.prefectureCode,
          prefectureName: prefectureState.prefectureName,
          colorCode: convertPrefectureCodeToColor(prefectureState.prefectureCode),
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
