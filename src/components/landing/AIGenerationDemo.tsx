import { useState } from 'react';
import { Sparkles, Image as ImageIcon, Video, FileText, Network } from 'lucide-react';

const demos = [
  {
    icon: <ImageIcon size={32} />,
    title: 'Image Generation',
    description: 'Create stunning AI-generated images',
    gradient: 'from-purple-500 to-pink-500',
    preview: '/lovable-uploads/06232a0d-be4b-4e28-ab40-ca2e3e309e4c.png'
  },
  {
    icon: <Video size={32} />,
    title: 'Video Content',
    description: 'Generate dynamic video content',
    gradient: 'from-blue-500 to-cyan-500',
    preview: '/lovable-uploads/5c0593c5-5471-45ee-a093-349209e3b4f5.png'
  },
  {
    icon: <FileText size={32} />,
    title: 'Text Generation',
    description: 'Intelligent text and content creation',
    gradient: 'from-green-500 to-emerald-500',
    preview: '/lovable-uploads/bfe7dde7-470d-424d-a42d-a7d34e7f8d9f.png'
  },
  {
    icon: <Network size={32} />,
    title: 'Diagrams & Charts',
    description: 'Create complex visualizations',
    gradient: 'from-orange-500 to-red-500',
    preview: '/lovable-uploads/c8bb4107-045f-4395-b2c0-30333ba564b7.png'
  }
];

export const AIGenerationDemo = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="text-primary" size={24} />
          <h2 className="text-3xl font-bold">AI Generation Capabilities</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience the power of Cortext.ai with real-time AI generation across multiple formats
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {demos.map((demo, index) => (
          <div
            key={index}
            onClick={() => setActiveDemo(index)}
            className={`glass-panel p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              activeDemo === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${demo.gradient} text-white mb-4`}>
              {demo.icon}
            </div>
            <h3 className="font-semibold mb-2">{demo.title}</h3>
            <p className="text-sm text-muted-foreground">{demo.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <img 
          src={demos[activeDemo].preview} 
          alt={demos[activeDemo].title}
          className="w-full h-[400px] object-cover"
        />
      </div>
    </div>
  );
};