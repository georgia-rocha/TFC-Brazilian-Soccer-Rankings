const login = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const loginIncorrect = {
  "email": "admin.admin.com",
  "password": "secret_admin"
}

const loginOnlyPassword = {
  "password": "secret_admin"
}

const loginOnlyEmail = {
  "email": "admin@admin.com"
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NjkyNzk0NSwiZXhwIjoxNjg5NTE5OTQ1fQ.2sdZ8lYvvYXR1knpd7-N2ko5Q9ZEM7mMIic126rzKRc';
export {
  login,
  loginOnlyEmail,
  loginOnlyPassword,
  loginIncorrect,
  token,
}
