import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { FC } from "react"
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

type SelectedPrefecture = {
  prefectureName: string
  prefectureCode: number
  colorCode: string
}

type Props = {
  populationData: PopulationGraphData[]
  selectedPrefectureList: SelectedPrefecture[]
}

// TODO: 細かいデザインをWFに近づける
export const Graph: FC<Props> = (props) => {
  const { populationData, selectedPrefectureList } = props

  return (
    <ResponsiveContainer aspect={2} maxHeight={700}>
      <LineChart data={populationData} margin={{ top: 30, right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        {/*
            hydration errorのwarningが出るが、rechartsの後のversionで解消されるはず
            https://github.com/recharts/recharts/issues/3615
         */}
        <XAxis dataKey={GraphDataKey} domain={["dataMin", "dataMax"]}>
          <Label value="年度" offset={20} position="right" />
        </XAxis>
        <YAxis>
          <Label value="人口数" offset={10} position="top" />
        </YAxis>
        {/* TODO: 数が多いときの表示最適化 */}
        <Legend
          align="right"
          verticalAlign="top"
          layout="vertical"
          iconType="plainline"
          wrapperStyle={{
            right: 0,
          }}
        />
        {selectedPrefectureList.map((prefecture) => {
          const { prefectureName, prefectureCode, colorCode } = prefecture
          return (
            <Line
              key={prefectureCode}
              type="linear"
              dataKey={prefectureCode}
              name={prefectureName}
              stroke={colorCode}
              dot={false}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
