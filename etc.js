const isValidName = name => /^[a-z ,.'-]+$/i.test(name);

class Test {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  get fullName() {
    return this.first + this.last;
  }

  set fullName(name) {
    if (isValidName(name)) {
      const nameArr = name.split(' ');
      console.log('nameArr', nameArr);
      if (nameArr.length > 1) {
        console.log('called');
        const lastName = nameArr.pop();
        const firstName = nameArr.join(' ');
        this.first = firstName;
        this.last = lastName;
      }
    }
  }
}

const person = new Test('David', 'Hong');

console.log(person.fullName);

person.fullName = 'asdf sadf';

console.log(person);
