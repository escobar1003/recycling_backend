import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel' // Importante para la seguridad

router.group(() => {
  
  // --- SEGURIDAD Y AUTENTICACIÓN ---
  router.post('registro', '#controllers/autenticacion/registro_controller.handle')
  router.post('login', '#controllers/autenticacion/login_controller.handle')
  
  // Recuperación de contraseña (Pública)
  router.post('recuperar-password', '#controllers/autenticacion/recuperar_passwords_controller.solicitar')
  router.patch('restablecer-password', '#controllers/autenticacion/recuperar_passwords_controller.cambiar')

  // Cambio de contraseña (Privada - Usuario logueado)
  router.patch('cambiar-password-perfil', '#controllers/autenticacion/recuperar_passwords_controller.cambiarConVerificacion')
    .use(middleware.auth())

  // --- GESTIÓN DE USUARIOS (Administración) ---
  router.group(() => {
    router.get('/', '#controllers/usuarios/gestion_usuarios_controller.listar')
    router.get('/:id', '#controllers/usuarios/gestion_usuarios_controller.verUno')
    router.put('/:id', '#controllers/usuarios/gestion_usuarios_controller.actualizar')
    router.delete('/:id', '#controllers/usuarios/gestion_usuarios_controller.eliminar')
    router.patch('/:id/estado', '#controllers/usuarios/gestion_usuarios_controller.cambiarEstado')
  })
  .prefix('usuarios')
  .use(middleware.auth())

  // --- SUPERMERCADOS Y PUNTOS DE RECICLAJE ---
  router.group(() => {
    router.get('/', '#controllers/supermercados/puntos_reciclaje_controller.index')
    router.post('/', '#controllers/supermercados/puntos_reciclaje_controller.store')
    router.get('/:id', '#controllers/supermercados/puntos_reciclaje_controller.show')
    router.put('/:id', '#controllers/supermercados/puntos_reciclaje_controller.update')
    router.delete('/:id', '#controllers/supermercados/puntos_reciclaje_controller.destroy')

    // --- ENCARGADOS DE SUPERMERCADOS ---
    router.post('/:id/encargados', '#controllers/supermercados/encargados_controller.crear')
    router.get('/:id/encargados', '#controllers/supermercados/encargados_controller.listar')
  })
  .prefix('supermercados')

  // eliminar encargado (fuera del grupo porque no necesita id de supermercado)
  router.delete('encargados/:id', '#controllers/supermercados/encargados_controller.eliminar')
    .use(middleware.auth())

  // --- MATERIALES ---
  router.group(() => {
    router.get('/', '#controllers/administracion/materiales_controller.index')
    router.post('/', '#controllers/administracion/materiales_controller.store')
    router.put('/:id', '#controllers/administracion/materiales_controller.update')
    router.delete('/:id', '#controllers/administracion/materiales_controller.destroy')
  })
  .prefix('materiales')

  // --- ADMINISTRADORES ---
  router.group(() => {
    router.post('/', '#controllers/administracion/administradores_controller.crear')
    router.get('/', '#controllers/administracion/administradores_controller.listar')
  })
  .prefix('administradores')
  .use(middleware.auth())

  // --- ACUMULACIÓN Y CANJE DE PUNTOS ---
  router.group(() => {
    router.post('acumular', '#controllers/puntos/acumulacion_puntos_controller.registrar')
    router.get('historial-acumulacion', '#controllers/puntos/acumulacion_puntos_controller.historial')
    router.post('canjear', '#controllers/puntos/canje_recompensas_controller.ejecutar')
    router.get('recompensas-disponibles', '#controllers/puntos/canje_recompensas_controller.listar')
  })
  .use(middleware.auth())

}).prefix('api/v1')