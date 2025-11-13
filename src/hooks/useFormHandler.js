import { useState, useCallback } from "react";

/**
 * Hook générique pour gérer les formulaires asynchrones
 * Exemple: création, mise à jour, suppression, login, etc.
 *
 * @param {Function} submitFn - Fonction async (soumission du formulaire)
 * @param {Object} options - { onSuccess, onError, resetOnSuccess }
 */
export default function useFormHandler(submitFn, options = {}) {
  const { onSuccess, onError, resetOnSuccess = true } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (values, resetForm) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await submitFn(values);

        setSuccess(true);
        if (onSuccess) onSuccess(result);

        if (resetOnSuccess && resetForm) resetForm();
        return result;
      } catch (err) {
        console.error("❌ Form submission error:", err);
        setError(err);
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    },
    [submitFn, onSuccess, onError, resetOnSuccess]
  );

  return { loading, error, success, handleSubmit };
}
