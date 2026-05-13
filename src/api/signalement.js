const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function CreateSignalement(data, iduser) {
  const payload = { ...data };
  const apiUrl = `${API_BASE_URL}?method=CreateSignalement&iduser=${iduser}`;
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching signalement:", error);
  }
}

export async function ShowSignalement() {
  const apiUrl = `${API_BASE_URL}?method=GetAllSignalement`;
  try {
    const res = await fetch(apiUrl, { method: "GET" });
    const data = await res.json();
    if (data?.error) return [];
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error fetching signalement:", error);
    return [];
  }
}

export async function ShowLastNumeroSignalement() {
  const apiUrl = `${API_BASE_URL}?method=ShowNumeroSignalement`;
  try {
    const res = await fetch(apiUrl, { method: "GET" });
    const data = await res.json();
    return data?.numero;
  } catch (error) {
    console.error("Error fetching signalement:", error);
  }
}

export async function PartialUpdateSignalement(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=PartialUpdateSignalement&id=${id}`;

  const payload = {
    nom: Donnee.nom,
    tel: Donnee.tel,
    nom_commerce: Donnee.nom_commerce,
    produit: Donnee.produit,
    prix_depart: Donnee.prix_depart,
    prix_actuel: Donnee.prix_actuel,
    details: Donnee.details,
    updated_by: Donnee.updated_by,
    updated_at: Donnee.updated_at,
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
    console.error("Error updating signalement:", error);
  }
}