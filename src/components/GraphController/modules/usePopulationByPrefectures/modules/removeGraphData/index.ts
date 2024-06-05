import { PopulationGraphData } from "@/shared/types/PopulationGraphData"

export const removeGraphData = (
  targetData: PopulationGraphData[],
  prefectureCode: number,
): PopulationGraphData[] =>
  targetData.map((data) => {
    // 特定要素を除外するため
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [prefectureCode]: _, ...rest } = data
    return rest
  })
