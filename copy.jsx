import React from 'react';
import { useRef } from 'react';
import { getMergeSortAnimations, getQuickSortAnimations, getBubblesortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the color of pivot in quick sort.s
const PIVOT_COLOR = 'blue';

export default class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
      value: '5',
    };
    // this.handleSize = this.handleSize.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSize(event) {
    this.setState({value: event.target.value});
    
  }

  handleSubmit(event) {
    console.log("after", this.state.value);
    alert('The number of array-bars were changed into: ' + this.state.value);
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      // height is from 5 to 200
      array.push(randomIntFromInterval(5, 200));
    }
    console.log(array);
    this.setState({ array });
   // event.preventDefault();
  }

  componentDidMount() {
    this.resetArray();
  }


  resetArray() {
    const array = [];
    console.log("reset", this.state.value);
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      // height is from 5 to 200
      array.push(randomIntFromInterval(5, 200));
    }
    console.log(array);
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      if (animations[i].length === 3) {
        // it is trying to set current swappers
        const [barOneIdx, barTwoIdx, condition] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        // trying to change color
        let color = (condition === true) ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].length === 4) {
        // it is trying to do the swap and change the height of the bars
        setTimeout(() => {
          const [barOneIdx, heightOne, barTwoIdx, heightTwo] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${heightOne}px`;
          barTwoStyle.height = `${heightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].length === 2) {
        // it is setting pivot/ setting finished bar
        const [barIdx, condition] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        let color = (condition === true) ? PIVOT_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    const animations = getBubblesortAnimations(this.state.array);
    // console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const barrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [bbarOneIdx, bbarTwoIdx] = animations[i];
        // console.log(bbarOneIdx);
        // console.log(bbarTwoIdx);
        //console.log('s', barrayBars[bbarTwoIdx]);
        const bbarOneStyle = barrayBars[bbarOneIdx].style;
        const bbarTwoStyle = barrayBars[bbarTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          bbarOneStyle.backgroundColor = color;
          bbarTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        if (animations[i].length > 0) {
          setTimeout(() => {
            const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animations[i];
            const barOneStyle = barrayBars[barOneIdx].style;
            const barTwoStyle = barrayBars[barTwoIdx].style;
            barOneStyle.height = `${newHeightOne}px`;
            barTwoStyle.height = `${newHeightTwo}px`;
          }, i * ANIMATION_SPEED_MS);
        }

      }
    }

  }


  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  //   }
  // }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>
        <div className="button-container">
          <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
          <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button className="button" onClick={() => window.location.reload()}>Stop</button>
        </div>
        <div className="size-change">
        <form onSubmit={this.handleSubmit}>
          <label>
          Change the size of the array you want to sort..
            <input type="text" id="size" name="size" value={this.state.size} />
            
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>


      </>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
