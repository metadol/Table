'use client'
import React, { useEffect, useState } from 'react';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import {IoCloseSharp} from 'react-icons/io5'


const page = () => {



const [Modal, setModal] = useState(false);
const [Mode, SetMode] = useState('');
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

const idelete = (i)=>{
  console.log(i)
  setData(Data.filter((x,k)=>k!==i))
}

const iedit =(index,x)=>{
  SetMode('e') //to make modal dynamic
  SetInn(index) //to find the index to be edited
  setModal(!Modal) //open the modal
  setEdit({ uname: x.name, uage: x.age, })//deafult values of index into the modal

}

const handleSubmit= () => {
 

  if (Mode==='e' ? (Edit.uname==''||Edit.uage==''): (Add.uname==''||Add.uage=='')) {
    SetEr('Fields cannot be empty');
  } 
  else if (Mode==='e' ? isNaN(Edit.uage):isNaN(Add.uage)  ) {
    SetEr('Age must be a number');
  } 
  else 
  {
    if(Mode==='e')
    {
       console.log('editing')
       if (Inn !== -1) {
        const updatedData = [...Data];
        updatedData[Inn] = {name: Edit.uname, age: Edit.uage,};
        setData(updatedData);
        setEdit({uname: '',uage: '',});
        SetEr(''); 
        
        }
    }
    else
    {
      const newRow = { name: Add.uname, age: Add.uage, };
       setData([...Data, newRow]);
       SetEr(''); 
       setAdd({ uname: '', uage: '',});
      
    }
    setModal(!Modal); //In JavaScript, the order of execution is from top to bottom.
  }
};


  return (
    <div>

      <div className='h-screen  flex flex-col items-center gap-4 justify-center '>

       <button className='px-3 py-1 rounded bg-gray-400 text-xs text-white ' onClick={()=>{setModal(!Modal);SetMode('')}}>ADD</button>

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
          <span className='text-xs font-black text-blue-500'>{Mode==='e'?'EDIT':'ADD'}</span>
          <IoCloseSharp size={22} className='text-blue-500  cursor-pointer' onClick={()=>setModal(!Modal)}/>
        </div>

        <div className='flex flex-col items-start gap-1'>
          <span className='text-xs font-medium text-gray-500'>Name</span>
          <input className='border border-gray-500 rounded outline-none p-2' value={Mode==='e'?Edit.uname:Add.uname}  onChange={Mode==='e'? echange : achange} name='uname'></input>
        </div>
      </div>

      <input className='border border-gray-500 rounded outline-none p-2' value={Mode==='e'?Edit.uage:Add.uage}  onChange={Mode==='e'? echange : achange} name='uage'></input>

      {Er && <span className='flex flex-grow justify-center font-normal text-red-500 text-sm '>{Er}</span>}

      <button className='flex flex-grow rounded bg-blue-600 justify-center font-normal text-white text-sm p-2' onClick={handleSubmit}>Save</button>

    </div>
  </div>}

   </div>
  );
}

export default page;
