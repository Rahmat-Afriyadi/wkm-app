import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
const BASE_URL = "http://localhost:3001";
async function refreshToken(refreshToken) {
  const res = await fetch(BASE_URL + "/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });
  if (res.status == 403) {
    let resLogout = await fetch(process.env.URL + "/api/auth/signout?callbackUrl=/api/auth/session", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: await fetch(process.env.URL + "/api/auth/csrf").then((rs) => rs.text()),
    });
    redirect("/api/auth/signout");
  }
  const data = await res.json();

  return { access_token: data.access_token, refresh_token: data.refresh_token };
}

export async function AuthGetApi(url) {
  const session = await getServerSession(authOptions);
  let res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  console.log("ini status code ", res.status);
  if (res.status == 403) {
    const { access_token, refresh_token } = await refreshToken(session?.user.refreshToken ?? "");
    if (session) session.user.accessToken = access_token;
    if (session) session.user.refreshToken = refresh_token;
    res = await fetch(BASE_URL + url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    return await res.json();
  }
  return await res.json();
}

export async function PostFileApi(data, url) {
  const session = await getServerSession(authOptions);
  let res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: data,
  });
  if (res.status == 403) {
    const { access_token, refresh_token } = await refreshToken(session?.user.refreshToken ?? "");
    if (session) session.user.accessToken = access_token;
    if (session) session.user.refreshToken = refresh_token;
    res = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: data,
    });
    return await res.json();
  }
  return await res.json();
}

export async function PostApi(data, url) {
  const session = await getServerSession(authOptions);
  let res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status == 403) {
    const { access_token, refresh_token } = await refreshToken(session?.user.refreshToken ?? "");
    if (session) session.user.accessToken = access_token;
    if (session) session.user.refreshToken = refresh_token;
    res = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
  return await res.json();
}
