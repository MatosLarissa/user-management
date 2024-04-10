import { v4 } from "uuid"

export default class IdGeneratorUtil {

  public generate(): string {
    return v4()
  }

}