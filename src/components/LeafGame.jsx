import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import butterfly1 from '../../public/butterflies/butterfly1.svg';
import butterfly2 from '../../public/butterflies/butterfly2.svg';
import butterfly3 from '../../public/butterflies/butterfly3.svg';
import butterfly4 from '../../public/butterflies/butterfly4.svg';
import butterfly5 from '../../public/butterflies/butterfly5.svg';

const GameContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 500px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #8FBC8F 60%, #8FBC8F 100%);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
`

const GameArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 80%;
  margin: 100px auto 0;
  position: relative;
  z-index: 10;
`

const GrassField = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background-color: #8FBC8F;
  z-index: 1;
`

const GrassDetail = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: ${props => props.left}%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.darker ? '#3E8E41' : '#4CAF50'};
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  z-index: 2;
`

const Sun = styled(motion.div)`
  position: absolute;
  top: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
  background-color: #FFC107;
  border-radius: 50%;
  box-shadow: 0 0 40px #FFC107;
  z-index: 0;
`

const Cloud = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}%;
  width: ${props => props.size}px;
  height: ${props => props.size / 2}px;
  background-color: white;
  border-radius: 50px;
  z-index: 0;
  opacity: 0.9;
  box-shadow: ${props => props.size / 10}px ${props => props.size / 15}px ${props => props.size / 6}px rgba(0, 0, 0, 0.1);
  
  &::before, &::after {
    content: "";
    position: absolute;
    background-color: white;
    border-radius: 50%;
  }
  
  &::before {
    width: ${props => props.size * 0.6}px;
    height: ${props => props.size * 0.6}px;
    top: -${props => props.size * 0.2}px;
    left: ${props => props.size * 0.1}px;
  }
  
  &::after {
    width: ${props => props.size * 0.5}px;
    height: ${props => props.size * 0.5}px;
    top: -${props => props.size * 0.1}px;
    right: ${props => props.size * 0.1}px;
  }
`

const Leaf = styled(motion.div)`
  position: relative;
  height: 120px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  border-radius: 50% 20px;
  transform: rotate(45deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.4), transparent);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.3);
    transform: rotate(-45deg);
  }

  ${props => props.revealed && `
    transform: rotate(45deg) translateY(-50px);
    opacity: 0.6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `}
`

const LeafStem = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 30px;
  background-color: #3E8E41;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
`

const UsernameText = styled.span`
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  color: #004d40;
  transform: rotate(-45deg);
  text-align: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  opacity: ${props => props.revealed ? 1 : 0};
  transition: opacity 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 6;
`

const Message = styled(motion.div)`
  font-size: 20px;
  font-weight: 600;
  padding: 12px 20px;
  margin: 20px auto;
  text-align: center;
  color: white;
  background-color: ${props => props.success ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  z-index: 20;
`

const Button = styled(motion.button)`
  padding: 12px 28px;
  background-color: #FF5722;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  width: 200px;
  z-index: 20;
  
  &:hover {
    background-color: #E64A19;
  }
`

const Instructions = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
`

// Butterfly SVGs for beautiful butterflies
const butterflySvgs = [butterfly1, butterfly2, butterfly3, butterfly4, butterfly5];

// Create grass blades with different heights and positions
const grassBlades = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  width: Math.random() * 5 + 5,
  height: Math.random() * 30 + 10,
  darker: Math.random() > 0.5
}));

// Replace butterflies array with SVGs and randomize
const butterflies = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  left: 15 + Math.random() * 70,
  top: 15 + Math.random() * 60,
  image: butterflySvgs[Math.floor(Math.random() * butterflySvgs.length)],
  delay: 1.5 + Math.random() * 1.5
}));

const LeafGame = ({ username, isInWhitelist, onRestart }) => {
  const [leaves, setLeaves] = useState([])
  const [foundUsername, setFoundUsername] = useState(false)
  const [gameMessage, setGameMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  
  // Set up the game by creating 9 leaves
  useEffect(() => {
    // Create 9 leaves (3x3 grid)
    const newLeaves = Array(9).fill().map((_, index) => ({
      id: index,
      revealed: false
    }))
    
    // If username is in whitelist, randomly place it under one leaf
    if (isInWhitelist) {
      const randomIndex = Math.floor(Math.random() * 9)
      newLeaves[randomIndex].hasUsername = true
    }
    
    setLeaves(newLeaves)
    setGameMessage('Lift the leaves to find your username!')
  }, [username, isInWhitelist])
  
  const handleLeafClick = (leafId) => {
    // Update leaves state to reveal the clicked leaf
    setLeaves(prevLeaves => 
      prevLeaves.map(leaf => 
        leaf.id === leafId 
          ? { ...leaf, revealed: true } 
          : leaf
      )
    )
    
    // Check if the leaf has the username
    const clickedLeaf = leaves.find(leaf => leaf.id === leafId)
    setAttempts(prev => prev + 1)
    
    if (clickedLeaf && clickedLeaf.hasUsername) {
      setFoundUsername(true)
      setGameMessage('Congratulations! You found your username! 🎉')
    } else if (attempts >= 2) {
      // After 3 attempts, reveal all leaves
      setLeaves(prevLeaves => 
        prevLeaves.map(leaf => ({ ...leaf, revealed: true }))
      )
      
      if (isInWhitelist) {
        setGameMessage('Game over! Your username was hiding under one of the leaves.')
      } else {
        setGameMessage('Game over! Your username was not in our garden.')
      }
    }
  }
  
  return (
    <GameContainer>
      {/* Sky and sun */}
      <Sun
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Clouds */}
      <Cloud 
        size={80} 
        top={50} 
        left={20}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 2 }}
      />
      <Cloud 
        size={60} 
        top={80} 
        left={70}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      {/* Grass field */}
      <GrassField />
      {grassBlades.map((blade) => (
        <GrassDetail 
          key={blade.id}
          left={blade.left}
          width={blade.width}
          height={blade.height}
          darker={blade.darker}
          initial={{ height: 0 }}
          animate={{ height: blade.height }}
          transition={{ 
            duration: 0.5, 
            delay: Math.random() * 0.5,
            ease: "easeOut" 
          }}
        />
      ))}
      
      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <motion.img
          key={butterfly.id}
          src={butterfly.image}
          alt="Butterfly"
          style={{
            position: 'absolute',
            width: 48,
            height: 48,
            top: `${butterfly.top}%`,
            left: `${butterfly.left}%`,
            zIndex: 15,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 8px rgba(255,105,180,0.18))',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: [0, -20, 0, -10, 0],
            x: [0, 20, 10, -10, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            opacity: { duration: 0.5, delay: butterfly.delay },
            y: { duration: 5, repeat: Infinity, repeatType: 'reverse' },
            x: { duration: 6, repeat: Infinity, repeatType: 'reverse' },
            rotate: { duration: 3, repeat: Infinity, repeatType: 'reverse' }
          }}
        />
      ))}

      <Instructions>
        {isInWhitelist 
          ? 'Your username is hiding under one of these leaves! Can you find it?' 
          : 'Try to find your username under the leaves.'}
      </Instructions>
      
      <GameArea>
        {leaves.map(leaf => (
          <motion.div
            key={leaf.id}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1 * leaf.id,
              type: "spring"
            }}
            style={{ position: 'relative' }}
          >
            <Leaf 
              onClick={() => !leaf.revealed && handleLeafClick(leaf.id)}
              revealed={leaf.revealed}
              whileHover={{ scale: leaf.revealed ? 1 : 1.1 }}
              whileTap={{ scale: leaf.revealed ? 1 : 0.95 }}
            >
              <UsernameText revealed={leaf.revealed && leaf.hasUsername}>
                @{username}
              </UsernameText>
            </Leaf>
            <LeafStem 
              initial={{ height: 0 }}
              animate={{ height: 30 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * leaf.id + 0.4 
              }}
            />
          </motion.div>
        ))}
      </GameArea>
      
      {gameMessage && (
        <Message 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          success={foundUsername}
        >
          {gameMessage}
        </Message>
      )}
      
      <Button 
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Again
      </Button>
    </GameContainer>
  )
}

export default LeafGame
