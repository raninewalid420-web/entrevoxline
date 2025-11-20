const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function ShowColis() {
  const apiUrl = `${API_BASE_URL}?method=ShowColis`;
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

export async function AnnulationCmd(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=Cancel_order_Insert&iduser=${id}`;
  const payload = {
    nom_client: Donnee.nom,
    telephone: Donnee.telephone,
    date_commande: Donnee.dateCommande,
    numero_dj: Donnee.numeroDJ,
    raison: Donnee.raison,
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
    console.error("Erreur lors de l'annulation de la commande :", error);
    throw error;
  }
}
