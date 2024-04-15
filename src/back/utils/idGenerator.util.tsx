import { v4 } from "uuid"

export default class IdGeneratorUtil {
  private static instance: IdGeneratorUtil;

  private constructor() {}

  public static getInstance(): IdGeneratorUtil {
    if (!IdGeneratorUtil.instance) {
      IdGeneratorUtil.instance = new IdGeneratorUtil()
    }
    return IdGeneratorUtil.instance
  }

  public generate(): string {
    return v4()
  }
}