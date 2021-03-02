const dateFormatter = (start: Date) => {
  const day: string = `0${start.getDate()}`.slice(-2)
  const month: string = `0${start.getMonth() + 1}`.slice(-2)
  const year = `${start.getFullYear()}`
  const hours: string = `0${start.getHours()}`.slice(-2)
  const minutes: string = `0${start.getMinutes()}`.slice(-2)
  const dayOfWeek: string = start.toLocaleString('de-CH', { weekday: 'long' })
  return { dayOfWeek, day, month, year, hours, minutes }
}

export default dateFormatter
