import type { HttpContext } from '@adonisjs/core/http'

export default class AcumulacionPuntosController {
  /**
   * Registrar una nueva entrega de material y asignar puntos
   * Requerimiento: ACP-001
   */
  public async registrar({ request, response }: HttpContext) {
    const { usuario_id, material_id, peso } = request.all()
    
    return response.created({
      mensaje: 'Puntos asignados exitosamente',
      detalle: {
        usuario_id,
        puntos_ganados: peso * 10, // Ejemplo de lógica
        comprobante_id: 'TICKET-12345'
      }
    })
  }

  /**
   * Ver el historial de puntos de un usuario
   */
  public async historial({ request, response }: HttpContext) {
    return response.ok({
      mensaje: 'Historial de acumulación obtenido'
    })
  }
} 