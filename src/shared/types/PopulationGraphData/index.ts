/**
 * 人口データ
 * @description
 * 人口推移グラフを表示するためのデータ構造
 *
 * 以下の様な構造を期待する
 * ```
 * {
 *    [ GraphDataKey ]: 年度 // number
 *    [ 都道府県コード ]: number // 人口数
 *    [ 都道府県コード ]: number // 人口数
 *    [ 都道府県コード ]: number // 人口数
 *    //...
 * }
 * ```
 */
export type PopulationGraphData = Record<string | number, string | number>
