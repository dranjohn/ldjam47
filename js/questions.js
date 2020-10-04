const GUARDIAN_QUESTIONS = [
	{
		underworldQuestion: {
			question: "Why did you come back to me? Do you find grown-ups boring too?",
			answers: [],
			points: []
		},
		noQuestion: {
			question: "I'm busy playing. Wanna come back after naptime?",
			answers: [],
			points: []
		},
		exhaustedQuestion: {
			question: "We had so much fun today! But I have to go home to mommy now...",
			answers: [],
			points: []
		},

		questions: [
			{
				question: "Do you want to play with me?",
				answers: ["Yes", "No"],
				points: [0, 4]
			},
      {
				question: "I want to play something fun! What's your favorite game?",
				answers: ["Tag.", "Chess.", "I don't have one.", "I've played so many games, I really can't remember.", "Life as a whole is a game."],
				points: [0, 1, 4, 2, 3]
      },
      {
				question: "The skeleton over there looks so spooky! What scares you the most?",
				answers: ["Yes, definitely skeletons. And chess.", "Forgetting something important.", "Being late to work.", "Death. The destruction of life.", "I'm not scared of anything."],
				points: [0, 2, 1, 3, 4]
      },
      {
				question: "I just woke up from my nap. Do you have to take naps too?",
				answers: ["No.", "I'm usually too busy for that.", "Sometimes when I'm really tired, I do.", "I remember taking naps as a child. Those were good times!", "A long nap sure sounds nice."],
				points: [4, 1, 0, 2, 3]
      },
      {
				question: "What's your favorite dinosaur?",
				answers: ["T-Rex!", "Pterodactyl.", "Brontosaurus.", "Stegosaurus.", "I don't have one."],
				points: [0, 1, 2, 3, 4]
      }
		],

		endQuestions: [
			{
				question: "I've won",
				answers: [],
				points: []
			}
		],
		indifferenceQuestion: {
			question: "You're so boring. Do you even want to play with me?",
			answers: ["No, I don't."],
			points: [-1]
		}
	},

	{
		underworldQuestion: {
			question: "Time only flows one way. And it's in everybody's 'interest' -- especially if you want to save up!",
			answers: [],
			points: []
		},
		noQuestion: {
			question: "I need to think about what we've discussed. Let me know if you need anything.",
			answers: [],
			points: []
		},
		exhaustedQuestion: {
			question: "It was a pleasure doing business with you.",
			answers: [],
			points: []
		},

		questions: [
			{
				question: "Do you like to work?",
				answers: ["Yes", "No"],
				points: [1, 4]
			}
		],

		endQuestions: [
			{
				question: "I've won",
				answers: [],
				points: []
			}
		],
		indifferenceQuestion: {
			question: "I don't think you have the ambition required for our project.",
			answers: ["I never wanted to work with you anyway."],
			points: [-1]
		}
	},

	{
		underworldQuestion: {
			question: "Oh, yes, I too would love to go back to the days of my youth...",
			answers: [],
			points: []
		},
		noQuestion: {
			question: "Go play, darling, and let granny rest for a bit.",
			answers: [],
			points: []
		},
		exhaustedQuestion: {
			question: "Wait, what did I want to ask you again? I don't remember...",
			answers: [],
			points: []
		},

		questions: [
			{
				question: "Do you like to remember?",
				answers: ["Yes", "No"],
				points: [2, 4]
			}
		],

		endQuestions: [
			{
				question: "I've won",
				answers: [],
				points: []
			}
		],
		indifferenceQuestion: {
			question: "Oh, darling, you just aren't the same any more...",
			answers: ["That's none of your business."],
			points: [-1]
		}
	},

	{
		underworldQuestion: {
			question: "You can't go back in time. If that were possible, I wouldn't have to be like this.",
			answers: [],
			points: []
		},
		noQuestion: {
			question: "Don't rush it. It will end soon enough.",
			answers: [],
			points: []
		},
		exhaustedQuestion: {
			question: "You don't want me to show you more. Believe me.",
			answers: [],
			points: []
		},

		questions: [
			{
				question: "Do you like to live?",
				answers: ["Yes", "No"],
				points: [3, 4]
			}
		],

		endQuestions: [
			{
				question: "I've won",
				answers: [],
				points: []
			}
		],
		indifferenceQuestion: {
			question: "Do you even care about your life?",
			answers: ["I don't even know."],
			points: [-1]
		}
	}
]
