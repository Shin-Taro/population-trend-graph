import { GraphDataKey } from "@/shared/const/GraphDataKey"
import { PopulationGraphData } from "@/shared/types/PopulationGraphData"
import { FC } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import styled from "styled-components"

type SelectedPrefecture = {
  prefectureName: string
  prefectureCode: number
  colorCode: string
}

type Props = {
  populationData: PopulationGraphData[]
  selectedPrefectureList: SelectedPrefecture[]
}

// TODO: デザインを整える
export const Graph: FC<Props> = (props) => {
  const { populationData, selectedPrefectureList } = props

  return (
    <Container>
      <span>人口数</span>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={populationData} margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          {/*
            hydration errorのwarningが出るが、rechartsの後のversionで解消されるはず
            https://github.com/recharts/recharts/issues/3615
         */}
          <XAxis dataKey={GraphDataKey} domain={["dataMin", "dataMax"]} />
          <YAxis />
          {/* TODO: 数が多いときの表示最適化 */}
          <Legend
            align="right"
            verticalAlign="top"
            layout="vertical"
            iconType="plainline"
            width={100}
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
      <span>年度</span>
    </Container>
  )
}

const Container = styled.div`
  height: 500px;
`
