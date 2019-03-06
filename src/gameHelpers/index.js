export function getBuildingPowerOutput(level) {
  switch (level) {
    case 1:
      return 1

    case 2:
      return 2

    case 3:
      return 3
  
    default:
      return 0
  }
}


// TODO: standardize this
export function getPlayerId(playerName) {
  switch (playerName) {
    case 'blue':
      return 1
      
    case 'red':
      return 2
  
    default:
      break;
  }
}

export function getUpgradeCost(level) {
  switch (level) {
    case 0:
      return 1
    case 1:
      return 2
    case 2:
      return 3
    default:
      return 1
  }
}

export function getShadowLenght(level) {
  console.log('got level', level)
  switch (level) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    default:
      return 0
  }
}