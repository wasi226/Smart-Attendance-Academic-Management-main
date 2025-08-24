import React from 'react';
import { Trophy, Target, Zap, Award, Star, Calendar, TrendingUp, Shield } from 'lucide-react';

const AchievementBadges: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Perfect Attendance',
      description: 'Maintain 100% attendance for a full month',
      icon: Trophy,
      earned: true,
      earnedDate: '2025-01-01',
      rarity: 'legendary',
      progress: 100
    },
    {
      id: 2,
      title: 'Early Bird',
      description: 'Arrive early for 10 consecutive days',
      icon: Zap,
      earned: true,
      earnedDate: '2024-12-20',
      rarity: 'rare',
      progress: 100
    },
    {
      id: 3,
      title: 'Consistency King',
      description: 'Maintain 90%+ attendance for 3 months',
      icon: Target,
      earned: true,
      earnedDate: '2024-12-15',
      rarity: 'epic',
      progress: 100
    },
    {
      id: 4,
      title: 'Academic Star',
      description: 'Score above 90% in all subjects',
      icon: Star,
      earned: true,
      earnedDate: '2024-11-30',
      rarity: 'rare',
      progress: 100
    },
    {
      id: 5,
      title: 'Weekly Warrior',
      description: 'Complete a full week without any absences',
      icon: Calendar,
      earned: false,
      earnedDate: null,
      rarity: 'common',
      progress: 85
    },
    {
      id: 6,
      title: 'Improvement Master',
      description: 'Improve attendance by 15% over last month',
      icon: TrendingUp,
      earned: false,
      earnedDate: null,
      rarity: 'epic',
      progress: 60
    },
    {
      id: 7,
      title: 'Dedication Badge',
      description: 'Maintain attendance streak for 30 days',
      icon: Shield,
      earned: false,
      earnedDate: null,
      rarity: 'legendary',
      progress: 45
    },
    {
      id: 8,
      title: 'Excellence Award',
      description: 'Achieve both attendance and academic excellence',
      icon: Award,
      earned: false,
      earnedDate: null,
      rarity: 'legendary',
      progress: 25
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500 to-pink-500';
      case 'epic': return 'from-blue-500 to-purple-500';
      case 'rare': return 'from-green-500 to-blue-500';
      case 'common': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-400 shadow-purple-400/50';
      case 'epic': return 'border-blue-400 shadow-blue-400/50';
      case 'rare': return 'border-green-400 shadow-green-400/50';
      case 'common': return 'border-gray-400 shadow-gray-400/50';
      default: return 'border-gray-400 shadow-gray-400/50';
    }
  };

  const earnedBadges = achievements.filter(badge => badge.earned);
  const inProgressBadges = achievements.filter(badge => !badge.earned);

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{earnedBadges.length}</h3>
          <p className="text-gray-400">Badges Earned</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{inProgressBadges.length}</h3>
          <p className="text-gray-400">In Progress</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {Math.round((earnedBadges.length / achievements.length) * 100)}%
          </h3>
          <p className="text-gray-400">Completion Rate</p>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2" />
          Earned Badges
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {earnedBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div 
                key={badge.id}
                className={`relative bg-white/5 border-2 ${getRarityBorder(badge.rarity)} rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                <div className="absolute top-2 right-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white uppercase tracking-wide`}>
                    {badge.rarity}
                  </span>
                </div>
                
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="font-semibold text-white text-center mb-2">{badge.title}</h4>
                <p className="text-xs text-gray-400 text-center mb-4">{badge.description}</p>
                
                <div className="text-center">
                  <span className="text-xs text-green-400 font-medium">
                    Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In Progress Badges */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2" />
          Badges In Progress
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inProgressBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div 
                key={badge.id}
                className="relative bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute top-2 right-2">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-600 text-gray-300 uppercase tracking-wide">
                    {badge.rarity}
                  </span>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mx-auto mb-4 opacity-60">
                  <Icon className="w-8 h-8 text-gray-300" />
                </div>
                
                <h4 className="font-semibold text-white text-center mb-2">{badge.title}</h4>
                <p className="text-xs text-gray-400 text-center mb-4">{badge.description}</p>
                
                <div className="space-y-2">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)} transition-all duration-300`}
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-400">
                      {badge.progress}% Complete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Keep Going! 🎯</h3>
          <p className="text-gray-300 mb-4">
            You're doing great! Complete your daily attendance to unlock more badges and rewards.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white font-medium">Next Goal</p>
              <p className="text-gray-400">Weekly Warrior Badge</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white font-medium">Progress</p>
              <p className="text-gray-400">85% Complete</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white font-medium">Days Left</p>
              <p className="text-gray-400">2 more days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;