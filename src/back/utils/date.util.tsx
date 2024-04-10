export default class DateUtil {
  public getAtualDate() {
    const dateNow = new Date()

    const day = dateNow.getDate()

    const month = (dateNow.getMonth() + 1).toString().padStart(2, "0")

    const year = dateNow.getFullYear()

    const hours = dateNow.getHours().toString().padStart(2, "0")

    const minutes = dateNow.getMinutes().toString().padStart(2, "0")

    const seconds = dateNow.getSeconds().toString().padStart(2, "0")

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

    return formattedDate
  }
}
