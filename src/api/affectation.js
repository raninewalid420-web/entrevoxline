const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function getAllUsers() {
  const apiUrl = `${API_BASE_URL}?method=AllUser`;
  const response = await fetch(apiUrl, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Erreur de récupération des utilisateurs");

  return response.json();
}

export async function AffecterUserToLigne(data) {
  const Data = { ...data };
  const apiUrl = `${API_BASE_URL}?method=Affecter`;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    });

    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du cartin :", error);
    throw error;
  }
}

export async function DesaffecterUserToLigne(id) {
  const apiUrl = `${API_BASE_URL}?method=DesAffecter&id=${id}`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du cartin :", error);
    throw error;
  }
}

export async function AfficherAffecter() {
  const apiUrl = `${API_BASE_URL}?method=Afficher`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du cartin :", error);
    throw error;
  }
}
