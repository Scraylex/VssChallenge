import dateFormatter from './dateFormatter'

describe('Dateformatter', () => {
  it('Should extract parts of date accurately', () => {
    const testDate = new Date('2020-03-21T20:00:00')
    const dateParts = dateFormatter(testDate)

    expect(dateParts.day).toEqual('21')
    expect(dateParts.month).toEqual('03')
    expect(dateParts.year).toEqual('2020')
    expect(dateParts.hours).toEqual('20')
    expect(dateParts.minutes).toEqual('00')
    expect(dateParts.dayOfWeek).toEqual('Samstag')
  })
})
