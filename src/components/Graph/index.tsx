import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { FC } from "react"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"

type SelectedPrefecture = {
  prefectureName: string
  colorCode: string
}

type Props = {
  populationData: PopulationGraphData[]
  selectedPrefectureList: SelectedPrefecture[]
}

export const Graph: FC<Props> = (props) => {
  const { populationData, selectedPrefectureList } = props

  return (
    <div>
      <span>人口数</span>
      <LineChart width={500} height={300} data={populationData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={GraphDataKey} domain={["dataMin", "dataMax"]} />
        <YAxis />
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          iconType="plainline"
          width={200}
        />
        {selectedPrefectureList.map((prefecture) => {
          const { prefectureName, colorCode } = prefecture
          return (
            <Line
              key={prefectureName}
              type="linear"
              dataKey={prefectureName}
              name={prefectureName}
              stroke={colorCode}
              dot={false}
            />
          )
        })}
      </LineChart>
      <span>年度</span>
    </div>
  )
}
