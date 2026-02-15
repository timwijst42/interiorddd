import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SheetProps {
    children: React.ReactNode
    className?: string
    title?: string
}

export function Sheet({ children, className, title }: SheetProps) {
    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
                "absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] shadow-2xl z-40 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 px-6",
                className
            )}
        >
            {title && (
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-1 bg-gray-200 rounded-full" />
                </div>
            )}
            {children}
        </motion.div>
    )
}
