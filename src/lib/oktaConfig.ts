export const oktaConfig = {
    clientId: '0oahxfqoq5rBpyQuI5d7',
    issuer: 'https://dev-36347935.okta.com/oauth2/default',
    redirectUri: 'http//localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}