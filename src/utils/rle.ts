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

  let count = ''
  for (let i = 0; i < text.length; i++) {
    let sign = splitText[i]
    const isNumber = Number(sign)

    if (isNumber || sign === '0') {
      count += splitText[i]
    }

    if (!isNumber && sign !== '0') {
      const countNumber = Number(count)
      for (let j = 0; j < countNumber; j++) {
        result += splitText[i]
      }
      count = ''
    }
  }

  return result
}

export { compress, decompress }
