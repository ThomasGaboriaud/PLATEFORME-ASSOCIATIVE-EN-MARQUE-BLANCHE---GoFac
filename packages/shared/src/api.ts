/**
 * Contrats communs de l'API. Voir docs/technical/api-conventions.md.
 */

/** Format d'erreur unique de l'API (RFC 9457 « problem details »). */
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  /** Erreurs de validation, champ par champ (formulaires). */
  errors?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
  /** Suggestion de correction affichée à l'utilisateur. */
  suggestion?: string;
}

/** Réponse paginée d'une liste. */
export interface Paginated<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
