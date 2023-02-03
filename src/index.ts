class Person {
  speak (name?: string): string {
    return `Olá ${name?.toLocaleUpperCase() ?? 'Fulano'}!!!`
  }
}

const p = new Person()
console.log(p.speak('Tiago'))
console.log(p.speak())