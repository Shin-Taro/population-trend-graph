type PopulationData = {
  label: string
  data: {
    year: number
    value: number
  }[]
}

export type PopulationResponse = {
  message: string | null
  result: {
    boundaryYear: number
    data: PopulationData[]
  }
}
