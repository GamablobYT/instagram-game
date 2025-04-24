import { useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import butterfly1 from '../../public/butterflies/butterfly1.svg';
import butterfly2 from '../../public/butterflies/butterfly2.svg';
import butterfly3 from '../../public/butterflies/butterfly3.svg';
import butterfly4 from '../../public/butterflies/butterfly4.svg';
import butterfly5 from '../../public/butterflies/butterfly5.svg';

const AnimationContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB 0vw, #87CEEB 60vh, #8FBC8F 60vh, #8FBC8F 100vh);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`

const GrassField = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 40vh;
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
  top: 5vh;
  right: 5vw;
  width: 8vw;
  height: 8vw;
  background-color: #FFC107;
  border-radius: 50%;
  box-shadow: 0 0 4vw #FFC107;
  z-index: 0;
`

const SunRay = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4vw;
  height: 0.3vw;
  background-color: #FFC107;
  transform: rotate(${props => props.rotation}deg);
  transform-origin: 0 50%;
`

const Cloud = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}vh;
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

const FlowerStem = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: ${props => props.width || 0.6}vw;
  background-color: #4caf50;
  transform-origin: bottom center;
  transform: translateX(-50%);
  z-index: 3;
  border-radius: 0.3vw;
`

const Leaf = styled(motion.div)`
  position: absolute;
  bottom: ${props => props.bottom}%;
  left: ${props => props.isLeft ? '-1.5vw' : '1.5vw'};
  width: 2vw;
  height: 1vw;
  background-color: #4caf50;
  border-radius: ${props => props.isLeft ? '10px 0 0 10px' : '0 10px 10px 0'};
  transform: ${props => props.isLeft ? 'rotate(-20deg)' : 'rotate(20deg)'};
  z-index: 3;
`

const Flower = styled(motion.div)`
  position: absolute;
  bottom: ${props => props.bottom}vh;
  left: ${props => props.left}vw;
  transform: translateX(-50%);
  width: ${props => props.size || 4}vw;
  height: ${props => props.size || 4}vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`

const Petal = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || 2}vw;
  height: ${props => props.size || 2}vw;
  background-color: ${props => props.color};
  border-radius: 50% 50% 0 50%;
  transform-origin: bottom right;
  transform: rotate(${props => props.rotation}deg) translateX(0.5vw);
  z-index: 5;
`

const FlowerCenter = styled(motion.div)`
  width: ${props => props.size || 1.5}vw;
  height: ${props => props.size || 1.5}vw;
  background-color: ${props => props.color || '#fdd835'};
  border-radius: 50%;
  z-index: 10;
`

const LoadingText = styled(motion.p)`
  position: absolute;
  bottom: 2vh;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 2vw;
  font-weight: 500;
  text-shadow: 0.1vw 0.1vw 0.3vw rgba(0, 0, 0, 0.5);
  z-index: 20;
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

// Generate flowers procedurally with proper spacing
const generateFlowers = (count = 10) => {
  // Flower colors - petals
  const petalColors = [
    '#e91e63', '#9c27b0', '#3f51b5', '#f44336', '#ff9800', 
    '#4CAF50', '#2196F3', '#673AB7', '#00BCD4', '#FF5722'
  ];
  
  // Flower colors - centers
  const centerColors = ['#fdd835', '#ffeb3b', '#FFC107', '#FFD54F'];
  
  // Create an array to track taken positions (to avoid overlap)
  const takenPositions = [];
  const minDistance = 8; // Minimum distance between flower centers in vw units
  const flowers = [];
  
  for (let i = 0; i < count; i++) {
    // Keep trying until we find a valid position
    let attempts = 0;
    let validPosition = false;
    let left, bottom;
      while (!validPosition && attempts < 50) {
      // Generate random position
      left = 5 + Math.random() * 90; // 5-95vw to keep away from edges
      bottom = Math.random() * 35; // Flowers at different heights of the ground (0-35vh)
      
      // Check minimum distance from other flowers
      validPosition = takenPositions.every(pos => {
        const distance = Math.sqrt(Math.pow(pos.left - left, 2) + Math.pow(pos.bottom - bottom, 2));
        return distance > minDistance;
      });
      
      attempts++;
    }
    
    if (validPosition) {
      // Calculate stem height based on bottom position
      // Flowers higher from ground (higher bottom value) need shorter stems
      const stemHeight = (35 - bottom) * 4 + Math.random() * 80; // Adjust stem height based on position
      const size = 2 + Math.random() * 3; // Random size between 2-5vw      
      const flower = {
        id: i + 1,
        bottom: bottom,
        left: left,
        petalColor: petalColors[Math.floor(Math.random() * petalColors.length)],
        centerColor: centerColors[Math.floor(Math.random() * centerColors.length)],
        stemHeight: stemHeight,
        delay: Math.random() * 1.5,
        size: size,
        // Generate 5-8 petals for each flower with random angles
        petalCount: 5 + Math.floor(Math.random() * 4),
        petalAngles: Array.from({ length: 5 + Math.floor(Math.random() * 4) }, (_, index) => {
          const angle = Math.floor(360 / (5 + Math.floor(Math.random() * 4)) * index);
          return { angle, plucked: false };
        })
      };
      
      flowers.push(flower);
      takenPositions.push({ left, bottom });
    }
  }
  
  return flowers;
};

// Generate flowers within the FlowerAnimation component to ensure they're recreated
// each time the component renders

// Replace generateButterflies to use SVGs
const generateButterflies = (count = 3) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    left: 15 + Math.random() * 70,
    top: 15 + Math.random() * 45,
    image: butterflySvgs[Math.floor(Math.random() * butterflySvgs.length)],
    delay: 1.5 + Math.random() * 1.5
  }));
};

const FlowerAnimation = () => {
  // Generate flowers procedurally each time the component renders
  const flowers = generateFlowers(12);
  // Generate butterflies procedurally
  const butterflies = generateButterflies(3);
  return (
    <AnimationContainer>
      {/* Sky and sun */}
      <Sun
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <SunRay 
            key={index}
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
      
      {/* Flowers */}
      {flowers.map((flower) => (
        <div key={flower.id} style={{ position: 'absolute', left: `${flower.left}%` }}>
          <FlowerStem
            width={flower.size / 8}
            initial={{ height: 0 }}
            animate={{ height: flower.stemHeight }}
            transition={{ 
              duration: 1.5, 
              delay: flower.delay,
              ease: "easeOut" 
            }}
          >
            <Leaf 
              bottom={20} 
              left={true}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: flower.delay + 0.8,
                ease: "easeOut" 
              }}
            />
            <Leaf 
              bottom={40} 
              left={false}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: flower.delay + 1.0,
                ease: "easeOut" 
              }}
            />
          </FlowerStem>
          
          <Flower height={flower.height} size={flower.size}>
            {[0, 72, 144, 216, 288].map((rotation, index) => (
              <Petal
                key={index}
                rotation={rotation}
                color={flower.petalColor}
                size={flower.size / 2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: flower.delay + 1.5,
                  ease: "easeOut" 
                }}
              />
            ))}
            
            <FlowerCenter
              size={flower.size / 3}
              color={flower.centerColor}
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
      
      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <motion.img
          key={butterfly.id}
          src={butterfly.image}
          alt="Butterfly"
          style={{
            position: 'absolute',
            width: '2.5vw',
            height: '2.5vw',
            top: `${butterfly.top}vh`,
            left: `${butterfly.left}vw`,
            zIndex: 10,
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
      
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ 
          duration: 3, 
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity
        }}
      >
        Your garden is blooming...
      </LoadingText>
    </AnimationContainer>
  )
}

export default FlowerAnimation;