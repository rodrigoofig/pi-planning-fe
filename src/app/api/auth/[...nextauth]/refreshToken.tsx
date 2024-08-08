export default async function refreshAccessToken(token) {
    try {
      const url = 'https://auth.atlassian.com/oauth/token';
  
      const data = {
        grant_type: 'refresh_token',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: token.refreshToken,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.log(error);
  
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  }