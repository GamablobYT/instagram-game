import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Input = styled.input`
  width: 100%;
  max-width: 100vw;
  padding: 22px 18px;
  border: none;
  border-radius: 12px;
  font-size: 1.35rem;
  background: #f8f9fa;
  color: #d72660;
  margin-bottom: 18px;
  box-shadow: none;
  &:focus {
    outline: none;
    background: #fff0fa;
  }
`

const Button = styled(motion.button)`
  width: 100%;
  padding: 18px;
  background: linear-gradient(90deg, #ffb6e6 0%, #ff69b4 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.2s, transform 0.2s;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 8px;
  &:hover {
    background: linear-gradient(90deg, #ff69b4 0%, #ffb6e6 100%);
    transform: translateY(-2px) scale(1.03);
  }
  &:disabled {
    background: #f3e6ef;
    color: #aaa;
    cursor: not-allowed;
  }
`

const UsernameInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSubmit(inputValue.trim())
    }
  }
  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        width: '90vw', 
        maxWidth: 600, 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'none',
        boxShadow: 'none',
        padding: 0,
      }}
    >
      <Input
        id="instagram-username"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Instagram username"
        autoComplete="off"
      />
      <Button 
        type="submit" 
        disabled={!inputValue.trim()}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        Check Username
      </Button>
    </form>
  )
}

export default UsernameInput
