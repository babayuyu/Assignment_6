# API Testing Guide

## Authentication Tests

1. Test login with valid credentials
2. Test login with invalid credentials
3. Test token expiration
4. Test access with invalid token

## Authorization Tests

1. Test admin-only routes as admin
2. Test admin-only routes as regular user
3. Test editor routes with different roles

## Rate Limiting Tests

1. Test exceeding rate limit
2. Test different endpoints for rate limiting

## CORS Tests

1. Test from allowed origin
2. Test from disallowed origin
3. Test allowed methods

## Sample cURL Commands

### Login:

```Powershell

curl.exe -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{\"username\":\"admin\",\"password\":\"admin123\"}'

curl.exe -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{\"username\":\"admin\",\"password\":\"admin000\"}'

curl.exe -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{\"username\":\"Mustapha\",\"password\":\"Musty@123\"}'

curl.exe -v http://localhost:3000/api/protected -H "Authorization: Bearer $adminToken"

curl.exe http://localhost:3000/api/admin -H "Authorization: Bearer $adminToken"

curl.exe http://localhost:3000/api/admin -H "Authorization: Bearer $userToken"

curl.exe -v http://localhost:3000/api/protected

1..101 | ForEach-Object {
    curl.exe -X POST http://localhost:3000/auth/login `
        -H "Content-Type: application/json" `
        -d '{\"username\":\"admin\",\"password\":\"admin123\"}'
    Write-Host "Request $_ completed"
}

curl.exe -v http://localhost:3000/api/protected -H "Authorization: Bearer $adminToken"

1..6 | ForEach-Object {
    curl.exe -X POST http://localhost:3000/auth/login `
        -H "Content-Type: application/json" `
        -d '{\"username\":\"admin\",\"password\":\"wrongpass\"}'
}

curl.exe -v http://localhost:3000/api/protected -H "Origin: http://localhost:8100" -H "Authorization: Bearer $adminToken"

curl.exe -v http://localhost:3000/api/protected -H "Origin: http://malicious.com" -H "Authorization: Bearer $adminToken"

curl.exe -v -X OPTIONS http://localhost:3000/api/protected `
  -H "Origin: http://localhost:8100" `
  -H "Access-Control-Request-Method: POST" `
  -H "Access-Control-Request-Headers: Content-Type"
```
