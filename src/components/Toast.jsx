import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
    const { toastMessage } = useCart();

    if (!toastMessage) return null;

    const icons = {
        success: <CheckCircle size={20} className="toast-icon text-success" />,
        error: <AlertCircle size={20} className="toast-icon text-error" />,
        info: <Info size={20} className="toast-icon text-info" />
    };

    return (
        <div className={`toast-notification toast-${toastMessage.type || 'success'}`}>
            {icons[toastMessage.type] || icons.success}
            <span className="toast-text">{toastMessage.message}</span>
        </div>
    );
}
