'use client'

import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const TodoApp = () => {
  const [todoArr, setTodoArr] = useState<string[]>([])
  const [inpValue, setInpValue] = useState<string>()
  const [isError, setIsError] = useState<boolean>(false)

  const errorVariants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  }

  const inputRef = useRef<any>()

  const handleAdd = () => {
    const value = inputRef.current.value
    if (value.includes(' ')) {
      setIsError(true)
    } else {
      setIsError(false)
    }
    if (value === '' || value.includes(' ')) return
    setTodoArr((prevArr) => [...prevArr, value])
    setInpValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpValue(e.target.value)
  }

  const handleRemove = (indexToRemove: number) => {
    const newTodo = todoArr.filter((item, index) => index !== indexToRemove)
    setTodoArr(newTodo)
  }

  useEffect(() => {
    const handleEnter = (e: any) => {
      if (e.key === 'Enter') {
        handleAdd()
      }
    }

    window.addEventListener('keypress', handleEnter)
  }, [])

  return (
    <div className='bg-white p-[30px] min-h-[160px] flex flex-col gap-3 w-[400px] rounded-xl'>
      {isError && (
        <motion.p
          variants={errorVariants}
          initial='initial'
          animate='animate'
          className='text-red-500'
        >
          u cant use spacebars!
        </motion.p>
      )}
      <h1 className='text-[20px] text-blue-900 font-extrabold'>
        To-Do List 🧾
      </h1>
      <div className='flex gap-1 items-center relative'>
        <input
          value={inpValue}
          onChange={handleChange}
          ref={inputRef}
          type='text'
          placeholder='Add your task'
          className='font-medium py-3 px-4 rounded-full text-blue-950 bg-gray-300 text-sm flex-1 outline-none'
        />
        <button
          className='py-3 px-4 rounded-full text-white bg-orange-500 w-[100px] absolute right-[-1.5px]'
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <div>
        {todoArr.map((todo, idx) => (
          <div className='flex justify-between w-full p-2 list-none rounded-full border border-black text-center mb-2 items-center'>
            <li key={idx}>{todo}</li>
            <button
              className='text-red-500 text-2xl'
              onClick={() => handleRemove(idx)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoApp
