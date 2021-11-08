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

export { compress }
