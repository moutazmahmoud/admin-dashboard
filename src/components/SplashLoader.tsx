import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SplashLoaderProps = {
  open: boolean;
  minDuration?: number;
  onFinish?: () => void;
};

const SplashLoader: React.FC<SplashLoaderProps> = ({
  open,
  minDuration = 800,
  onFinish,
}) => {
  const [visible, setVisible] = useState(open);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      setStartTime(Date.now());
      setVisible(true);
    } else if (startTime !== null) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(minDuration - elapsed, 0);
      const timeout = setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, remaining);
      return () => clearTimeout(timeout);
    }
  }, [open, minDuration, startTime, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 , pointerEvents: "none"}}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Spinner */}
          <motion.div
            className="h-14 w-14 rounded-full border-[3px] border-zinc-300 border-t-primary"
            animate={{ rotate: 360, scale: [0.8, 1, 0.95, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            initial={{ scale: 0.8, opacity: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
          />

          {/* Brand / Message */}
          <motion.p
            className="mt-6 text-base font-semibold tracking-wide text-zinc-600 dark:text-zinc-300"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
