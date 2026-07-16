export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  ip?: string
): Promise<boolean> {
  if (!token) return false;
  
  // Dev site keys bypass
  if (token === '1x00000000000000000000AA' || secretKey === '1x0000000000000000000000000000000AA') {
    return true;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const result = (await response.json()) as { success: boolean };
    return result.success;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}
