import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
async function main() {
  console.log('Seeding database...');

  await prisma.optionPersonality.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.personality.deleteMany();

  const personalities = await Promise.all([
    prisma.personality.create({
      data: {
        pubkey: randomUUID(),
        name: 'The Architect',
        description: 'Logical, analytical, and strategic thinker',
        color: '#3b82f6',
      },
    }),
    prisma.personality.create({
      data: {
        pubkey: randomUUID(),
        name: 'The Adventurer',
        description: 'Spontaneous, creative, and free-spirited',
        color: '#10b981',
      },
    }),
    prisma.personality.create({
      data: {
        pubkey: randomUUID(),
        name: 'The Guardian',
        description: 'Responsible, caring, and dependable',
        color: '#f59e0b',
      },
    }),
    prisma.personality.create({
      data: {
        pubkey: randomUUID(),
        name: 'The Visionary',
        description: 'Innovative, ambitious, and forward-thinking',
        color: '#8b5cf6',
      },
    }),
  ]);

  console.log('Created personalities:', personalities.length);

  const questionsData = [
    {
      text: 'How do you prefer to spend your weekend?',
      weight: 5,
      order: 1,
      options: [
        {
          text: 'Reading books or learning something new',
          scores: [5, 1, 2, 3],
        },
        {
          text: 'Exploring new places or trying new activities',
          scores: [1, 5, 1, 3],
        },
        {
          text: 'Spending quality time with family and friends',
          scores: [2, 2, 5, 1],
        },
        { text: 'Working on personal projects or goals', scores: [4, 2, 1, 5] },
      ],
    },
    {
      text: 'When facing a problem, you typically:',
      weight: 4,
      order: 2,
      options: [
        {
          text: 'Analyze all possible solutions systematically',
          scores: [5, 1, 2, 3],
        },
        {
          text: 'Trust your intuition and go with the flow',
          scores: [1, 5, 2, 2],
        },
        { text: 'Seek advice from trusted people', scores: [2, 1, 5, 1] },
        {
          text: 'Look for innovative and unconventional solutions',
          scores: [3, 3, 1, 5],
        },
      ],
    },
    {
      text: 'What motivates you most in life?',
      weight: 5,
      order: 3,
      options: [
        { text: 'Understanding how things work', scores: [5, 1, 1, 2] },
        { text: 'Freedom and new experiences', scores: [1, 5, 1, 3] },
        { text: 'Helping and caring for others', scores: [1, 1, 5, 1] },
        { text: 'Creating something impactful', scores: [2, 2, 1, 5] },
      ],
    },
    {
      text: 'In a group setting, you are usually:',
      weight: 3,
      order: 4,
      options: [
        {
          text: 'The problem solver who thinks things through',
          scores: [5, 1, 2, 3],
        },
        {
          text: 'The energetic one who brings fun ideas',
          scores: [1, 5, 2, 3],
        },
        {
          text: 'The mediator who ensures everyone is included',
          scores: [1, 1, 5, 1],
        },
        {
          text: 'The leader who drives the vision forward',
          scores: [2, 2, 1, 5],
        },
      ],
    },
    {
      text: 'Your ideal work environment is:',
      weight: 4,
      order: 5,
      options: [
        {
          text: 'Quiet and organized with minimal distractions',
          scores: [5, 1, 3, 2],
        },
        { text: 'Dynamic and flexible with variety', scores: [1, 5, 1, 4] },
        { text: 'Collaborative and supportive', scores: [2, 2, 5, 1] },
        { text: 'Challenging and opportunity-rich', scores: [3, 3, 1, 5] },
      ],
    },
    {
      text: 'How do you handle stress?',
      weight: 3,
      order: 6,
      options: [
        { text: 'Step back and think logically', scores: [5, 1, 2, 3] },
        { text: 'Do something active or spontaneous', scores: [1, 5, 1, 2] },
        { text: 'Talk it out with someone you trust', scores: [1, 2, 5, 1] },
        { text: 'Channel it into productive work', scores: [3, 2, 1, 5] },
      ],
    },
    {
      text: 'When learning something new, you prefer:',
      weight: 4,
      order: 7,
      options: [
        {
          text: 'Reading detailed documentation or books',
          scores: [5, 1, 2, 2],
        },
        { text: 'Jumping in and experimenting', scores: [1, 5, 1, 4] },
        {
          text: 'Learning from others through collaboration',
          scores: [2, 2, 5, 1],
        },
        { text: 'Finding innovative applications', scores: [3, 3, 1, 5] },
      ],
    },
    {
      text: 'Your decision-making style is:',
      weight: 5,
      order: 8,
      options: [
        { text: 'Data-driven and rational', scores: [5, 1, 2, 3] },
        { text: 'Instinctive and flexible', scores: [1, 5, 2, 2] },
        { text: "Considerate of others' needs", scores: [1, 1, 5, 1] },
        { text: 'Bold and future-focused', scores: [2, 3, 1, 5] },
      ],
    },
    {
      text: 'What describes your approach to planning?',
      weight: 3,
      order: 9,
      options: [
        { text: 'Detailed plans with contingencies', scores: [5, 1, 3, 2] },
        { text: 'Loose framework, adapt as you go', scores: [1, 5, 1, 3] },
        { text: 'Plan that considers everyone involved', scores: [2, 1, 5, 1] },
        { text: 'Big picture goals with milestones', scores: [3, 2, 1, 5] },
      ],
    },
    {
      text: 'People would describe you as:',
      weight: 4,
      order: 10,
      options: [
        { text: 'Intelligent and thorough', scores: [5, 1, 2, 3] },
        { text: 'Fun and spontaneous', scores: [1, 5, 2, 2] },
        { text: 'Warm and reliable', scores: [1, 1, 5, 1] },
        { text: 'Ambitious and inspiring', scores: [2, 2, 1, 5] },
      ],
    },
  ];
  for (const questionData of questionsData) {
    const question = await prisma.question.create({
      data: {
        pubkey: randomUUID(),
        text: questionData.text,
        weight: questionData.weight,
        order: questionData.order,
      },
    });
    for (let i = 0; i < questionData.options.length; i++) {
      const optionData = questionData.options[i];
      const option = await prisma.option.create({
        data: {
          pubkey: randomUUID(),
          questionId: question.id,
          text: optionData.text,
          order: i + 1,
        },
      });

      for (let j = 0; j < personalities.length; j++) {
        await prisma.optionPersonality.create({
          data: {
            pubkey: randomUUID(),
            optionId: option.id,
            personalityId: personalities[j].id,
            points: optionData.scores[j],
          },
        });
      }
    }
  }
  console.log('Database seeded successfully!');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
