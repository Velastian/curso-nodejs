import os from 'node:os'
import ms from 'ms'

console.log('Información del sistema operativo: ')
console.log('Plataforma: ', os.platform())
console.log('Arquitectura: ', os.arch())
console.log('Memoria total: ', os.totalmem())
console.log('Memoria libre: ', os.freemem())
console.log('Directorio home de usuario: ', os.homedir())
console.log('Tiempo de actividad del sistema (segundos): ', ms(os.uptime() * 1000, { long: true }))
console.log('------------------------------------------------')

console.log('CPUS: ', os.cpus())
console.log('Interfaces de red: ', os.networkInterfaces())
console.log('------------------------------------------------')

//Información adicional
console.log('Número de núcleos de CPU: ', os.cpus().length)
console.log('Hostname del sistema: ', os.hostname())
console.log('Versión del OS: ', os.release())
