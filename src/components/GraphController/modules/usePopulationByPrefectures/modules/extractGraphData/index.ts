import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { PopulationResponse } from "@/shared/types/PopulationResponse"

export const extractGraphData = (
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
