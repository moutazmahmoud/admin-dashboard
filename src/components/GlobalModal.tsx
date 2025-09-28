import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import Button from "@/components/Button";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
};

const GlobalModal: React.FC = () => {
  const { isOpen, title, content, confirmText, onConfirm, closeModal } =
    useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
        >
          <motion.div
            className="w-96 rounded-lg bg-white p-6 shadow-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && <h2 className="mb-4 text-lg font-bold">{title}</h2>}
            <div className="mb-4">{content}</div>
            <div className="flex justify-end gap-2">
              <Button onClick={closeModal} variant="secondary">
                Cancel
              </Button>

              {onConfirm && (
                <Button
                  onClick={() => {
                    onConfirm();
                    closeModal();
                  }}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
