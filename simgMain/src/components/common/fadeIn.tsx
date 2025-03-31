import { motion } from "framer-motion";

interface FadeInSectionProps {
    children: React.ReactNode;
    yduration?: number; // y축 애니메이션 속도
}

export default function FadeInSection({
                                          children,
                                          yduration = 1
                                      }: FadeInSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
                ease: "easeOut",
                duration: 1,
                y: { duration: yduration },
            }}
        >
            {children}
        </motion.div>
    );
}
