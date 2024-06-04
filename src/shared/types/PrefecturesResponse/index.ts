type PrefectureData = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponse = {
  message: string | null
  result: PrefectureData[]
}
