/**
 * ApiContext attaches the user's authentication token to API requests when possible.
 * It also handles tags to refresh appropriate queries after a mutation.
 */

import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export const API = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const request = async (resource, options) => {
    const response = await fetch(API + resource, {
      headers,
      ...options,
    });
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : await response.text();
    if (!response.ok) throw Error(result);
    return result;
  };

  const [tags, setTags] = useState([]);
  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };
  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => tags[tag]?.());
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within a ApiProvider");
  return context;
}
