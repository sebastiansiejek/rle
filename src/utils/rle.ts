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

  result = result.substring(1)

  return result
}

function decompress(text: string) {
  let result = ''

  const findPart = (
    text: string,
    startPosition: number = 0
  ): {
    count: number
    char: string | number
  } => {
    let count = ''
    let char = ''

    for (let index = startPosition; index < text.length; index++) {
      char = text[index]

      if (text[index] !== '-' || index === text.length) {
        count += char
      } else {
        count = count.slice(0, -1)

        return {
          count: Number(count),
          char: text[index - 1],
        }
      }
    }

    return {
      count: Number(count.slice(0, -1)),
      char,
    }
  }

  const concatResult = (char: string | number, count: number) => {
    let result = ''

    for (let j = 0; j < count; j++) {
      result += char
    }

    return result
  }

  const isSinglePart = !text.includes('-')

  if (isSinglePart) {
    const { count, char } = findPart(text)

    for (let j = 0; j < count; j++) {
      result += char
    }
  }

  if (!isSinglePart) {
    const { count, char } = findPart(text, 0)
    result += concatResult(char, count)

    for (let index = 0; index < text.length; index++) {
      if (text[index] === '-') {
        const { count, char } = findPart(text, index + 1)
        result += concatResult(char, count)
      }
    }
  }

  return result
}

export { compress, decompress }
