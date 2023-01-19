import {React, useEffect, useState} from 'react';
import { getMergeSortAnimations, getQuickSortAnimations, getBubblesortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 200;

// Change this value for the number of bars (value) in the array.
// const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the color of pivot in quick sort.
const PIVOT_COLOR = 'blue';


export default function SortingVisualizer() {

  // for input value
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setNUMBER_OF_ARRAY_BARS(message);
  };

  // Change this value for the number of bars (value) in the array.
  const [NUMBER_OF_ARRAY_BARS, setNUMBER_OF_ARRAY_BARS] = useState(10);

  const [array, setArray] = useState([]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 730));
    }
    console.log("before", newArray);
    setArray(newArray);
    console.log("after",array);
  }

  useEffect(() => {
    resetArray();
  },[NUMBER_OF_ARRAY_BARS])

  // setTimeout(() => {
  //   console.log("final",array);
  // }, 20);

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
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

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
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

  // heapSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  const bubbleSort = () => {
    const animations = getBubblesortAnimations(array);
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
      <button className="button" onClick={() => mergeSort()}>Merge Sort</button>
      <button className="button" onClick={() => quickSort()}>Quick Sort</button>
      <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
      <button className="button" onClick={() => bubbleSort()}>Bubble Sort</button>
      <button className="button" onClick={() => window.location.reload()}>Stop</button>
    </div>

    <div className="size-change">
      Change the size of the array you want to sort
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />
      <h2>UpdatedArraySize: {NUMBER_OF_ARRAY_BARS}</h2>
      <button onClick={handleClick}>Update</button>
    </div>
  </>  
  );
}



// export default class SortingVisualizer extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       array: [],
//     };
//   }

//   componentDidMount() {
//     this.resetArray();
//   }

  

//   mergeSort() {
//     const animations = getMergeSortAnimations(this.state.array);
//     for (let i = 0; i < animations.length; i++) {
//       const arrayBars = document.getElementsByClassName('array-bar');
//       const isColorChange = i % 3 !== 2;
//       if (isColorChange) {
//         const [barOneIdx, barTwoIdx] = animations[i];
//         const barOneStyle = arrayBars[barOneIdx].style;
//         const barTwoStyle = arrayBars[barTwoIdx].style;
//         const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
//         setTimeout(() => {
//           barOneStyle.backgroundColor = color;
//           barTwoStyle.backgroundColor = color;
//         }, i * ANIMATION_SPEED_MS);
//       } else {
//         setTimeout(() => {
//           const [barOneIdx, newHeight] = animations[i];
//           const barOneStyle = arrayBars[barOneIdx].style;
//           barOneStyle.height = `${newHeight}px`;
//         }, i * ANIMATION_SPEED_MS);
//       }
//     }
//   }

//   quickSort() {
//     const animations = getQuickSortAnimations(this.state.array);
//     for (let i = 0; i < animations.length; i++) {
//       const arrayBars = document.getElementsByClassName('array-bar');
//       if (animations[i].length === 3) {
//         // it is trying to set current swappers
//         const [barOneIdx, barTwoIdx, condition] = animations[i];
//         const barOneStyle = arrayBars[barOneIdx].style;
//         const barTwoStyle = arrayBars[barTwoIdx].style;
//         // trying to change color
//         let color = (condition === true) ? SECONDARY_COLOR : PRIMARY_COLOR;
//         setTimeout(() => {
//           barOneStyle.backgroundColor = color;
//           barTwoStyle.backgroundColor = color;
//         }, i * ANIMATION_SPEED_MS);
//       } else if (animations[i].length === 4) {
//         // it is trying to do the swap and change the height of the bars
//         setTimeout(() => {
//           const [barOneIdx, heightOne, barTwoIdx, heightTwo] = animations[i];
//           const barOneStyle = arrayBars[barOneIdx].style;
//           const barTwoStyle = arrayBars[barTwoIdx].style;
//           barOneStyle.height = `${heightOne}px`;
//           barTwoStyle.height = `${heightTwo}px`;
//         }, i * ANIMATION_SPEED_MS);
//       } else if (animations[i].length === 2) {
//         // it is setting pivot/ setting finished bar
//         const [barIdx, condition] = animations[i];
//         const barStyle = arrayBars[barIdx].style;
//         let color = (condition === true) ? PIVOT_COLOR : PRIMARY_COLOR;
//         setTimeout(() => {
//           barStyle.backgroundColor = color;
//         }, i * ANIMATION_SPEED_MS);
//       }
//     }
//   }

//   heapSort() {
//     // We leave it as an exercise to the viewer of this code to implement this method.
//   }

//   bubbleSort() {
//     const animations = getBubblesortAnimations(this.state.array);
//     // console.log(animations);
//     for (let i = 0; i < animations.length; i++) {
//       const barrayBars = document.getElementsByClassName('array-bar');
//       const isColorChange = i % 3 !== 2;
//       if (isColorChange) {
//         const [bbarOneIdx, bbarTwoIdx] = animations[i];
//         // console.log(bbarOneIdx);
//         // console.log(bbarTwoIdx);
//         //console.log('s', barrayBars[bbarTwoIdx]);
//         const bbarOneStyle = barrayBars[bbarOneIdx].style;
//         const bbarTwoStyle = barrayBars[bbarTwoIdx].style;
//         const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
//         setTimeout(() => {
//           bbarOneStyle.backgroundColor = color;
//           bbarTwoStyle.backgroundColor = color;
//         }, i * ANIMATION_SPEED_MS);
//       } else {
//         if (animations[i].length > 0) {
//           setTimeout(() => {
//             const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animations[i];
//             const barOneStyle = barrayBars[barOneIdx].style;
//             const barTwoStyle = barrayBars[barTwoIdx].style;
//             barOneStyle.height = `${newHeightOne}px`;
//             barTwoStyle.height = `${newHeightTwo}px`;
//           }, i * ANIMATION_SPEED_MS);
//         }

//       }
//     }

//   }

//   render() {
//     const { array } = this.state;

    
//   }
// }


