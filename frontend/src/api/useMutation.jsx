import { useState } from "react";
import { useApi } from "./ApiContext";

/**
 * Returns a function to mutate a resource, as well as some state
 * that tracks the response of that mutation request.
 */
export default function useMutation(method, resource, tagsToInvalidate) {
  const { request, invalidateTags } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (body) => {
    setLoading(true);
    setError(null);

    try {
      const result = await request(resource, {
        method,
        body: JSON.stringify(body),
      });
      setData(result);
      invalidateTags(tagsToInvalidate);
      return true;
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }

    return false;
  };

  return { mutate, data, loading, error };
}
