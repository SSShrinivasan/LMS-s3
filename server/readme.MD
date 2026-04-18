http://localhost:5000/api/auth/register
payload:
{
  "email": "admin@tcs.com",
  "password": "123456",
  "role": "admin",
  "tenant": "tcs"
}
http://localhost:5000/api/auth/login
payload
{
  "email": "admin@tcs.com",
  "password": "123456",
  "tenant": "tcs"
}
http://localhost:5000/api/files/upload
Headers
Add 
Authorization Bearer <token>
content-type application/json
Go to body
Key:file
value:send path

📌 Backend Pending Tasks
 Add logout & refresh token
 Implement role-based access (admin/instructor/student)
 Improve multi-tenant (separate Tenant model, strict isolation)
 Save video metadata (title, duration, thumbnail)
 Add video update/delete APIs
 Track user progress (video completion)
 Generate certificate (PDF)
 Secure S3 (file validation, private access)
 Add input validation (Joi / express-validator)
 Improve error handling & logging