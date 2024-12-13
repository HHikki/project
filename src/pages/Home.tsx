import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Button from '../components/Button';
import { Wallet } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Wallet className="h-8 w-8 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-900">GestorGastos</h1>
              </div>
              <p className="text-xl text-gray-600">
                Toma el control de tus finanzas con nuestro sistema intuitivo de gestión de gastos.
                Rastrea tus gastos, establece presupuestos y alcanza tus metas financieras.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/login')}
                fullWidth
                className="text-lg"
              >
                Comenzar
              </Button>
              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: 'Seguimiento Fácil', desc: 'Registra gastos al instante' },
                { title: 'Análisis Inteligente', desc: 'Visualiza tus patrones de gasto' },
                { title: 'Metas de Ahorro', desc: 'Establece y alcanza objetivos financieros' }
              ].map((feature, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-[600px] overflow-hidden rounded-xl shadow-xl">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}