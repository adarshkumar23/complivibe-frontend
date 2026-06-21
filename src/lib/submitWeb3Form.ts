/**
 * Shared Web3Forms submission helper.
 *
 * Reads the public access key from NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, POSTs the
 * payload to Web3Forms, and resolves only on a genuine success response.
 * Throws a descriptive Error on missing key, network failure, or API failure —
 * callers must surface that as a real error state (never fake success).
 *
 * NOTE: Web3Forms' free plan only accepts submissions from a real browser
 * (client side). This helper is meant to run in client components.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormResult = { success: boolean; message: string };

export async function submitWeb3Form(
  fields: Record<string, string>,
): Promise<Web3FormResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error(
      "Form is not configured yet. Please email contact@complivibe.in.",
    );
  }

  let res: Response;
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, ...fields }),
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  let json: Web3FormResult;
  try {
    json = (await res.json()) as Web3FormResult;
  } catch {
    throw new Error("Unexpected response from the form service.");
  }

  if (!res.ok || !json.success) {
    throw new Error(json?.message || `Submission failed (${res.status}).`);
  }

  return json;
}
