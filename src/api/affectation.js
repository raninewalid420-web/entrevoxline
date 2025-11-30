export async function getAllUsers() {
  const response = await fetch(
    "http://192.168.100.4:8080/CallCentre/callmanager/api.php?method=AllUser"
  );

  if (!response.ok) throw new Error("Erreur de récupération des utilisateurs");

  return response.json();
}
