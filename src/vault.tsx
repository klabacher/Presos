/* eslint-disable class-methods-use-this */
/* eslint-disable promise/always-return */
import { instance } from './utils';

class Vault {
  async login(
    username: string,
    password: string,
    cbsucess: { (): void; (arg0: { err: boolean; data: any }): void },
    cberror: { (err: any): void; (arg0: string): void }
  ) {
    await instance
      .post('/login', {
        username,
        password,
      })
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.hasError === 'true') {
            if (response.data.errorMsg === 'error.WRONGPASS') {
              await cberror('Senha incorreta');
            }
          } else {
            instance.defaults.headers.common.Authorization = `Bearer ${response.data.data.token}`;
            await cbsucess(response.data);
          }
        }
        return response;
      })
      .catch((reason: any) => {
        console.error(reason);
        cberror(reason);
      });
  }

  public get getToken(): string {
    return this.token;
  }

  public set setToken(v: string) {
    this.token = v;
  }

  public get getUser(): string {
    return this.user;
  }

  public set setUser(v: string) {
    this.user = v;
  }

  async register(this: any) {
    await instance
      .post('/register', {
        username,
        password,
        FM_id,
        discord,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.token = response.data.token;
          return {
            err: false,
            data: response.data,
          };
        }
      })
      .catch((reason: any) => {
        throw new Error(reason);
      });
  }

  async userdata(this: any) {
    console.log('a');
    await instance
      .get('/users')
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setUser = response.data;
          return {
            err: false,
            data: response.data,
          };
        }
      })
      .catch((reason: any) => {
        throw new Error(reason);
      });
  }
}

export default new Vault();
