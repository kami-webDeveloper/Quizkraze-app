// Reusable function for API auth operations
const operation = async function (
  fetchCallback,
  errorMessage = "Request failed"
) {
  const res = await fetchCallback();

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const message = errData.message || errorMessage;
    throw new Error(message);
  }

  return res.json();
};

// Helper for request
export default async function request(url, options, errorMessage) {
  return operation(() => fetch(url, options), errorMessage);
}
