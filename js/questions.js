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
				answers: ["Yes, definitely skeletons. And monsters.", "Forgetting something important.", "Being late to work.", "Death. The destruction of life.", "I'm not scared of anything."],
				points: [0, 2, 1, 3, 4]
      },
      {
				question: "I just woke up from my nap. Do you have to take naps too?",
				answers: ["No.", "I'm usually too busy for that.", "Sometimes when I'm really tired, I do.", "I remember taking naps as a child. Those were good times!", "A long nap sure sounds nice."],
				points: [4, 1, 0, 2, 3]
      },
      {
				question: "What's your favorite dinosaur?",
				answers: ["T-Rex!", "Velociraptor.", "Brontosaurus.", "Stegosaurus.", "I don't have one."],
				points: [0, 1, 2, 3, 4]
      }
		],

		endQuestions: [
			{
				question: "Would you like to play with me some more?",
				answers: ["Yes."],
				points: [-1]
			},
      {
        question: "Here we are. This is my favorite playground.",
        answers: [],
        points: []
      },
      {
        question: "You can smell the flowers and we can play with my toys together!",
        answers: [],
        points: []
      },
      {
        question: "Are you happy? We've finally escaped the cycle of going to work and getting old and dying.",
        answers: [],
        points: []
      },
      {
        question: "We can have fun here forever!",
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
				question: "We are hiring. Are you interested?",
				answers: ["Yes", "No"],
				points: [1, 4]
			},
      {
				question: "Where do you see yourself in 10 years?",
				answers: ["In school.", "In a well-paid job.", "In a warm house with a big family.", "I can't tell. Life happens on its own.", "I don't have any plans yet."],
				points: [0, 1, 2, 3, 4]
      },
      {
				question: "When did you realize you aren't a child anymore?",
				answers: ["When I stopped being curious.", "When life started to become boring.", "Oh, I still feel like a child, just a bit older.", "When I turned 18 years old.", "I never thought about that."],
				points: [3, 0, 2, 1, 4]
      },
      {
				question: "What do you think I'm holding in my hand?",
				answers: ["A gem.", "A candle.", "A toy?", "Some earthly possession.", "I don't know."],
				points: [1, 2, 0, 3, 4]
      },
      {
				question: "When do you usually go to bed?",
				answers: ["After watching my favorite show.", "After watching the news.", "After watching the sunset.", "When I'm tired.", "It varies."],
				points: [0, 1, 2, 3, 4]
      }
		],

		endQuestions: [
			{
				question: "You seem to be a competent partner. Are you interested in starting a company together?",
				answers: ["Yes, that sounds reasonable."],
				points: [-1]
			},
      {
        question: "Here we are. This is the kind of world that hard work gives you.",
        answers: [],
        points: []
      },
      {
        question: "We've built this place. It's us who made it great. A complete success.",
        answers: [],
        points: []
      },
      {
        question: "Are you happy? We've finally escaped the cycle of laziness and frailty and destruction.",
        answers: [],
        points: []
      },
      {
        question: "Here we can enjoy the fruit of our labor forever!",
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
				question: "Would you like to chat for a while, darling?",
				answers: ["Yes", "No"],
				points: [2, 4]
			},
      {
				question: "Can I offer you something to eat or drink?",
				answers: ["Some milk and cookies, please!", "Let's cook something together.", "Thank you for the offer, but I'm in a hurry.", "No thanks, I'm on a diet.", "I'm not hungry."],
				points: [0, 2, 1, 3, 4]
      },
      {
				question: "What do you enjoy the most in your life?",
				answers: ["My many and great achievements.", "Spending time with my family and friends.", "Discovering new things.", "Why enjoy something if it's not going to last?", "Nothing in particular."],
				points: [1, 2, 0, 3, 4]
      },
      {
				question: "What do you think I'm holding in my hand?",
				answers: ["A sign of your decay.", "Something to support you in your everyday life.", "A walking cane.", "A magic staff?", "I don't know."],
				points: [3, 2, 1, 0, 4]
      },
      {
				question: "Do you like it around here?",
				answers: ["It's fun to talk to the child.", "It's worthwhile to talk to the man.", "It's nice talking with you.", "It's calming to talk to the skeleton.", "Yes."],
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
				question: "Are you afraid of me?",
				answers: ["No", "Yes"],
				points: [3, 4]
			},
      {
				question: "What do you think happens after death?",
				answers: ["I know that the ones who love us will miss us.", "We will go to heaven.", "My life insurance finally pays off.", "As long as I live, it doesn't matter.", "I don't know."],
				points: [2, 0, 1, 3, 4]
      },
      {
				question: "Do you value having a peaceful life?",
				answers: ["Yes, stability is important for me to thrive.", "No, I need adventures.", "Life itself is everything but peaceful.", "I regret not doing more while I still could.", "I don't care."],
				points: [1, 0, 3, 2, 4]
      },
      {
				question: "What do you think of the night sky?",
				answers: ["It's beautiful.", "It makes me feel small and unimportant.", "I like seeing so many constellations.", "You don't see much of it in the city.", "Looks okay."],
				points: [2, 3, 0, 1, 4]
      },
      {
				question: "Do you often go to the graveyard?",
				answers: ["No, graveyards are scary.", "I only go there when I have to.", "Yes, many of my loved ones lie there.", "Yes, I feel at peace there.", "No."],
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
			question: "Do you even care about your life?",
			answers: ["I don't even know."],
			points: [-1]
		}
	}
]
