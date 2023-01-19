/**
 * get animation array for merge sort
 * @param {*} array 
 * @returns animation array
 */
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

/**
 * get animation array for quick sort
 * @param {*} array 
 * @returns animation array
 */
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

/**
 * get animation array for bubble sort
 * @param {*} array 
 * @returns animation array
 */
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array.length - 1, array, animations);
  return animations;
}

export function getHeapSortAnimations(stateArray) {
  const animations = [];
  if (stateArray.length <= 1) return stateArray;
  // make a copy of the original array
  const array = stateArray.slice(0);
  // call helper function to build a max heap
  buildMaxHeap(array, animations);
  let end = array.length - 1;
  while(end > 0) {
    // as a max heap, array[0] now holds the max element in the array
    // swap it to the end of the array
    animations.push([0, end, true]);
    let temp = array[end];
    array[end] = array[0];
    array[0] = temp;
    animations.push([0, array[0], end, array[end]]);
    animations.push([0, end, false]);
    animations.push([end]);
    // sift down current array[0] to make sure it is still a max heap
    siftDown(array, 0, end, animations);
    // elements on the left end has finished sorting
    end--;
  }
  animations.push([end]);
  return animations;
}

// helper functions
function buildMaxHeap(array, animations) {
  // we just need to compare half of the nodes because other half will be leaf nodes
  let currentIndex = Math.floor(array.length / 2);
  while (currentIndex >= 0) {
    siftDown(array, currentIndex, array.length, animations);
    currentIndex--;
  }
}

function siftDown(array, start, end, animations) {
  if (start >= Math.floor(end / 2)) {
    return;
  }
  let left = start * 2 + 1;
  let right = start * 2 + 2 < end ? start * 2 + 2 : null;
  // find the larger child
  let swap;
  if (right) {
    animations.push([start, left, right, true]);
    animations.push([start, left, right, false]);
    swap = (array[left] > array[right]) ? left : right;
  } else{
    swap = left;
    animations.push([start, left, true, true]);
    animations.push([start, left, false, true]);
  }
  if(array[start] < array[swap]) {
    // child larger than parent, need to sift down parent
    // animations.push([start, swap, true]);
    let temp = array[swap];
    array[swap] = array[start];
    array[start] = temp;
    animations.push([start, array[start], swap, array[swap]]);
    animations.push([start, swap, false]);
    // check next layer of the heap
    siftDown(array, swap, end, animations);
  }
}

function quickSortHelper(array, start, end, animations) {
  if (start >= end) {
    return;
  }
  let pivot = start;
  let left = start + 1;
  let right = end;
  // record the pivot
  animations.push([pivot, true]);
  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      // set color to red
      animations.push([left, right, true]);
      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
      // change height (swapping)
      animations.push([left, array[left], right, array[right]]);
      // set color to blue
      animations.push([left, right, false]);
    }
    if (array[right] >= array[pivot]) {
      right--;
    }
    if (array[left] <= array[pivot]) {
      left++;
    }
  }
  if (pivot !== right) {
    animations.push([pivot, right, true]);
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
    animations.push([pivot, array[pivot], right, array[right]]);
    animations.push([pivot, right, false]);
  } else {
    animations.push([right, false]);
  }
  quickSortHelper(array, start, right - 1, animations);
  quickSortHelper(array, right + 1, end, animations);
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  // sort left half
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  // sort right half
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // to change their color
    animations.push([i, j]);
    // to revert their color
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // to change their color
    animations.push([i, i]);
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // to change their color
    animations.push([j, j]);
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function bubbleSortHelper(
  endIdx,
  array,
  animations,
) {
  let i, j;
  for (i = 0; i <= endIdx; i++) {
    for (j = 0; j < endIdx - i; j++) {
      animations.push([j, (j + 1)]);
      animations.push([j, (j + 1)]);
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        animations.push([j + 1, array[j + 1], j, array[j]]);
      } else {
        animations.push([]);
      }
    }
  }

}

function swap(arr, xp, yp) {
  const temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}