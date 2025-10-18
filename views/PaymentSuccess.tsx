import React from 'react';

interface PaymentSuccessProps {
    navigate: (view: string) => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ navigate }) => {
    return (
        <div className="text-center py-10 px-6 bg-white rounded-xl shadow-lg">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800">Pagamento Realizado com Sucesso!</h1>
            <p className="text-gray-600 mt-2 mb-6">
                Obrigado! Sua assinatura foi ativada. Agora você tem acesso a todos os recursos Pro.
            </p>
            <button
                onClick={() => navigate('dashboard')}
                className="bg-brand-teal-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors"
            >
                Ir para a Dashboard
            </button>
        </div>
    );
};

export default PaymentSuccess;
