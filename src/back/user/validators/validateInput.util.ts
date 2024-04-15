export default class ValidateInputUtil {

    public certifyEmail = (email: string): boolean => {
      const regex = /^(\S+@\S+\.\S+)$/
      return regex.test(email)
    };

    public certifyPassword = (cpf: string): boolean => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      return regex.test(cpf)
    };

}