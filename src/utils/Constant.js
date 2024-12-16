export const Const = {
    Success200: 200,
    Created201: 201,
    Invalid400: 400,
    UnAuth401: 401,
    Forbidden403: 403,
    NotFound404: 404,
    ServerError500: 500,
    BadGateway502: 502,
    ServiceUnavailable503: 503,
    GatewayTimeout504: 504,
    Redirect302: 302,
    //Link: "http://localhost:3001/",
    Link: "https://user-dashboard-backend-one.vercel.app/",
  };
  
  export const ProcessAPI = async (res) => {
    if (res.status === Const.Success200 || res.status === Const.Created201) {
      const data = await res.json();
      return data;
    } else if (res.status === Const.Redirect302) {
    } else if (res.status === Const.Invalid400) {
    } else if (res.status === Const.UnAuth401) {
      localStorage.clear();
    } else if (res.status === Const.NotFound404) {
      const data = await res.json();
      return data;
      // return {
      //   notFound: true,
      // };
    } else {
      throw new Error("Some error occurred");
    }
  };
  