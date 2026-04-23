import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Hash from '@adonisjs/core/services/hash'

export default class AccessTokensController {

  // 🔐 LOGIN
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // Buscar usuario
    const usuario = await db.from('usuarios')
      .where('email', email)
      .first()

    if (!usuario) {
      return response.badRequest({
        mensaje: 'Usuario no existe'
      })
    }

    // Verificar contraseña
    const verificar = await Hash.verify(usuario.password, password)

    if (!verificar) {
      return response.badRequest({
        mensaje: 'Contraseña incorrecta'
      })
    }

    // ⚠️ SIMULACIÓN DE TOKEN (simple)
    const token = Math.random().toString(36).substring(2)

    return response.json({
      mensaje: 'Login exitoso',
      token,
      usuario
    })
  }

  // 🚪 LOGOUT
  async logout({ response }: HttpContext) {
    return response.json({
      mensaje: 'Logout exitoso'
    })
  }
}