import { expect } from "chai";
import { List } from "./List";
describe("List", () => {
  describe("#size()", () => {
    it("should return 0 for empty list", () => {
      expect(List.Empty().size()).to.eq(0);
    });
    it("should return 1 for list with one element", () => {
      expect(new List(1).size()).to.eq(1);
    });
    it("should return 2 for list of 2 elements", () => {
      expect(new List(1, new List(2)).size()).to.eq(2);
    });
  });
  describe("#append()", () => {
    it("should return new list with inserted data, empty list", () => {
      const list = List.Empty().append(1);
      expect(list.size()).to.eq(1);
      expect(list.peek()).to.eq(1);
      expect(list.pop().isEmpty()).to.eq(true);
    });
    it("should return new list with inserted data, non-epty list", () => {
      const list = List.Empty().append(1);
      const newList = list.append(2);
      expect(newList.size()).to.eq(2);
      expect(newList.pop()).to.eq(list);
      expect(newList.peek()).to.eq(2);
    });
  });
  describe("#prepend()", () => {
    it("should return new list with origin list data, empty list", () => {
      const list = List.Empty().prepend(1);
      expect(list.isHead()).to.eq(false);
      expect(list.isEmpty()).to.eq(false);
      expect(list.size()).to.eq(1);
      expect(list.peek()).to.eq(1);
      expect(list.pop().isEmpty()).to.eq(true);
    });
    it("should return new list with inserted data, non-epty list", () => {
      const list = List.Empty().append(1);
      const newList = list.prepend(2);
      expect(newList.isHead()).to.eq(false);
      expect(newList.isEmpty()).to.eq(false);
      expect(newList.size()).to.eq(2);
      expect(newList.peek()).to.eq(1);
      expect(newList.pop().peek()).to.eq(2);
    });
  });
  describe("#from()", () => {
    it("should create List from Array", () => {
      const arr = [1,2,3];
      const list = List.from(arr);
      let index = arr.length - 1;
      for (const element of list.generator()) {
        expect(element).to.eq(arr[index--]);
      }
    });
    it("should create List from non-array", () => {
      const list = List.from(123);
      expect(list.size()).to.eq(1);
      expect(list.peek()).to.eq(123);
      expect(list.isHead()).to.eq(true);
    });
  })
});
