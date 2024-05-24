import React, { useState, useCallback,useEffect, useRef} from 'react';
import './App.css'
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  //this is used to pass refernce
  //aise krne ke liye just pass the reference to the input wla tag of the password
  const passwordRef=useRef(null)


  //use call back is used for optimizing the function, cache m store krta h
  //dependecies m jab bhi change ayega toh passwordGenerator call hoga
  //run krwana is done by useEffect
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*(){}[]~`";
    }

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard =useCallback(() => {
    //since hum react m bana rhe window can be used (nextjs m ni kr skte)
    //select is used to select reference wla thing when copytoclipboard function is called
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password]);

  //this will allow ki load hote hi ek password generate hoga,
  //it means that dependencies m jo bhi pass kiya h uske change hote hi pura re-render hoga
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='w-full'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-50'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-4 bg-white'
            placeholder='password'
            readOnly
            //pass the reference here ki password wli jo input value h vhi reference h
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className='bg-blue-500 text-white px-4 py-2'
          >
            Copy
          </button>
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Password Length
          </label>
          <input
            type="range"
            min="8"
            max="100"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className='w-full'
          />
          <span className='text-sm'>{length}</span>
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className='mr-2'
            />
            Include Numbers
          </label>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className='mr-2'
            />
            Include Special Characters
          </label>
        </div>
        <button
          onClick={passwordGenerator}
          className='w-full bg-green-500 text-white py-2 rounded'
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
