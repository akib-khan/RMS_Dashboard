import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: Math.floor(Math.random() * 10000000),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeData(...lens) {
  console.log("lens: ",lens);
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    console.log("lens1: ",lens," depth: ",depth," lens_depth: ",lens[depth]);
    return range(len).map(d => {
      { console.log("lens2: ",lens," depth: ",depth," lens_depth: ",lens[depth]); }
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
