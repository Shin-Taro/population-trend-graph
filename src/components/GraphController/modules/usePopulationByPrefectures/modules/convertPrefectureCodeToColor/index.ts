// TODO: 適当過ぎるので改善する
export const convertPrefectureCodeToColor = (prefectureCode: number): string => {
  const largeNumber = prefectureCode * 999_999_999
  const hex = largeNumber.toString(16)
  return `#${hex[0]}0${hex[2]}f${hex[4]}b`
}
