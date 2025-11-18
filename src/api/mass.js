const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://192.168.100.4:8080/CallCentre/callmanager/api.php";

// API to fetch mass data for different projects

export async function Hors_projets() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=hors_projets`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Ps() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=ps`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Purcsa() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=purcsa`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Pirb() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=pirb`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Pass() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=pass`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_FreshFood() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=fresh_food`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Eabs() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=eaps`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Crec() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=crec`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Aseri() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=aseri`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

export async function Mass_Agr() {
  const api = `${API_BASE_URL}?method=Mass_Show&projets=agr`;

  try {
    // Effectuer la requête GET
    const response = await fetch(api, {
      method: "GET", // Correction de la syntaxe
    });

    // Vérifier si la réponse est ok (code HTTP 200)
    if (response.ok) {
      // Parse les données JSON de la réponse
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      }
      // Manipulez les données ici, par exemple, en les stockant dans un état
      // Exemple pour React :
      return data;
    } else {
      // Si la réponse n'est pas OK, vous pouvez afficher un message d'erreur
      console.error(
        "Erreur lors de la récupération des données",
        response.status
      );
    }
  } catch (error) {
    // Gestion des erreurs dans le cas où la requête échoue
    console.error("Une erreur est survenue", error);
  }
}

// la fonction d'ajouter un projet mass
export async function Add_Mass_Project(Donnes, idUser) {
  const api = `${API_BASE_URL}?method=Mass_Insert&iduser=${idUser}`;
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Donnes),
    });

    if (!response.ok) throw new globalThis.Error("Erreur réseau détectée");

    const result = await response.json();
   return result;
  } catch (error) {
    console.error("Error adding mass project:", error);
  }
}
// fonction qui permet de recupere la dernier numero inserer dans la table mass
export async function Mass_LastNumero() {
  const api = `${API_BASE_URL}?method=Mass_LastNumero`;
  try {
    const response = await fetch(api, {
      method: "GET",
    });
    const data = await response.json();
    const dernierNumero = (data.dernierNumero += 1);
    return dernierNumero;
  } catch (error) {
    console.error("Error fetching last mass numero:", error);
  }
}
