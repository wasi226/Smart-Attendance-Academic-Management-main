import React, { useState } from 'react';
import { Trophy, Star, Award, Target, Zap, Crown, Gift, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
}

interface Leaderboard {
  rank: number;
  studentName: string;
  points: number;
  badges: number;
  streak: number;
  avatar: string;
}

const GamificationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard' | 'rewards'>('overview');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Perfect Week',
      description: 'Attend all classes for a full week',
      icon: Trophy,
      points: 100,
      rarity: 'rare',
      progress: 5,
      maxProgress: 5,
      unlocked: true,
      unlockedDate: '2025-01-10'
    },
    {
      id: '2',
      title: 'Early Bird',
      description: 'Arrive early for 10 consecutive days',
      icon: Zap,
      points: 150,
      rarity: 'epic',
      progress: 8,
      maxProgress: 10,
      unlocked: false
    },
    {
      id: '3',
      title: 'Attendance Champion',
      description: 'Maintain 95%+ attendance for a month',
      icon: Crown,
      points: 300,
      rarity: 'legendary',
      progress: 28,
      maxProgress: 30,
      unlocked: false
    },
    {
      id: '4',
      title: 'Streak Master',
      description: 'Maintain a 20-day attendance streak',
      icon: Target,
      points: 200,
      rarity: 'epic',
      progress: 15,
      maxProgress: 20,
      unlocked: false
    }
  ];

  const leaderboard: Leaderboard[] = [
    {
      rank: 1,
      studentName: 'Alex Chen',
      points: 2450,
      badges: 12,
      streak: 25,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      rank: 2,
      studentName: 'Sarah Johnson',
      points: 2380,
      badges: 11,
      streak: 22,
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      rank: 3,
      studentName: 'Mike Rodriguez',
      points: 2290,
      badges: 10,
      streak: 18,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      rank: 4,
      studentName: 'Emma Wilson',
      points: 2150,
      badges: 9,
      streak: 15,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      rank: 5,
      studentName: 'David Lee',
      points: 2050,
      badges: 8,
      streak: 12,
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const rewards = [
    {
      id: '1',
      title: 'Extra Credit Points',
      description: '5 bonus points for any subject',
      cost: 500,
      icon: Star,
      available: true
    },
    {
      id: '2',
      title: 'Homework Pass',
      description: 'Skip one homework assignment',
      cost: 800,
      icon: Gift,
      available: true
    },
    {
      id: '3',
      title: 'Early Dismissal',
      description: 'Leave 15 minutes early on Friday',
      cost: 1000,
      icon: Award,
      available: false
    },
    {
      id: '4',
      title: 'Preferred Seating',
      description: 'Choose your seat for a week',
      cost: 300,
      icon: Target,
      available: true
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

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-orange-400';
      default: return 'text-blue-400';
    }
  };

  const userStats = {
    totalPoints: 1850,
    currentRank: 6,
    totalBadges: 7,
    currentStreak: 12,
    weeklyGoal: 100,
    weeklyProgress: 75
  };

  return (
    <div className="space-y-8">
      {/* User Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 text-center">
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{userStats.totalPoints}</div>
          <div className="text-sm text-gray-300">Total Points</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 text-center">
          <Crown className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">#{userStats.currentRank}</div>
          <div className="text-sm text-gray-300">Class Rank</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-6 text-center">
          <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{userStats.totalBadges}</div>
          <div className="text-sm text-gray-300">Badges Earned</div>
        </div>
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6 text-center">
          <Zap className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{userStats.currentStreak}</div>
          <div className="text-sm text-gray-300">Day Streak</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
          { id: 'rewards', label: 'Rewards', icon: Gift }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Weekly Progress */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Weekly Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Points Goal</span>
                <span className="text-white font-semibold">{userStats.weeklyProgress}/{userStats.weeklyGoal}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(userStats.weeklyProgress / userStats.weeklyGoal) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">
                {userStats.weeklyGoal - userStats.weeklyProgress} points needed to reach weekly goal
              </p>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Achievements</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.filter(a => a.unlocked).slice(0, 2).map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div key={achievement.id} className={`p-4 rounded-lg bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-20 border border-white/20`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{achievement.title}</h4>
                        <p className="text-sm text-gray-300">+{achievement.points} points</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className={`p-6 rounded-xl border transition-all ${
                  achievement.unlocked 
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-20 border-white/30` 
                    : 'bg-white/5 border-white/10'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}` 
                        : 'bg-gray-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                      achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white` 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-white mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>
                  
                  {achievement.unlocked ? (
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 text-sm font-medium">Unlocked!</span>
                      <span className="text-yellow-400 font-semibold">+{achievement.points} pts</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Class Leaderboard</h3>
          <div className="space-y-4">
            {leaderboard.map((student) => (
              <div key={student.rank} className={`p-4 rounded-lg border transition-all ${
                student.rank <= 3 
                  ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    student.rank === 1 ? 'bg-yellow-500 text-black' :
                    student.rank === 2 ? 'bg-gray-400 text-black' :
                    student.rank === 3 ? 'bg-orange-500 text-black' :
                    'bg-blue-500 text-white'
                  }`}>
                    {student.rank}
                  </div>
                  
                  <img 
                    src={student.avatar} 
                    alt={student.studentName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{student.studentName}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{student.points} points</span>
                      <span>{student.badges} badges</span>
                      <span>{student.streak} day streak</span>
                    </div>
                  </div>
                  
                  {student.rank <= 3 && (
                    <Crown className={`w-6 h-6 ${getRankColor(student.rank)}`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Reward Store</h3>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{userStats.totalPoints} points</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {rewards.map((reward) => {
              const Icon = reward.icon;
              const canAfford = userStats.totalPoints >= reward.cost;
              
              return (
                <div key={reward.id} className={`p-6 rounded-xl border transition-all ${
                  reward.available && canAfford
                    ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                    : 'bg-white/5 border-white/10'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      reward.available && canAfford ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      canAfford ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {reward.cost} pts
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-white mb-2">{reward.title}</h4>
                  <p className="text-sm text-gray-400 mb-4">{reward.description}</p>
                  
                  <button 
                    disabled={!reward.available || !canAfford}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      reward.available && canAfford
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {!reward.available ? 'Not Available' : 
                     !canAfford ? 'Insufficient Points' : 'Redeem'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationSystem;