const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function Cancel_order_Show() {
  const apiUrl = `${API_BASE_URL}?method=Cancel_order_Show`;
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

  export async function CountColisNoFound() {
    const apiUrl = `${API_BASE_URL}?method=CountColisNoFound`;
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Erreur réseau détectée");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching cartin:", error);
    }
  }