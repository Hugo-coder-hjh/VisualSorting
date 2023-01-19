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
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
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
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

