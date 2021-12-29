function compress(text: string) {
  let result = ''

  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    let count = 1

    while (text[i + 1] === char) {
      count++
      i++
    }

    result += '-' + count + char
  }

  return result
}

function decompress(text: string) {
  let result = ''

  for (let i = 0; i < text.length; i++) {
    let sign = text[i]

    if (sign === '-' && !Number.isNaN(Number(text[i + 1]))) {
      let count = parseInt(text[i + 1])
      let char = text[i + 2]

      for (let j = 0; j < count; j++) {
        result += char
      }

      i += 2
    }
  }

  return result
}

export { compress, decompress }
