export class API {
  private static readonly BASE_URL =
    import.meta.env.MODE === "production"
      ? "https://mcauth.jlmsz.com"
      : "http://localhost:8000";

  private static async checkStatus(res: Response) {
    if (!res.ok) {
      let json;
      try {
        json = await res.json();
      } catch (err) {
        console.log("Unknown error:", err);
        throw new Error("Unknown error");
      }

      const message = json.message;
      throw new Error(message);
    }

    return res;
  }

  static async startSignup(username: string) {
    const res = await this.checkStatus(
      await fetch(`${this.BASE_URL}/api/v1/signup/start`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      })
    );

    return await res.json();
  }

  static async getSignupStatus(id: string) {
    const res = await this.checkStatus(
      await fetch(`${this.BASE_URL}/api/v1/signup/${id}/status`)
    );

    return await res.json();
  }

  static async submitSignup(id: string) {
    const res = await this.checkStatus(
      await fetch(`${this.BASE_URL}/api/v1/signup/${id}/submit`, {
        method: "POST",
      })
    );

    return await res.json();
  }

  static async startLogin(username: string) {
    const res = await this.checkStatus(
      await fetch(`${this.BASE_URL}/api/v1/login/start`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      })
    );

    return await res.json();
  }

  static async getLoginStatus(id: string) {
    const res = await this.checkStatus(
      await fetch(`${this.BASE_URL}/api/v1/login/${id}/status`)
    );

    return await res.json();
  }

  static async submitLogin(id: string) {
    const res = await this.checkStatus(
      await fetch(`${this.BASE_URL}/api/v1/login/${id}/submit`, {
        method: "POST",
      })
    );

    return await res.json();
  }
}
