import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IntroPageProps {
  onComplete: () => void;
}

const logoVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const IntroPage: React.FC<IntroPageProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete();
        navigate('/home');
      }}
    >
      {showLogo && (
        <motion.div
          id="logoContainer"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <img src="./images/logo.png" alt="Logo" style={{ width: '250px' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroPage;
