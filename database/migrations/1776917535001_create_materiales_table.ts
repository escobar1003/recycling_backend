import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateMaterialesTable extends BaseSchema {
  protected tableName = 'materiales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre').notNullable()
      table.integer('puntos_por_kg').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}