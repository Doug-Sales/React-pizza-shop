import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/01/2024', receipt: 20000 },
    { date: '02/01/2024', receipt: 15000 },
    { date: '03/01/2024', receipt: 80000 },
    { date: '04/01/2024', receipt: 15800 },
    { date: '05/01/2024', receipt: 20500 },
    { date: '06/01/2024', receipt: 29100 },
    { date: '07/01/2024', receipt: 75500 },
  ])
})
