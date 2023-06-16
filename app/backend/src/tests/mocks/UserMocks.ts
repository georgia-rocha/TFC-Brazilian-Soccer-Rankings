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

export {
  login,
  loginOnlyEmail,
  loginOnlyPassword,
  loginIncorrect,
}
