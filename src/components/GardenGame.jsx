import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import butterfly1 from '../../public/butterflies/butterfly1.svg';
import butterfly2 from '../../public/butterflies/butterfly2.svg';
import butterfly3 from '../../public/butterflies/butterfly3.svg';
import butterfly4 from '../../public/butterflies/butterfly4.svg';
import butterfly5 from '../../public/butterflies/butterfly5.svg';

const GameContainer = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 60%, #8FBC8F 60%, #8FBC8F 100%);
  border-radius: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin: 0;
  padding: 0;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  left: ${props => props.left}vw;
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

const SunRay = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 40px;
  height: 3px;
  background-color: #FFC107;
  transform: rotate(${props => props.rotation}deg);
  transform-origin: 0 50%;
`

const Cloud = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}vw;
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

const Soil = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: ${props => props.left}%;
  width: 30px;
  height: 15px;
  background-color: #5D4037;
  border-radius: 50% 50% 0 0;
  z-index: 3;
  transform: translateX(-50%);
`

const Seed = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  width: 8px;
  height: 12px;
  background-color: yellow ; 
  border-radius: 50%;
  z-index: 10;
  transform: translate(-50%, -100%);
`

const FlowerStem = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: ${props => props.left}%;
  width: ${props => props.width || 6}px;
  background-color: #4caf50;
  transform-origin: bottom center;
  transform: translateX(-50%);
  z-index: 3;
  border-radius: 3px;
`

const Leaf = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 10px;
  background-color: #4caf50;
  border-radius: ${props => props.isLeft ? '10px 0 0 10px' : '0 10px 10px 0'};
  transform: ${props => props.isLeft ? 'rotate(-20deg)' : 'rotate(20deg)'};
  z-index: 3;
  transform-origin: ${props => props.isLeft ? 'right center' : 'left center'};
  right: ${props => props.isLeft ? '0' : 'auto'};
  left: ${props => props.isLeft ? 'auto' : '0'};
  bottom: ${props => props.bottom}px;
`

const Flower = styled(motion.div)`
  position: absolute;
  bottom: ${props => props.height}px;
  left: ${props => props.left}%;
  transform: translateX(-50%);
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: all;
`

const Petal = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || 20}px;
  height: ${props => props.size || 20}px;
  background-color: ${props => props.color};
  border-radius: 50% 50% 0 50%;
  transform-origin: bottom right;
  transform: rotate(${props => props.rotation}deg) translateX(5px);
  z-index: 5;
  cursor: ${props => props.pluckable ? 'pointer' : 'default'};
  pointer-events: all;
  
  &:hover {
    filter: ${props => props.pluckable ? 'brightness(1.1)' : 'none'};
    box-shadow: ${props => props.pluckable ? '0 0 5px rgba(255, 255, 255, 0.5)' : 'none'};
  }
`

const FlowerCenter = styled(motion.div)`
  width: ${props => props.size || 15}px;
  height: ${props => props.size || 15}px;
  background-color: ${props => props.color || '#fdd835'};
  border-radius: 50%;
  z-index: 10;
`

const Butterfly = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  top: ${props => props.top}vh;
  left: ${props => props.left}vw;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButterflyWing = styled(motion.div)`
  position: absolute;
  width: 22px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 70% 70% 30% 70%;
  opacity: 0.85;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  
  &:first-child {
    left: -15px;
    transform: scaleX(-1) rotate(30deg);
  }
  
  &:last-child {
    right: -15px;
    transform: rotate(30deg);
  }
`

const ButterflyBody = styled.div`
  width: 4px;
  height: 25px;
  background: linear-gradient(to bottom, #333 0%, ${props => props.color} 50%, #333 100%);
  border-radius: 10px;
  z-index: 12;
`

const UsernameReveal = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #004d40;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 50;
`

const Message = styled(motion.div)`
  font-size: 20px;
  font-weight: 600;
  padding: 12px 20px;
  margin: 20px auto;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
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
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
`

// Create grass blades with different heights and positions
const grassBlades = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  width: Math.random() * 5 + 5,
  height: Math.random() * 30 + 10,
  darker: Math.random() > 0.5
}));

const butterflies = [
  { id: 1, left: 25, top: 30, image: butterfly1, delay: 1.8 },
  { id: 2, left: 75, top: 50, image: butterfly2, delay: 2.2 },
  { id: 3, left: 55, top: 15, image: butterfly3, delay: 2.6 },
  { id: 4, left: 15, top: 45, image: butterfly4, delay: 3.0 },
  { id: 5, left: 85, top: 25, image: butterfly5, delay: 2.4 }
];

// Create many more flowers with varied properties and ensure minimum distance
const createFlowers = (count) => {
  const flowerColors = [
    '#e91e63', '#9c27b0', '#3f51b5', '#2196F3', '#03A9F4', 
    '#00BCD4', '#009688', '#f44336', '#FF5722', '#FF9800', 
    '#FFEB3B', '#CDDC39', '#8BC34A', '#673AB7', '#4CAF50'
  ];
  
  const centerColors = ['#fdd835', '#ffeb3b', '#ffc107', '#ff9800'];
  
  // Position flowers with minimum distance in both x and y
  const positions = [];
  const MIN_DISTANCE = 15; // Minimum distance between flowers in vw/vh units
  
  // Helper function to check if a new position is far enough from existing ones
  const isFarEnough = (newX, newY) => {
    for (const pos of positions) {
      const dx = (newX - pos.x) * 1.2; // horizontal stretch for aspect ratio
      const dy = (newY - pos.y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < MIN_DISTANCE) {
        return false;
      }
    }
    return true;
  };
  
  // Generate positions with minimum distance
  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let x, y;
    let found = false;
    while (!found && attempts < 100) {
      x = Math.random() * 90 + 5; // 5-95vw from left
      y = Math.random() * 30 + 10; // 10-40vh from bottom (within grass area)
      if (isFarEnough(x, y)) {
        found = true;
        positions.push({ x, y });
      }
      attempts++;
    }
    if (!found) {
      // fallback: just push, may overlap
      positions.push({ x: Math.random() * 90 + 5, y: Math.random() * 30 + 10 });
    }
  }
  
  return positions.map((pos, i) => ({
    id: i,
    left: pos.x, // x position (5-95vw from left)
    bottom: pos.y, // y position (10-40vh from bottom)
    petalColor: flowerColors[Math.floor(Math.random() * flowerColors.length)],
    centerColor: centerColors[Math.floor(Math.random() * centerColors.length)],
    stemHeight: Math.floor(Math.random() * 50) + 80, // 80-130px stem
    delay: Math.random() * 1.5, // 0-1.5s delay
    size: Math.floor(Math.random() * 20) + 35, // 35-55px size
    plucked: false,
    petalAngles: [0, 72, 144, 216, 288].map(angle => ({
      angle,
      plucked: false
    }))
  }));
};

const GardenGame = ({ username, isInWhitelist, onRestart }) => {
  const [flowers, setFlowers] = useState([]);
  const [gameStage, setGameStage] = useState('growing'); // growing, plucking, completed
  const [pluckedPetals, setPluckedPetals] = useState(0);
  const [totalPetals, setTotalPetals] = useState(0);
  const [foundUsername, setFoundUsername] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [gameMessage, setGameMessage] = useState('');
  const [usernameFlower, setUsernameFlower] = useState(null);
  const [usernameVisible, setUsernameVisible] = useState(false);
  
  // Initialize the garden with flowers
  useEffect(() => {
    const newFlowers = createFlowers(15); // Create 15 flowers
    setFlowers(newFlowers);

    // Calculate total petals
    const total = newFlowers.length * 5; // 5 petals per flower
    setTotalPetals(total);

    // If in whitelist, randomly select a flower to hide username
    if (isInWhitelist) {
      const randomFlowerIndex = Math.floor(Math.random() * newFlowers.length);
      setUsernameFlower(randomFlowerIndex);
      setGameMessage('Watch your garden grow...');
    } else {
      setGameMessage(`That shii isn't in my garden but you can still enjoy the flowers!`);
    }

    // After all flowers have grown
    const maxDelay = Math.max(...newFlowers.map(f => f.delay)) + 3; // Max delay plus animation time
    setTimeout(() => {
      setAnimationComplete(true);
      setGameStage('plucking');
      if (isInWhitelist) {
        setGameMessage('Pluck the flower petals to find your username!');
      } else {
        setGameMessage(`That shii isn't in my garden but you can still enjoy the flowers!`);
      }
    }, maxDelay * 1000);
  }, [isInWhitelist, username]);
  
  // Handle petal plucking
  const handlePluckPetal = (flowerId, petalIndex) => {
    if (gameStage !== 'plucking') return;
    
    setFlowers(prevFlowers => 
      prevFlowers.map(flower => 
        flower.id === flowerId 
          ? {
              ...flower,
              petalAngles: flower.petalAngles.map((petal, idx) => 
                idx === petalIndex 
                  ? { ...petal, plucked: true } 
                  : petal
              )
            }
          : flower
      )
    );
    
    setPluckedPetals(prev => prev + 1);
    
    // Check if this is the username petal
    if (isInWhitelist && flowerId === usernameFlower && petalIndex === 2) { // Center petal (index 2) has the username
      setFoundUsername(true);
      setUsernameVisible(true);
      setGameMessage('Congratulations! You found your username! 🎉');
      setTimeout(() => {
        setGameStage('completed');
      }, 2000);
    } else if (pluckedPetals > totalPetals * 0.7) { // After 70% of petals plucked
      if (isInWhitelist && !foundUsername) {
        setGameMessage("Keep looking! Your username is hidden under a petal.");
      } else if (!isInWhitelist) {
        setGameMessage("Your username isn't in our garden, but you can keep plucking petals!");
      }
    }
  };  return (
    <GameContainer className="garden-container">
      {/* Sky and sun */}
      <Sun
        className="garden-sun"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <SunRay 
            key={index}
            className={`garden-sun-ray garden-sun-ray-${index}`}
            rotation={rotation}
            top={40}
            left={40}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        ))}
      </Sun>
      
      {/* Clouds */}
      <Cloud 
        className="garden-cloud garden-cloud-1"
        size={80} 
        top={50} 
        left={20}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 2 }}
      />
      <Cloud 
        className="garden-cloud garden-cloud-2"
        size={60} 
        top={80} 
        left={70}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      {/* Grass field */}
      <GrassField className="garden-grass-field" />
      {grassBlades.map((blade) => (
        <GrassDetail 
          key={blade.id}
          className={`garden-grass-blade garden-grass-blade-${blade.id}`}
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
      ))}      {/* Flowers with growing animation - distributed across grassland */}
      {flowers.map((flower) => (
          <div 
          key={flower.id} 
          className={`garden-flower-container garden-flower-container-${flower.id}`} 
          style={{ 
            position: 'absolute', 
            left: `${flower.left}vw`, 
            bottom: `${flower.bottom}%`, 
            width: '50px',
            zIndex: `${5 + flower.bottom}` // Higher flowers appear in front
          }}
        >
          {/* Soil mound */}
          <Soil 
            className={`garden-soil garden-soil-${flower.id}`}
            left={50}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: flower.delay * 0.5,
              ease: "easeOut" 
            }}
          />
          {/* Stem */}
          <FlowerStem
            className={`garden-flower-stem garden-flower-stem-${flower.id}`}
            left={50}
            width={flower.size / 8}
            initial={{ height: 0 }}
            animate={{ height: flower.stemHeight }}
            transition={{ 
              duration: 1.5, 
              delay: flower.delay,
              ease: "easeOut" 
            }}
          >
            {/* Leaves - use fixed positions so they don't move on re-render */}
            <Leaf 
              className={`garden-flower-leaf garden-flower-leaf-left-${flower.id}`}
              bottom={40} // Fixed position
              isLeft={true}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: flower.delay + 0.8,
                ease: "easeOut" 
              }}
            />
            <Leaf 
              className={`garden-flower-leaf garden-flower-leaf-right-${flower.id}`}
              bottom={60} // Fixed position
              isLeft={false}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: flower.delay + 1.0,
                ease: "easeOut" 
              }}
            />
          </FlowerStem>
          {/* Flower with petals and seed at the top of the stem */}
          <Flower 
            height={flower.stemHeight} 
            size={flower.size} 
            left={50} 
            style={{ bottom: `${flower.stemHeight}px` }}
            className={`garden-flower garden-flower-${flower.id}`}
          >
            {flower.petalAngles.map((petal, index) => (
              <Petal
                key={index}
                className={`garden-flower-petal garden-flower-petal-${flower.id}-${index}`}
                rotation={petal.angle}
                color={flower.petalColor}
                size={flower.size / 2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: petal.plucked ? 0 : 1, 
                  opacity: petal.plucked ? 0 : 1,
                  y: petal.plucked ? -50 : 10,
                  x: -10,
                  rotate: petal.plucked ? `${petal.angle + 45}deg` : `${petal.angle}deg`
                }}
                transition={{ 
                  scale: { duration: 0.8, delay: flower.delay + 1.5, ease: "easeOut" },
                  opacity: { duration: 0.2, delay: flower.delay, ease: "easeOut" },
                  y: { duration: 0.5, ease: "easeOut" },
                  rotate: { duration: 0.5, ease: "easeOut" }
                }}
                onClick={() => animationComplete && !petal.plucked && handlePluckPetal(flower.id, index)}
                pluckable={animationComplete && !petal.plucked}
                whileHover={animationComplete && !petal.plucked ? { scale: 1.1 } : {}}
                whileTap={animationComplete && !petal.plucked ? { scale: 0.9 } : {}}
              />
            ))}
            {/* Seed at the center of the petals, at the top of the stem */}
            <Seed
              className={`garden-seed garden-seed-${flower.id}`}
              style={{ position: 'absolute', top: '80%', left: '45%', transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: flower.delay + 2,
                ease: "easeOut" 
              }}
            />
          </Flower>
        </div>
      ))}
        {/* Improved Butterflies: use SVGs for better appearance */}
      {butterflies.map((butterfly) => (
        <motion.img
          key={butterfly.id}
          src={butterfly.image}
          alt="Butterfly"
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            top: `${butterfly.top}vh`,
            left: `${butterfly.left}vw`,
            zIndex: 10,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
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
            y: { duration: 5, repeat: Infinity, repeatType: "reverse" },
            x: { duration: 6, repeat: Infinity, repeatType: "reverse" },
            rotate: { duration: 3, repeat: Infinity, repeatType: "reverse" }
          }}
        />
      ))}
      
      {/* Instructions */}
      {gameStage !== 'completed' && (
        <Instructions className="garden-instructions">
          {gameMessage}
        </Instructions>
      )}
      
      {/* Username reveal when found */}
      <AnimatePresence>
        {usernameVisible && (
          <UsernameReveal
            className="garden-username-reveal"
            initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
            animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
            exit={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{}}
          >
            @{username} found!
          </UsernameReveal>
        )}
      </AnimatePresence>
        {/* Game completion message */}
      {(gameStage === 'completed' || pluckedPetals > totalPetals * 0.9) && (
        <Message 
          className="garden-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          success={foundUsername}
        >
          {foundUsername 
            ? `You found @${username} hidden in the garden!` 
            : (isInWhitelist 
              ? `You missed @${username}, but the garden was beautiful!` 
              : `@${username} wasn't in our garden, but you enjoyed the flowers!`)}
        </Message>
      )}
      
      {/* Play again button */}
      {(gameStage === 'completed' || pluckedPetals > totalPetals * 0.8) && (
        <Button 
          className="garden-restart-button"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Plant New Garden
        </Button>
      )}
    </GameContainer>
  );
};

export default GardenGame;
