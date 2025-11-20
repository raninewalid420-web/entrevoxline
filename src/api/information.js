const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function Info_Show() {
  const apiUrl = `${API_BASE_URL}?method=Info_Show`;
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

export async function Info_Create(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=Info_Insert&iduser=${id}`;
  const payload = {
    type: Donnee.typeInfo,
    nom: Donnee.nom,
    telephone: Donnee.telephone,
    commentaire: Donnee.commentaire,
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
    console.error("Erreur lors de la création de l'information :", error);
    throw error;
  }
}
