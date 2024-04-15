export function formatDate(date: Date | string) {
  const dateString = typeof date === "string" ? date.substring(0, 10) : date.toISOString().substring(0, 10)
  const [year, month, day] = dateString.split("-")
  const newDate = new Date(+year, +month - 1, +day)
  const formattedDate: string = `${newDate.getFullYear()}/${("0" + (newDate.getMonth() + 1)).slice(-2)}/${("0" + newDate.getDate()).slice(-2)}`
  return formattedDate
}

export function formatDateToInput(date: Date | string) {
  const newDate = new Date(date)
  const year = newDate.getUTCFullYear()
  const month = String(newDate.getUTCMonth() + 1).padStart(2, "0")
  const day = String(newDate.getUTCDate()).padStart(2, "0")
  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export function formatDatetoMySQL(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}