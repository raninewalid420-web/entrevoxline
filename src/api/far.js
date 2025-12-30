const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function ShowFar() {
  const apiUrl = `${API_BASE_URL}?method=GetAllPlaintesFar`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

export async function ShowLastNumeroFar() {
  const apiUrl = `${API_BASE_URL}?method=GetNextFarReference`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    if (!res.ok) throw new Error("Erreur réseau détectée");
    const data = await res.json();
    return data.reference;
  } catch (error) {
    console.error("Error fetching cartin:", error);
  }
}

export async function CreateFar(Donnee, id) {
  const apiUrl = `${API_BASE_URL}?method=InsererFar&iduser=${id}`;
  const payload = {
    reference: Donnee.reference,
    date: Donnee.date,
    nomReclamant: Donnee.nomReclamant,
    contact: Donnee.contact,
    pointFocal: Donnee.pointFocal,
    typePlainte: Donnee.type_plainte,
    langue: Donnee.langue,
    region: Donnee.region,
    details: Donnee.details,
    anonyme: Donnee.anonyme,
  };

  console.log("Payload envoyé à l'API CreateFar :", payload);
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
