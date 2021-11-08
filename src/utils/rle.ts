function compress(text: string) {
  let result = ''

  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    let count = 1

    while (text[i + 1] === char) {
      count++
      i++
    }

    result += count + char
  }

  return result
}

function decompress(text: string) {
  let result = ''
  const splitText = Array.from(text)

  for (let i = 0; i < text.length; i++) {
    if (i % 2 === 0) {
      const count = Number(splitText[i])
      for (let j = 0; j < count; j++) {
        result += splitText[i + 1]
      }
    }
  }

  return result
}

export { compress, decompress }
