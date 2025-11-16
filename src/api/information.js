const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function Info_Show() {
  const apiUrl = `${API_BASE_URL}?method=Info_Show`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}
