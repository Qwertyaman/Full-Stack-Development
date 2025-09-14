// Base class: Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method to display basic info
  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Subclass: Student
class Student extends Person {
  constructor(name, age, course) {
    super(name, age); // Call parent constructor
    this.course = course;
  }

  // Override displayInfo to add course
  displayInfo() {
    return `${super.displayInfo()}, Course: ${this.course}`;
  }
}

// Subclass: Teacher
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age); // Call parent constructor
    this.subject = subject;
  }

  // Override displayInfo to add subject
  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

// Create instances
const student1 = new Student("Alice", 20, "Computer Science");
const teacher1 = new Teacher("Mr. Smith", 40, "Mathematics");

// Demonstrate method calls
console.log(student1.displayInfo()); 
// Output: Name: Alice, Age: 20, Course: Computer Science

console.log(teacher1.displayInfo()); 
// Output: Name: Mr. Smith, Age: 40, Subject: Mathematics
