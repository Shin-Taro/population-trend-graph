import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"

export const mergeGraphData = (
  existData: PopulationGraphData[],
  targetData: PopulationGraphData[],
) =>
  targetData.map((data) => {
    const newData = existData.find((target) => target[GraphDataKey] === data[GraphDataKey])
    if (newData) {
      return { ...data, ...newData }
    }
    return data
  })
