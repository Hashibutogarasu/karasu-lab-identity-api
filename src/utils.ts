export const getFrontendUrl = (): string => {
  const defaultUrl = process.env.NODE_ENV === "production" ? "https://karasu256.com" : "http://localhost:3000";
  const url = process.env.FRONTEND_URL || defaultUrl;
  return String(url).replace(/\/$/, "");
};
