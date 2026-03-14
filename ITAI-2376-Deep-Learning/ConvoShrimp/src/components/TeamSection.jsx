import { Users, Sparkles } from 'lucide-react';

const teamMembers = [
  { name: "DeMarcus", color: "#4ECDC4" },
  { name: "Chloe", color: "#FF1493" },
  { name: "Matthew", color: "#9B5DE5" },
  { name: "Franck", color: "#F7DC6F" }
];

export default function TeamSection() {
  return (
    <section id="team" className="section pdf-section">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
            <Users className="inline w-8 h-8 mr-2" />
            The Team
          </h2>
          <p className="text-text-secondary">The minds behind ConvoShrimp</p>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="text-center"
            >
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 text-2xl font-bold"
                style={{ 
                  backgroundColor: `${member.color}20`,
                  color: member.color,
                  border: `2px solid ${member.color}`
                }}
              >
                {member.name[0]}
              </div>
              <h3 
                className="font-display font-bold text-lg"
                style={{ color: member.color }}
              >
                {member.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center p-6 bg-card-surface rounded-2xl">
          <Sparkles className="w-6 h-6 text-shrimp-hot-pink mx-auto mb-3" />
          <p className="text-text-secondary text-sm italic">
            Deep Learning Course | Neural Network Zoo Assignment | 2026
          </p>
        </div>
      </div>
    </section>
  );
}
