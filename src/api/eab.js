const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function EabShow() {
  const apiUrl = `${API_BASE_URL}?method=EabShow`;
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

export async function EabCreate(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=EabInsert&iduser=${id}`;
  const payload = {
    nom: Donnee.nomClient,
    numero_telephone: Donnee.telephone,
    service: Donnee.service,
    plainte: Donnee.doleance,
    reponse: Donnee.reponse,
    compte: Donnee.compte || "",
  };
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la création de l'eab :", error);
    throw error;
  }
}
