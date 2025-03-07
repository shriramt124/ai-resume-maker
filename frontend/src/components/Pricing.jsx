import React from 'react';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        { name: 'Basic Templates', included: true },
        { name: 'Export to PDF', included: true },
        { name: 'AI Suggestions', included: false },
        { name: 'Premium Templates', included: false },
        { name: 'Priority Support', included: false },
      ],
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Pro',
      price: '9.99',
      description: 'Best for professionals',
      features: [
        { name: 'Basic Templates', included: true },
        { name: 'Export to PDF', included: true },
        { name: 'AI Suggestions', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Priority Support', included: false },
      ],
      color: 'from-blue-400 to-purple-500',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '29.99',
      description: 'For teams and businesses',
      features: [
        { name: 'Basic Templates', included: true },
        { name: 'Export to PDF', included: true },
        { name: 'AI Suggestions', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Priority Support', included: true },
      ],
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select the plan that best fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900 rounded-2xl p-8 border border-gray-800 ${plan.popular ? 'md:-mt-8' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-center space-x-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500" />
                    )}
                    <span className={feature.included ? 'text-gray-200' : 'text-gray-500'}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full mt-8 py-4 rounded-xl font-semibold bg-gradient-to-r ${plan.color} 
                  ${plan.popular ? 'text-white' : 'text-white/90'}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
          <p className="text-gray-400 mb-8">
            Contact us for custom pricing and features tailored to your needs.
          </p>
          <button
            className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-semibold"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;