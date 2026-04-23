import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Supermercado from 'Supermercado'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Encargado extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare telefono: string

  @column()
  declare supermercadoId: number

  @belongsTo(() => Supermercado)
  declare supermercado: BelongsTo<typeof Supermercado>
}