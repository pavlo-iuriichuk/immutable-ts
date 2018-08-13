export class List<T = {}> {
  private static readonly empty = new List();
  public static Empty<T>(): List<T> {
    return List.empty as List<T>;
  }

  public static from<T>(obj: Array<T> | T) {
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return List.Empty();
      }
      let current = List.Empty();
      for (const element of obj) {
        current = current.append(element);
      }
      return current;
    } else {
      return new List(obj);
    }
  }

  private readonly data: T = null;
  private readonly head: List<T> = null;

  constructor(data: T = null, head: List<T> = null) {
    this.data = data;
    this.head = head;
  }

  public isEmpty(): boolean {
    return this.data === null && this.head === null;
  }

  public isHead(): boolean {
    return this.head === null;
  }

  public append(data: T): List<T> {
    return new List(data, this);
  }

  public prepend(data: T): List<T> {
    if (this.isEmpty()) {
      return new List(data, this);
    } else {
      return new List(this.data, new List(data, this.head));
    }
  }

  public reverse(): List<T> {
    let result = List.Empty<T>();
    for (const element of this.generator()) {
      result = new List(element, result);
    }
    return result;
  }

  public pop(): List<T> {
    return this.head;
  }

  public peek(): T {
    return this.data;
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
    return result;
  }

  public *generator(): Iterable<T> {
    let current = this as List<T>;
    if (current.isEmpty()) {
      return null;
    }
    while (!current.isHead()) {
      yield current.data;
      current = current.head;
    }
    if (current.data !== null) {
      yield current.data;
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
          done: current.isHead(),
          value: current.data
        };
        current = current.head;
        return result;
      }
    };
  }
}
