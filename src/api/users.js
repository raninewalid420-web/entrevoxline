const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}?method=Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔥 indispensable pour gérer le cookie
    body: JSON.stringify({ username: email, password }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Erreur de connexion");
  }
  return data.user;
};

export const checkAuth = async () => {
  const response = await fetch(`${API_BASE_URL}?method=CheckAuth`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const LogoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}?method=Logout`, {
     method: "POST",
     credentials: "include",
  });
  const data = await response.json();
  console.log("Logout response:", data);
  return data;
};
