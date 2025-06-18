import React, { useState } from "react";

export const MinHeap = () => {
  const [heap, setHeap] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [inputArray, setInputArray] = useState<string[]>([]);

  const addNumber = () => {
    if (!inputValue) return;

    const number = parseInt(inputValue);
    if (isNaN(number)) {
      alert("Please enter a valid number");
      return;
    }

    const newHeap = [...heap, number];
    setInputArray([...inputArray, inputValue]);
    bubbleUp(newHeap);
    setInputValue(""); // Clear input after adding
  };

  const removeNumber = () => {
    if (heap.length === 0) {
      alert("List is empty!");
      return;
    }

    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.splice(newHeap.length - 1, 1);

    bubbleDown(newHeap);
  };

  const getParentIndex = (index: number) => Math.floor((index - 1) / 2);

  const bubbleUp = (heap: number[]) => {
    // Current new number index
    let currentNumIndex = heap.length - 1;

    // Get parent index
    let parentIndex = getParentIndex(currentNumIndex);
    const value = heap[currentNumIndex];

    while (currentNumIndex > 0 && heap[parentIndex] > heap[currentNumIndex]) {
      // Swap indexes
      heap[currentNumIndex] = heap[parentIndex];
      heap[parentIndex] = value;
      currentNumIndex = parentIndex;

      // Get new parent index
      parentIndex = getParentIndex(currentNumIndex);
    }

    setHeap(heap);
  };

  const getLeftIndex = (index: number) => 2 * index + 1;

  const getRightIndex = (index: number) => 2 * index + 2;

  const bubbleDown = (heap: number[]) => {
    let index = 0;

    while (true) {
      const indexValue = heap[index];
      const leftIndex = getLeftIndex(index);
      const rightIndex = getRightIndex(index);
      const length = heap.length;
      let smallestIndex = index;

      if (leftIndex < length && heap[leftIndex] < heap[rightIndex]) {
        smallestIndex = leftIndex;
      }

      if (rightIndex < length && heap[rightIndex] < heap[leftIndex]) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex > index && heap[smallestIndex] < heap[index]) {
        heap[index] = heap[smallestIndex];
        heap[smallestIndex] = indexValue;
        index = smallestIndex;
      } else {
        break;
      }
    }

    setHeap(heap);
  };

  return (
    <>
      <div>
        Enter Number:{" "}
        <input
          type="number"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button onClick={() => addNumber()}>Add</button>
        <button onClick={() => removeNumber()}>Remove</button>
      </div>

      <div>Input Array: {inputArray.join(", ")}</div>

      <div>Sorted Array: {heap.join(", ")}</div>
    </>
  );
};

export default MinHeap;
