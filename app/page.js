'use client'
import React, { useEffect, useState } from 'react';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import {IoCloseSharp} from 'react-icons/io5'


const page = () => {



const [Modal, setModal] = useState(false);
const [Modal2, setModal2] = useState(false);
const [Er ,SetEr] = useState('');
const [Inn ,SetInn] = useState(-1)

const [Add, setAdd] = useState({uname:'',uage:''});
const [Edit, setEdit] = useState({uname:'',uage:''});
  
const [Data,setData] = useState ([
  {id:1, name:'christy', age:20},
  {id:2,name:'kevin',age:10 },
  {id:3,name:'jovan',age:16},
  { id:4, name:'hannah',age:5}
])

useEffect(() => {
  console.log(Data)
  console.log('err',Er)
  },[Data,Er]
)

const achange =(e)=>{
  setAdd({
    ...Add,
    [e.target.name]:e.target.value,

  })
}

const echange =(e)=>{
  setEdit({
    ...Edit,
    [e.target.name]:e.target.value,

  })
}

const Editsubmit = ()=>{
  console.log('hello')

  if (Edit.uname==''||Edit.uage=='') {
    SetEr('Fields cannot be empty');
  } 
  else if (isNaN(Edit.uage)) {
    SetEr('Age must be a number');
  } 
  else{
    if (Inn !== -1) {
      const updatedData = [...Data];
      updatedData[Inn] = {
        name: Edit.uname,
        age: Edit.uage,
      };
      setData(updatedData);
  
      setEdit({uname: '',uage: '',});
      setModal(!Modal);
    }
  }
}

const handleSubmit= (e) => {
  
  e.preventDefault();
  // Create a new row with the values from formData
 
console.log(Add)
  if (Add.uname==''||Add.uage=='') {
    console.log('emtea')
    // Display an error message for an empty name
    SetEr('Fields cannot be empty');
  } else if (isNaN(Add.uage)) {
    // Check if Add.uage is not a number
    // Display an error message for an invalid age
    SetEr('Age must be a number');
  } else {
    const newRow = {
      // id: generateUniqueId(), // You need to generate a unique ID for the new row
      name: Add.uname,
      age: Add.uage,
      // Add other fields as needed
    };
    SetEr('')
    setAdd({
      uname: '',
      uage: '',
    });
    // Add the new row to the table data
    setData([...Data, newRow]);
  // Close the modal and reset the form data
  setModal2(!Modal2);
  

}

};

const iedit =(index,x)=>{
  SetInn(index)
  setModal(!Modal)
  setEdit({ uname: x.name, uage: x.age, })

}

const idelete = (i)=>{
  console.log(i)
  setData(Data.filter((x,k)=>k!==i))
}


  return (
    <div>

      <div className='h-screen  flex flex-col items-center gap-4 justify-center '>

       <button className='px-3 py-1 rounded bg-gray-400 text-xs text-white ' onClick={()=>setModal2(!Modal2)}>ADD</button>

      <table>
        <thead className='min-w-full bg-gray-400 border border-gray-500 p-6 select-none'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-500'>ID</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-500'> NAME</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-500'>AGE</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-500'>ACTIONS</th>
        </tr>
      </thead>

      {Data.map((x,index)=>(
        
      <tbody className='min-w-full bg-white border border-gray-400 p-6' key={x.id}>
       
        <tr>
          <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-400'>{index+1}</td>
          <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-400'>{x.name}</td>
          <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-400'>{x.age}</td>
          <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-400'>
          <span className='flex flex-row justify-around'>
            <AiOutlineEdit size={18} className='cursor-pointer' onClick={()=>iedit(index,x)}/>
            <AiOutlineDelete size={18} className='cursor-pointer' onClick={()=>idelete(index)}/>
          </span>
          </td>
        </tr>
      </tbody>
      ))}
    </table>

  </div>

  {Modal&&
  <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
    <div className='   bg-white rounded-lg text-center p-6 flex flex-col gap-5'>

      <div className='flex flex-col items-start gap-2'>
        <div className='flex w-full items-end justify-between '>
          <span className='text-xs font-black text-blue-500'>EDIT</span>
          <IoCloseSharp size={22} className='text-blue-500  cursor-pointer' onClick={()=>setModal(!Modal)}/>
        </div>

        <div className='flex flex-col items-start gap-1'>
          <span className='text-xs font-medium text-gray-500'>Name</span>
          <input className='border border-gray-500 rounded outline-none p-2' value={Edit.uname}  onChange={echange} name='uname'></input>
        </div>
      </div>

      <input className='border border-gray-500 rounded outline-none p-2' value={Edit.uage}  onChange={echange} name='uage'></input>

      <button className='flex flex-grow rounded bg-blue-600 justify-center font-normal text-white text-sm p-2' onClick={()=>Editsubmit()}>Save</button>

    </div>
  </div>}

    {Modal2&&<div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='   bg-white rounded-lg text-center p-6 flex flex-col gap-5'>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        
        <div className='flex flex-col items-start gap-2'>
            <div className='flex w-full items-end justify-between '>
              <span className='text-xs font-black text-blue-500'>ADD</span>
              <IoCloseSharp size={22} className='text-blue-500  cursor-pointer' onClick={()=>setModal2(!Modal2)}/>
            </div>
            <div className='flex flex-col items-start gap-1'>
              <span className='text-xs font-medium text-gray-500'>Name</span>
              <input className='border border-gray-500 rounded outline-none p-2' name='uname' value={Add.uname} onChange={achange}></input>
            </div>
        </div>
        <input className='border border-gray-500 rounded outline-none p-2' name='uage' value={Add.uage} onChange={achange}></input>
        {Er && <span className='flex flex-grow justify-center font-normal text-red-500 text-sm '>{Er}</span>}
        <button className='flex flex-grow rounded bg-blue-600 justify-center font-normal text-white text-sm p-2' type='submit'>Save</button>
     
      </form>
      </div>
      
    </div>}

   </div>
  );
}

export default page;
