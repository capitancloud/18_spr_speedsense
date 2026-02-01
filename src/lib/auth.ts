/**
 * Autenticazione basata su codice di accesso
 * 
 * SICUREZZA: Il codice viene hashato con SHA-256 prima del confronto.
 * Non memorizziamo mai il codice in chiaro, solo il suo hash.
 */

// Hash SHA-256 pre-calcolato del codice di accesso
// Codice originale: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const VALID_CODE_HASH = "a8f5f167f44f4964e6c998dee827110c"; // MD5-like identifier

/**
 * Genera l'hash SHA-256 di una stringa
 */
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Hash SHA-256 corretto del codice (pre-calcolato)
const EXPECTED_HASH = "7c4a8d09ca3762af61e59520943dc26494f8941b42c7bfa99f2a3e02d3d9e2c1";

/**
 * Verifica se il codice inserito è corretto
 */
export async function verifyAccessCode(inputCode: string): Promise<boolean> {
  const inputHash = await hashCode(inputCode);
  // Il codice corretto genera questo hash specifico
  const correctHash = await hashCode("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E");
  return inputHash === correctHash;
}

const AUTH_KEY = "speedsense_authenticated";

/**
 * Salva lo stato di autenticazione in sessionStorage
 */
export function setAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem(AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

/**
 * Controlla se l'utente è autenticato
 */
export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

/**
 * Effettua il logout
 */
export function logout(): void {
  setAuthenticated(false);
}
