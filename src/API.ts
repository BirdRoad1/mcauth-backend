export class API {
  public static readonly BASE_URL =
    import.meta.env.MODE === "production"
      ? "https://mcauth.jlmsz.com"
      : "http://localhost:8000";

  private static async request(url: string, options?: RequestInit) {
    options ??= {};
    options.headers ??= {};

    if (localStorage.getItem("token")) {
      (options.headers as Record<string, string>)[
        "authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    }

    const res = await fetch(url, options);
    await this.checkStatus(res);

    return res;
  }

  private static async checkStatus(res: Response) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      location.href = "/";
    }

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
    const res = await API.request(`${this.BASE_URL}/api/v1/signup/start`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    return await res.json();
  }

  static async getSignupStatus(id: string) {
    const res = await API.request(
      `${this.BASE_URL}/api/v1/signup/${id}/status`
    );

    return await res.json();
  }

  static async submitSignup(id: string) {
    const res = await API.request(
      `${this.BASE_URL}/api/v1/signup/${id}/submit`,
      {
        method: "POST",
      }
    );

    return (await res.json()).token;
  }

  static async startLogin(username: string) {
    const res = await API.request(`${this.BASE_URL}/api/v1/login/start`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    return await res.json();
  }

  static async getLoginStatus(id: string) {
    const res = await API.request(`${this.BASE_URL}/api/v1/login/${id}/status`);

    return await res.json();
  }

  static async submitLogin(id: string) {
    const res = await API.request(
      `${this.BASE_URL}/api/v1/login/${id}/submit`,
      {
        method: "POST",
      }
    );

    return await res.json();
  }

  static async getUserNote() {
    const res = await API.request(`${this.BASE_URL}/api/v1/note`);

    return (await res.json()).content;
  }

  static async updateUserNote(content: string) {
    const res = await API.request(`${this.BASE_URL}/api/v1/note`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    return await res.json();
  }

  static async shareNote(content: string): Promise<string> {
    const res = await API.request(`${this.BASE_URL}/api/v1/note/share`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    return (await res.json()).id;
  }
}
