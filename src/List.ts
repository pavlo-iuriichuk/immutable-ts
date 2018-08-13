export class List<T = {}> {
  private static readonly empty = new List();
  public static Empty<T>(): List<T> {
    return List.empty as List<T>;
  }

  public static fromArray<T>(arr: Array<T>) {
    if (arr.length === 0) {
      return List.Empty();
    }
    let current = List.Empty();
    for (const element of arr) {
      current = current.add(element);
    }
    return current;
  }

  private readonly head: T = null;
  private readonly tail: List<T> = null;

  constructor(data: T = null, tail: List<T> = null) {
    this.head = data;
    this.tail = tail;
  }

  public isEmpty(): boolean {
    return this.head === null && this.tail === null;
  }

  public isLast(): boolean {
    return this.tail === null;
  }

  public add(data: T): List<T> {
    return new List(data, this);
  }

  public reverse(): List<T> {
    let result = List.Empty<T>();
    for (const element of this.generator()) {
      result = new List(element, result);
    }
    return result;
  }

  public pop(): List<T> {
    return this.tail;
  }

  public peek(): T {
    return this.head;
  }

  public size(): number {
    let result = 0;
    for (const element of this.generator()) {
      result++;
    }
    return result;
  }

  public toArray(): Array<T> {
    const result = [];
    for (const element of this.generator()) {
      result.push(element);
    }
    return result.reverse();
  }

  public *generator(): Iterable<T> {
    let current = this as List<T>;
    if (current.isEmpty()) {
      return null;
    }
    while (!current.isLast()) {
      yield current.head;
      current = current.tail;
    }
    if (current.head !== null) {
      yield current.head;
    }
  }

  public iterator() {
    let current = this as List<T>;
    return {
      next: () => {
        let result;
        if (current.isEmpty()) {
          result = {
            done: true
          };
        }
        result = {
          done: current.isLast(),
          value: current.head
        };
        current = current.tail;
        return result;
      }
    };
  }
}
