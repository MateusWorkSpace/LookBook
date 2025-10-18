import React from 'react';

interface PaymentCancelProps {
    navigate: (view: string) => void;
}

const PaymentCancel: React.FC<PaymentCancelProps> = ({ navigate }) => {
    return (
        <div className="text-center py-10 px-6 bg-white rounded-xl shadow-lg">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>

            <h1 className="text-3xl font-bold text-gray-800">Pagamento Cancelado</h1>
            <p className="text-gray-600 mt-2 mb-6">
                O processo de pagamento foi cancelado. Você não foi cobrado.
            </p>
            <button
                onClick={() => navigate('dashboard')}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
                Voltar para a Dashboard
            </button>
        </div>
    );
};

export default PaymentCancel;
