import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateSupermercadosTable extends BaseSchema {
  protected tableName = 'supermercados'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre').notNullable()
      table.string('direccion').notNullable()
      table.string('telefono').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}