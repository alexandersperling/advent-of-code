const fs = require('fs')
const path = require('path')
const readline = require('readline')

const FILE_PATH = path.resolve('./modules')

function calculateFuelAmount (mass) {
  const fuelAmount = mass === 0 ? 0 : Math.floor((mass / 3)) - 2 < 0 ? 0 : Math.floor((mass / 3)) - 2
  console.log(`Module with mass of ${mass} needs ${fuelAmount} amount of fuel`)
  return fuelAmount
}

async function main () {
  const rl = readline.createInterface({
    input: fs.createReadStream(FILE_PATH)
  })
  let totalFuel = 0
  for await (const line of rl) {
    let fuel = calculateFuelAmount(line)
    totalFuel += fuel

    while (fuel > 0) {
      fuel = calculateFuelAmount(fuel)
      totalFuel += fuel
    }
  }
  console.log(`TOTAL AMOUNT OF FUEL NEEDED: ${totalFuel}`)
}

main()
