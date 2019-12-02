const fs = require('fs')
const path = require('path')
const readline = require('readline')

const FILE_PATH = path.resolve('./modules')

function calculateFuelAmount (mass) {
  const fuelAmount = Math.floor((mass / 3)) - 2
  console.debug(`Module with mass of ${mass} needs ${fuelAmount} amount of fuel`)
  return fuelAmount
}

async function main () {
  const rl = readline.createInterface({
    input: fs.createReadStream(FILE_PATH)
  })

  let totalFuel = 0
  let fuelBefore = 0
  for await (const line of rl) {
    let fuelAmount = calculateFuelAmount(line)
    totalFuel += fuelAmount
    fuelBefore = totalFuel - fuelAmount
    console.debug(`Total amount of fuel increased from ${fuelBefore} to ${totalFuel}`)
  }

  console.log(`Total amount of fuel needed: ${totalFuel}`)
}

main()
