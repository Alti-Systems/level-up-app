// Level definitions
export const LEVELS = [
  {
    id: 1,
    name: 'The Iceberg',
    subtitle: "What's REALLY going on",
    icon: '🧊',
    color: '#4ECDC4',
    gradient: 'from-cyan-500 to-teal-500',
    description: 'Learn that what people see is just the tip of the iceberg. Discover what\'s really going on underneath.',
    skills: ['Self-awareness', 'Understanding emotions', 'Recognizing needs'],
  },
  {
    id: 2,
    name: 'Feelings Detective',
    subtitle: 'Understand your emotions',
    icon: '🔍',
    color: '#FF6B6B',
    gradient: 'from-pink-500 to-red-500',
    description: 'Become a detective of your own feelings. Learn to read your body\'s clues.',
    skills: ['Emotional vocabulary', 'Body awareness', 'Mood tracking'],
  },
  {
    id: 3,
    name: 'Say It Right',
    subtitle: 'Talk so people listen',
    icon: '💬',
    color: '#45B7D1',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Master the art of communication. Learn the magic sentence that actually works.',
    skills: ['Communication', 'Expressing needs', 'Conflict resolution'],
  },
  {
    id: 4,
    name: 'Trust Builder',
    subtitle: 'Get more freedom',
    icon: '🏦',
    color: '#96CEB4',
    gradient: 'from-green-500 to-teal-500',
    description: 'Build trust like filling a piggy bank. Learn how to earn more freedom.',
    skills: ['Responsibility', 'Honesty', 'Reliability'],
  },
  {
    id: 5,
    name: "You're Awesome",
    subtitle: 'Feel good about yourself',
    icon: '⭐',
    color: '#FFEAA7',
    gradient: 'from-yellow-500 to-orange-500',
    description: 'Discover your unique qualities. Learn that you\'re more than your achievements.',
    skills: ['Self-esteem', 'Identity', 'Positive self-talk'],
  },
  {
    id: 6,
    name: 'Friend Zone',
    subtitle: 'Handle friend stuff',
    icon: '👥',
    color: '#DDA0DD',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Navigate friendship challenges. Learn to deal with peer pressure and drama.',
    skills: ['Social skills', 'Peer pressure', 'Healthy friendships'],
  },
  {
    id: 7,
    name: 'Chill Out',
    subtitle: 'Calm down when stressed',
    icon: '😌',
    color: '#98D8C8',
    gradient: 'from-teal-500 to-cyan-500',
    description: 'Build your calm-down toolkit. Master the STOP method for big emotions.',
    skills: ['Stress management', 'Coping strategies', 'Self-regulation'],
  },
  {
    id: 8,
    name: 'Make a Deal',
    subtitle: 'Ask for what you want',
    icon: '🤝',
    color: '#F7DC6F',
    gradient: 'from-yellow-500 to-amber-500',
    description: 'Learn the art of negotiation. Get what you want while keeping everyone happy.',
    skills: ['Negotiation', 'Problem-solving', 'Compromise'],
  },
]

// Badge definitions
export const BADGES = LEVELS.map((level) => ({
  id: level.id,
  name: `${level.name} Master`,
  icon: level.icon,
  description: `Complete Level ${level.id}: ${level.name}`,
}))

// Achievement definitions
export const ACHIEVEMENTS = [
  {
    id: 'first_star',
    name: 'First Star',
    description: 'Earn your first star',
    icon: '⭐',
    requirement: { type: 'stars', value: 1 },
  },
  {
    id: 'star_collector',
    name: 'Star Collector',
    description: 'Earn 50 stars',
    icon: '🌟',
    requirement: { type: 'stars', value: 50 },
  },
  {
    id: 'superstar',
    name: 'Superstar',
    description: 'Earn 100 stars',
    icon: '💫',
    requirement: { type: 'stars', value: 100 },
  },
  {
    id: 'first_level',
    name: 'Level Up!',
    description: 'Complete your first level',
    icon: '🎯',
    requirement: { type: 'levels', value: 1 },
  },
  {
    id: 'halfway',
    name: 'Halfway Hero',
    description: 'Complete 4 levels',
    icon: '🏆',
    requirement: { type: 'levels', value: 4 },
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Complete all 8 levels',
    icon: '👑',
    requirement: { type: 'levels', value: 8 },
  },
  {
    id: 'streak_3',
    name: 'On Fire',
    description: '3 day streak',
    icon: '🔥',
    requirement: { type: 'streak', value: 3 },
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7 day streak',
    icon: '💪',
    requirement: { type: 'streak', value: 7 },
  },
  {
    id: 'mood_tracker',
    name: 'Mood Master',
    description: 'Log 7 moods',
    icon: '📊',
    requirement: { type: 'moods', value: 7 },
  },
]

// Feeling words for Level 2
export const FEELING_WORDS = {
  mad: ['Annoyed', 'Frustrated', 'Furious', 'Irritated', 'Grumpy', 'Bitter', 'Resentful'],
  sad: ['Disappointed', 'Lonely', 'Left out', 'Hurt', 'Upset', 'Heartbroken', 'Gloomy'],
  scared: ['Worried', 'Nervous', 'Anxious', 'Unsure', 'Uncomfortable', 'Panicked', 'Terrified'],
  happy: ['Excited', 'Grateful', 'Proud', 'Content', 'Joyful', 'Peaceful', 'Hopeful'],
}

// Body clues for Level 2
export const BODY_CLUES = [
  { clue: 'Tight chest, hard to breathe deeply', feeling: 'Worried or scared', emoji: '😰' },
  { clue: 'Fists tight, face hot', feeling: 'Angry or frustrated', emoji: '😠' },
  { clue: 'Heavy feeling, no energy', feeling: 'Sad or tired', emoji: '😢' },
  { clue: 'Butterflies in tummy, can\'t sit still', feeling: 'Excited or nervous', emoji: '🦋' },
  { clue: 'Shoulders up by your ears', feeling: 'Stressed or tense', emoji: '😬' },
  { clue: 'Warm and relaxed all over', feeling: 'Happy and calm', emoji: '😊' },
]

// Iceberg examples for Level 1
export const ICEBERG_EXAMPLES = [
  { behavior: 'Not talking to someone', underneath: 'Feeling hurt, hoping they notice' },
  { behavior: 'Saying "I don\'t care"', underneath: 'Scared of being let down' },
  { behavior: 'Going to your room', underneath: 'Need some space and quiet' },
  { behavior: 'Getting mad about something small', underneath: 'Lots of stuff building up' },
]

// Communication examples for Level 3
export const COMMUNICATION_EXAMPLES = [
  { bad: 'You never let me do ANYTHING!', good: 'I wish I could do more stuff. Can we talk about it?' },
  { bad: 'You don\'t understand!', good: 'I don\'t feel like you get what I mean. Can I try to explain?' },
  { bad: 'Leave me ALONE!', good: 'I need some time by myself right now. Can we talk later?' },
  { bad: 'That\'s SO unfair!', good: 'I don\'t understand why. Can you help me understand?' },
]

// Coping tools for Level 7
export const COPING_TOOLS = {
  mad: ['Go outside', 'Punch a pillow', 'Do jumping jacks', 'Squeeze something', 'Count to 10', 'Take deep breaths'],
  sad: ['Talk to someone', 'Cuddle a pet', 'Listen to music', 'Write it down', 'Watch something funny', 'Draw how you feel'],
  worried: ['Deep breaths', 'Talk to a grown-up', 'Name 5 things you see', 'Squeeze a stress ball', 'Go for a walk', 'Listen to calm music'],
  stressed: ['Take a break', 'Do something fun', 'Go for a walk', 'Have a snack', 'Stretch', 'Take a shower'],
}

// Qualities for Level 5
export const QUALITIES = [
  'Kind',
  'Funny',
  'Creative',
  'Good friend',
  'Helpful',
  'Brave',
  'Curious',
  'Caring',
  'Honest',
  'Hard worker',
  'Good listener',
  'Patient',
  'Loyal',
  'Thoughtful',
  'Determined',
  'Fair',
  'Generous',
  'Smart',
  'Athletic',
  'Musical',
]

// Good friend signs for Level 6
export const GOOD_FRIEND_SIGNS = [
  'Happy when good things happen to you',
  'Okay when you say no to things',
  'Keeps your secrets',
  'Includes you',
  'Listens to you',
  'Doesn\'t talk behind your back',
]

export const BAD_FRIEND_SIGNS = [
  'Jealous when good things happen to you',
  'Gets mad when you say no',
  'Tells other people your private stuff',
  'Leaves you out on purpose',
  'Only talks about themselves',
  'Makes you feel bad about yourself',
]
