import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class EncargadosController {

  // ➕ ASIGNAR encargado a supermercado
  async asignar({ request, response }: HttpContext) {
    const { usuario_id, supermercado_id } = request.only([
      'usuario_id',
      'supermercado_id'
    ])

    // Validar datos
    if (!usuario_id || !supermercado_id) {
      return response.badRequest({
        mensaje: 'usuario_id y supermercado_id son obligatorios'
      })
    }

    // Verificar que usuario existe
    const usuario = await db.from('usuarios')
      .where('id', usuario_id)
      .first()

    if (!usuario) {
      return response.badRequest({
        mensaje: 'El usuario no existe'
      })
    }

    // Verificar que supermercado existe
    const supermercado = await db.from('supermercados')
      .where('id', supermercado_id)
      .first()

    if (!supermercado) {
      return response.badRequest({
        mensaje: 'El supermercado no existe'
      })
    }

    // Insertar relación
    await db.table('encargados').insert({
      usuario_id,
      supermercado_id
    })

    return response.json({
      mensaje: 'Encargado asignado correctamente'
    })
  }

  // 📋 LISTAR encargados por supermercado
  async listarPorSupermercado({ params, response }: HttpContext) {
    const data = await db
      .from('encargados')
      .join('usuarios', 'usuarios.id', 'encargados.usuario_id')
      .where('encargados.supermercado_id', params.id)
      .select(
        'usuarios.id',
        'usuarios.nombre',
        'usuarios.email'
      )

    return response.json(data)
  }
}