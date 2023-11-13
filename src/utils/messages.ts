// Errors
export const notFound = (entity: string) => `${entity} not found.`;
export const missingId = 'Missing id parameter.';

// Success
export const getActionSuccessMsg = (
  entity: string,
  action: 'created' | 'updated' | 'deleted' | 'found',
) => `${entity} ${action} successfully.`;
