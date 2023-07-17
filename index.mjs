import { read } from 'xlsx/xlsx.mjs'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'

const buffer = await readFile(resolve('Tarif_590_v7.xlsx'))
const workbook = read(buffer, {
  sheetStubs: true,
  cellDates: true,
  cellStyles: true
})

const sheet = workbook.Sheets[workbook.SheetNames[0]]
let tarife = {}
const now = new Date()

for (let i = 3; i < 500; i++) {
  // needs to have a valid "Abrechnungsziffer"
  const ziffer = +sheet[`M${i}`]?.v
  if (!ziffer) continue

  // needs to be "Valid" by date
  const validUntil = sheet[`U${i}`]?.v
  if (new Date(validUntil) < new Date()) continue

  const position = sheet[`M${i}`].v
  const de = sheet[`N${i}`].v
  const fr = sheet[`O${i}`].v
  const it = sheet[`P${i}`].v

  if (position && de && fr && it) tarife = { ...tarife, [position]: { de, fr, it } }
}

await writeFile(resolve('tarif590.json'), JSON.stringify(tarife), { encoding: 'utf-8' })
