const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function createSensibleCase(data, id) {
  const apiUrl = `${API_BASE_URL}?method=CreateSensible&id=${id}`;

  const payload = { ...data };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Erreur réseau détectée");

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Erreur lors de la création du cas sensible :", error);
    throw error;
  }
}

export async function getSensibleCases() {
  const apiUrl = `${API_BASE_URL}?method=GetAllSensible`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function getNormaleCases() {
  const apiUrl = `${API_BASE_URL}?method=GetAllAdr`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}



