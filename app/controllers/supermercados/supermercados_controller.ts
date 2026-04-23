import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SupermercadosController {

  async index({ response }: HttpContext) {
    const data = await db.from('supermercados')
    return response.json(data)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'direccion', 'telefono'])

    await db.table('supermercados').insert(data)

    return response.json({ mensaje: 'Supermercado creado' })
  }

  async show({ params, response }: HttpContext) {
    const data = await db.from('supermercados')
      .where('id', params.id)
      .first()

    return response.json(data)
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['nombre', 'direccion', 'telefono'])

    await db.from('supermercados')
      .where('id', params.id)
      .update(data)

    return response.json({ mensaje: 'Actualizado' })
  }

  async destroy({ params, response }: HttpContext) {
    await db.from('supermercados')
      .where('id', params.id)
      .delete()

    return response.json({ mensaje: 'Eliminado' })
  }
}