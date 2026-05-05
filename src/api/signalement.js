const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

export async function CreateSignalement(data, iduser) {
  // console.log(data);
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
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching signalement:", error);
  }
}

export async function ShowLastNumeroSignalement() {
  const apiUrl = `${API_BASE_URL}?method=ShowNumeroSignalement`;
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await res.json();
    return data?.numero;
  } catch (error) {
    console.error("Error fetching signalement:", error);
  }
}
