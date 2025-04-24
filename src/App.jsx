import { useState } from 'react'
import styled from 'styled-components'
import { whitelist } from './data/whitelist'
import UsernameInput from './components/UsernameInput'
import GardenGame from './components/GardenGame'
import './App.css'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  background-color: #f8f9fa;
  overflow: hidden;
  box-sizing: border-box;
`

const HeaderWrapper = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
  background: none;
`;

const Title = styled.h1`
  margin: 32px 0 0 0;
  padding: 0;
  border-radius: 0;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3.2rem;
  letter-spacing: 2px;
  text-align: center;
  background: none;
  color: #ff69b4;
  text-shadow: 0 2px 16px rgba(255, 105, 180, 0.10), 0 1px 2px rgba(0,0,0,0.08);
  border: none;
  opacity: 1;
  pointer-events: auto;
  /* Add a subtle flower emoji for integration */
  display: flex;
  align-items: center;
  gap: 18px;
`;

const LandingBackground = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at 70% 20%, #ffe3f6 0%, #f8f9fa 60%, #e0f7fa 100%);
  overflow: hidden;
`;

const FloatingFlower = styled.span`
  position: absolute;
  font-size: ${props => props.size || 2.5}rem;
  opacity: 0.7;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  filter: blur(${props => props.blur || 0}px);
  animation: floatFlower 8s ease-in-out infinite alternate;
  pointer-events: none;

  @keyframes floatFlower {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-18px) scale(1.08); }
  }
`;

function App() {
  const [username, setUsername] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isInWhitelist, setIsInWhitelist] = useState(false)

  const handleUsernameSubmit = (submittedUsername) => {
    setUsername(submittedUsername)
    const isWhitelisted = whitelist.includes(submittedUsername)
    setIsInWhitelist(isWhitelisted)
    setIsSubmitted(true)
  }

  const resetGame = () => {
    setUsername('')
    setIsSubmitted(false)
    setIsInWhitelist(false)
  }

  return (
    <AppContainer>
      {!isSubmitted && (
        <>
          <LandingBackground>
            <FloatingFlower left={12} top={18} size={3.2} blur={1}>🌸</FloatingFlower>
            <FloatingFlower left={80} top={12} size={2.7} blur={2}>🌼</FloatingFlower>
            <FloatingFlower left={60} top={70} size={2.9} blur={1}>🌷</FloatingFlower>
            <FloatingFlower left={30} top={60} size={2.5} blur={0.5}>🌻</FloatingFlower>
            <FloatingFlower left={75} top={45} size={2.2} blur={1}>🌺</FloatingFlower>
          </LandingBackground>
          <HeaderWrapper>
            <Title>
              <span role="img" aria-label="flower">🌸</span>
              Saheli's flower garden
              <span role="img" aria-label="flower">🌸</span>
            </Title>
          </HeaderWrapper>
        </>
      )}
      {isSubmitted && (
        <HeaderWrapper>
          <Title>
            <span role="img" aria-label="flower">🌸</span>
            Saheli's flower garden
            <span role="img" aria-label="flower">🌸</span>
          </Title>
        </HeaderWrapper>
      )}
      {!isSubmitted && (
        <UsernameInput onSubmit={handleUsernameSubmit} />
      )}
      {isSubmitted && (
        <GardenGame 
          username={username} 
          isInWhitelist={isInWhitelist}
          onRestart={resetGame}
        />
      )}
    </AppContainer>
  )
}

export default App;
