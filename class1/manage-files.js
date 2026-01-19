import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

let content = ''

if (process.permission.has('fs.read', 'ejemplo1.txt')) {
  content = await readFile('ejemplo1.txt', 'utf-8')
  console.log(content)
} else {
  console.log('No tienes permisos para leer este archivo')
}

if (process.permission.has('fs.write', 'output/files/documents')) {
  const ouputDir = join('output', 'files', 'documents')
await mkdir(ouputDir, { recursive: true })

const upperCaseContent = content.toUpperCase()
const outputFilePath = join(ouputDir, 'ejemplo1-uppercase.txt')

console.log('La extensión es: ', extname(outputFilePath))
console.log('El nombre del archivo es: ', basename(outputFilePath))

await writeFile(outputFilePath, upperCaseContent)
console.log('Se creo el archivo ejemplo1.txt con mayúsculas')
} else {
  console.log('No tienes permisos para escribir en este directorio en específico')
}

// Comandos para acceder con permisos desde la consola
// node --permission manage-files.js
// node --permission --allow-fs-read="./ejemplo1.txt" --allow-fs-write="./output/*" manage-files.js
