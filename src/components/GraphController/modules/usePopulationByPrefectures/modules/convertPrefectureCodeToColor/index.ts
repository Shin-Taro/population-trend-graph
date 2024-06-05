// TODO: 適当過ぎるので改善する
export const convertPrefectureCodeToColor = (prefectureCode: number): string => {
  const largeNumber = prefectureCode * 999
  const colorCode = largeNumber.toString(16).slice(0, 6)
  return `#${colorCode}`
}
