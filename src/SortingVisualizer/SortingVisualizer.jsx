import React, {useEffect, useState} from 'react';
import { getMergeSortAnimations, getQuickSortAnimations, getBubblesortAnimations, getHeapSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import bubble from '../assest/bubbleSort.png';
import merge from '../assest/mergeSort.png';
import heap from '../assest/heapSort.png';
import quick from '../assest/quickSort.png';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
// const ANIMATION_SPEED_MS = 200;

// Change this value for the number of bars (value) in the array.
// const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the color of pivot in quick sort.
const PIVOT_COLOR = 'blue';

// This is the comparing bar color in heap sort.
const HEAP_COLOR = 'yellow';

// This is the finished bar color.
const FINISH_COLOR = 'purple';

// this is a flag to indicate which sorting algorithm we are using

export default function SortingVisualizer() {
  // this is a flag to indicate which sorting algorithm we are using
  const [flag, setFlag] = useState('');
  // for input value
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = () => {
    // 👇 "message" stores input field value
    setNUMBER_OF_ARRAY_BARS(message);
  };

  const [bufferSpeed, setBufferSpeed] = useState('');
  const [ANIMATION_SPEED_MS, setANIMATION_SPEED_MS] = useState('50');
  const handleBuffer = (event) => {
    setBufferSpeed(event.target.value);
  };
  const handleSpeed = () => {
    // 👇 "message" stores input field value
    setANIMATION_SPEED_MS(bufferSpeed);
  };

  // Change this value for the number of bars (value) in the array.
  const [NUMBER_OF_ARRAY_BARS, setNUMBER_OF_ARRAY_BARS] = useState(10);

  const [array, setArray] = useState([]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const resetArray = () => {
    setFlag('xinyang Shen');
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5,500));
    }
    console.log("before", newArray);
    setArray(newArray);
    console.log("after",array);
  }

  const calWidth = 1200 / NUMBER_OF_ARRAY_BARS;

  useEffect(() => {
    resetArray();
  },[NUMBER_OF_ARRAY_BARS])


  const mergeSort = () => {
    setFlag('M');
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
    setFlag('Q');
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

  const heapSort = () => {
    setFlag('H');
    const animations = getHeapSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      if (animations[i].length === 3 && typeof animations[i][2] === "boolean") {
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
      } else if (animations[i].length === 4 && typeof animations[i][3] !== "boolean") {
        // it is trying to do the swap and change the height of the bars
        setTimeout(() => {
          const [barOneIdx, heightOne, barTwoIdx, heightTwo] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${heightOne}px`;
          barTwoStyle.height = `${heightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].length === 4 && typeof animations[i][2] !== "boolean") {
        // it is trying to siftdown the node
        const [barOneIdx, barTwoIdx, barThreeIdx, condition] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barThreeStyle = arrayBars[barThreeIdx].style;
        // trying to change color
        let color = (condition === true) ? HEAP_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barThreeStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].length === 2 && typeof animations[i][1] === "boolean") {
        // it is trying to change back the unswapped bar
        const [barOneIdx, condition] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        // trying to change color
        let color = (condition === true) ? HEAP_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].length === 1) {
        const [barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = FINISH_COLOR;
        // trying to change color
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].length === 4) {
        const [barOneIdx, barTwoIdx, condition] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let color = (condition === true) ? HEAP_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const arrayBars = document.getElementsByClassName('array-bar');
    setTimeout(() => {
      for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        const barOneStyle = arrayBars[i].style;
        barOneStyle.backgroundColor = PRIMARY_COLOR;
      }
    }, (animations.length + 10) * ANIMATION_SPEED_MS);
  }

  const bubbleSort = () => {
    setFlag('B');
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

  let image;
  if (flag === 'B') {
    image = <img src={bubble} alt="bubbleSort" />
  }else if (flag === 'M') {
    image = <img src={merge} alt="mergeSort" />
  }
  else if(flag === "H") {
    image = <img src={heap} alt="heapSort" />;
  }else if(flag === "Q"){
    image = <img src={quick} alt="quickSort" />;
  }else{
    image = null;
  }

  return (
    <div>
    <div className="button-container">
      <button className="button" onClick={() => resetArray()}>Generate New Array</button>
      <button className="button" onClick={() => mergeSort()}>Merge Sort</button>
      <button className="button" onClick={() => quickSort()}>Quick Sort</button>
      <button className="button" onClick={() => heapSort()}>Heap Sort</button>
      <button className="button" onClick={() => bubbleSort()}>Bubble Sort</button>
      <button className="button" onClick={() => window.location.reload()}>Reset</button>
    </div>

    <div className="updateTool">
      <div className="size-change" 
          style={{
            margin: 50
          }}>
        <h1>Change the size of the array you want to sort (0,100)</h1>
        <input className="inputboxArraySize" 
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
          // style="width: 300px"
          style={{
            width: 100,
            height: 50
          }}
        />
        <h2>UpdatedArraySize: {NUMBER_OF_ARRAY_BARS}</h2>
        <button className="updateArrayButton" onClick={handleClick}>Update Array Size</button>
      </div>

      <div className="speed-change" 
      style={{
        margin: 50
      }}
      >
        <h1>Change the time out of your algorithm:</h1>
        <input className="inputboxArraySize" 
          type="text"
          id="speed"
          name="speed"
          onChange={handleBuffer}
          value={bufferSpeed}
          // style="width: 300px"
          style={{
            width: 100,
            height: 50
          }}
        />
        <h2>UpdatedPlaySpeed: {ANIMATION_SPEED_MS}</h2>
        <button className="updateSpeedButton" onClick={handleSpeed}>Update Speed</button>
      </div>
    </div>

    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
            width: `${calWidth}px`
          }}></div>
      ))}
      <div className="img-container">
        {image} 
      </div>
    </div>

    {/* <div className="image-container">
      {image} 
    </div> */}
  
  </div>  

  );
}

