import wretch from "wretch";
import { AuthActions } from "./auth/utils";

const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
  return (
    wretch("http://localhost:8000")
      .auth(`Bearer ${getToken("access")}`)
      .catcher(401, async (error, request) => {
        try {
          const { access } = await handleJWTRefresh().json();
          storeToken(access, "access");
          return request
            .auth(`Bearer ${access}`)
            .fetch()
            .unauthorized(() => {
              window.location.replace("/");
            })
            .json();
        } catch (err) {
          window.location.replace("/");
        }
      })
  );
};

export const fetcher = (url) => {
  return api().get(url).json();
};
