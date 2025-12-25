  import { useState,useCallback,useEffect,useRef } from 'react'
  import './index.css'
  import './App.css'

  function App() {
    const [length, setlength] = useState(8)
    const [numb,setnumb] = useState(false)
    const [char,setchar] = useState(false)
    const [password,setpassword] = useState("")
    const [bgColor, setBgColor] = useState("bg-slate-800");
    const passwordref = useRef(null)
    const generator = useCallback(()=>{
      let pass = ""
      let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJLKZXCVBNM"
      if(numb) str+="1234567890"
      if (char) str+="~!@#$%^&*(){}[]>.,</"
      for( let i = 1 ; i <= length ; i++){
        let char = Math.floor(Math.random() * str.length + 1)  
        pass += str.charAt(char)
      }
      setpassword(pass)
    } , [numb,char,length , setpassword])

    const copyPasswordToClipboard = useCallback(()=>{
      passwordref.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])

    const handleColor = (color) => {
      setBgColor(color);
    };
  
    useEffect(()=>{
      generator()},
      [length,numb,char]
    )
    return (
      <>
      <div className='bg-slate-800 px-4 py-3 my-12 mx-10 rounded-xl'>
        <h1 className='text-center text-3xl mt-1 '>Password Generator</h1>
        <div className='flex mb-6 mt-4 mx-36 rounded-md overflow-hidden'>
          <input 
            type = "text"
            value = {password}
            placeholder='password'
            className='outline-none w-full py-1 px-2'
            readOnly
            ref = {passwordref}
        />
        <button
         onClick={() => {
          copyPasswordToClipboard();
          handleColor("bg-blue-800");
        }} 
        className='bg-blue-700 rounded-sm px-3 py-2' >Copy</button>
        </div>
          <div className='text-white text-xl flex justify-between items-center mx-3'>
            <div >
          <input 
            type = "range"
            min = {6}
            max = {100}
            value={length}
            className='cursor-pointer mx-3 my-3'
            onChange={(e)=> {setlength(e.target.value)}}
        />
        <label>Length : {length}</label>
          </div>
          <div className='gap-x-1 text-white text-xl'>
            <input type="checkbox" 
            defaultChecked = {numb}
            id = "numberinput"
            onChange={() => {
              setnumb((prev) => !prev);
            }}
              />
              Number
          </div>
          <div className='gap-x-1 text-white text-xl'>
            <input type="checkbox" 
            defaultChecked = {char}
            id = "charinput"
            onChange={() => {
              setchar((prev) => !prev);
            }}
              />
              Character
          </div>
        </div>
        </div>
      </>
    )
  }

  export default App
