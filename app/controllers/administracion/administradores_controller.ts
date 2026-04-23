import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Hash from '@adonisjs/core/services/hash'

export default class AdministradoresController {

  // 🔍 LISTAR solo ADMIN
  async index({ response }: HttpContext) {
    const admins = await db.from('usuarios')
      .where('rol', 'ADMIN')

    return response.json(admins)
  }

  // ➕ CREAR ADMIN
  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'email', 'password'])

    // Validación básica (importante)
    if (!data.nombre || !data.email || !data.password) {
      return response.badRequest({
        mensaje: 'Todos los campos son obligatorios'
      })
    }

    // Verificar si ya existe el email
    const existe = await db.from('usuarios')
      .where('email', data.email)
      .first()

    if (existe) {
      return response.badRequest({
        mensaje: 'El email ya está registrado'
      })
    }

    // Encriptar contraseña
    data.password = await Hash.make(data.password)

    // Asignar rol ADMIN
    const nuevoAdmin = {
      ...data,
      rol: 'ADMIN'
    }

    await db.table('usuarios').insert(nuevoAdmin)

    return response.json({
      mensaje: 'Administrador creado correctamente'
    })
  }

  // 🔍 VER UN ADMIN
  async show({ params, response }: HttpContext) {
    const admin = await db.from('usuarios')
      .where('id', params.id)
      .where('rol', 'ADMIN')
      .first()

    if (!admin) {
      return response.notFound({
        mensaje: 'Administrador no encontrado'
      })
    }

    return response.json(admin)
  }

  // ✏️ ACTUALIZAR ADMIN
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['nombre', 'email'])

    await db.from('usuarios')
      .where('id', params.id)
      .where('rol', 'ADMIN')
      .update(data)

    return response.json({
      mensaje: 'Administrador actualizado'
    })
  }

  // ❌ ELIMINAR ADMIN
  async destroy({ params, response }: HttpContext) {
    await db.from('usuarios')
      .where('id', params.id)
      .where('rol', 'ADMIN')
      .delete()

    return response.json({
      mensaje: 'Administrador eliminado'
    })
  }
}