import { useState, useCallback } from "react";

/**
 * Hook générique pour gérer les appels async (fetch, API, Prisma, etc.)
 * @param {Function} asyncFunction - Fonction asynchrone (ex: fetchData)
 * @param {Array} deps - Dépendances du hook (comme useEffect)
 * @returns {Object} { data, error, loading, execute, refetch }
 */
export default function useAsync(asyncFunction, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fonction d'exécution contrôlée
  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        console.error("❌ useAsync error:", err);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    deps // permet de relancer la fonction si dépendances changent
  );

  // Pour recharger manuellement
  const refetch = useCallback(() => execute(), [execute]);

  return { data, error, loading, execute, refetch };
}
