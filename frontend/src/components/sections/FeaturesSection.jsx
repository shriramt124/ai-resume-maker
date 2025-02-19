import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, Download, CheckCircle } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose ResumeAI?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built with cutting-edge technology to help you create the perfect resume
            for your dream job.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'AI-Powered Writing',
              description: 'Smart suggestions and auto-completion to perfect your content.'
            },
            {
              icon: Layout,
              title: 'Beautiful Templates',
              description: 'Professional designs that catch the recruiters eye.'
            },
            {
              icon: Download,
              title: 'Easy Export',
              description: 'Download in multiple formats including PDF, Word, and more.'
            },
            {
              icon: CheckCircle,
              title: 'ATS-Friendly',
              description: 'Optimized for Applicant Tracking Systems.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700/50"
            >
              <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;