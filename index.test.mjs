import { readFile } from 'fs/promises'
import { resolve } from 'path'

const file = await readFile(resolve('tarif590.json'), { encoding: 'utf-8' })
const json = JSON.parse(file)

// Anamnese
if (json['1200']['de'] !== 'Anamnese / Untersuchung / Diagnostik / Befunderhebung, pro 5 Min.') process.exit(1)

// Osteopathie
if (json['1203']['de'] !== 'Osteopathie, pro 5 Min.') process.exit(1)
