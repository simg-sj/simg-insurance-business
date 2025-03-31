import {useEffect} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({isOpen, onClose, title, children}: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl w-[800px] m-8 max-h-[80vh] relative modal">
                <div className="flex justify-between items-center px-10 pt-6">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <div className="cursor-pointer text-3xl text-gray-600 hover:text-gray-800" onClick={onClose}>×</div>
                </div>
                <div className="px-6 py-5 max-h-[calc(80vh-120px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

