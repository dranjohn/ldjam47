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
				answers: ["Yes.", "No."],
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
			question: "You're so boring. Why are you here? Do you even want to play this game?",
			answers: ["No."],
			points: [-1]
		}
	},

	{
		underworldQuestion: {
			question: "Time only flows one way. And it's in everybody's 'interest' -- especially if you want to save up! (Get it?)",
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
				answers: ["Yes.", "No."],
				points: [1, 4]
			},
      {
				question: "Where do you see yourself in 10 years?",
				answers: ["In school.", "In a well-paid job.", "In a warm house with a big family.", "I can't tell. Life happens on its own.", "I don't have any plans yet."],
				points: [0, 1, 2, 3, 4]
      },
      {
				question: "When did you realize you're not a child anymore?",
				answers: ["When I stopped being curious.", "When life started to become boring.", "Oh, I still feel like a child, just a bit older.", "When I first had to pay taxes.", "I never thought about that."],
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
				question: "You seem to be a competent partner. Are you interested in doing business together?",
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
        question: "Here we can enjoy the fruits of our labor forever!",
        answers: [],
        points: []
      }
		],
		indifferenceQuestion: {
			question: "I don't think you have the ambition required for our project.",
			answers: ["Okay."],
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
				answers: ["Yes.", "No."],
				points: [2, 4]
			},
      {
				question: "Can I offer you something to eat or drink?",
				answers: ["Some milk and cookies, please!", "Let's cook something together.", "Thank you for the offer, but I'm in a hurry.", "I'm not hungry.", "No thanks, I'm on a diet."],
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
				question: "How do you like it around here?",
				answers: ["It's fun to talk to the child.", "It's worthwhile to talk to the man.", "It's nice to chat with you.", "It's calming to talk to the skeleton.", "It's okay."],
				points: [0, 1, 2, 3, 4]
      }
		],

		endQuestions: [
			{
				question: "Would you like to look through a photo album with me, darling?",
				answers: ["Yes, I'd love to."],
				points: [-1]
			},
      {
        question: "Here we are. This is the world I grew up in.",
        answers: [],
        points: []
      },
      {
        question: "Oh, a lot has changed, darling! The world you see here is now only preserved in my memories. It's a wonderful thing to reminisce.",
        answers: [],
        points: []
      },
      {
        question: "Are you happy? We've finally escaped the cycle of forgetfulness and greed and loss.",
        answers: [],
        points: []
      },
      {
        question: "Here we can enjoy the good old times forever.",
        answers: [],
        points: []
      }
		],
		indifferenceQuestion: {
			question: "Oh, darling, you used to be so talkative when you were younger. You just aren't the same any more...",
			answers: ["Whatever."],
			points: [-1]
		}
	},

	{
		underworldQuestion: {
			question: "You can't go back in time.",
			answers: [],
			points: []
		},
		noQuestion: {
			question: "Don't rush it. It will end soon enough.",
			answers: [],
			points: []
		},
		exhaustedQuestion: {
			question: "I have nothing more to show you -- for now.",
			answers: [],
			points: []
		},

		questions: [
			{
				question: "Are you afraid of me?",
				answers: ["No.", "Yes."],
				points: [3, 4]
			},
      {
				question: "What do you think happens after death?",
				answers: ["I know that the ones who love us will miss us.", "We will all go to heaven.", "My life insurance finally pays off.", "As long as I live, it doesn't matter.", "I don't know."],
				points: [2, 0, 1, 3, 4]
      },
      {
				question: "Do you value having a peaceful life?",
				answers: ["Yes, stability is important for me to thrive.", "No, I need adventures.", "Life itself is everything but peaceful.", "I do now, but I regret not doing more while I still could.", "I don't care."],
				points: [1, 0, 3, 2, 4]
      },
      {
				question: "What do you think of the night sky?",
				answers: ["It's beautiful to look at.", "It makes me feel small and unimportant.", "I like seeing so many constellations.", "You don't see much of it in the city.", "Looks okay."],
				points: [2, 3, 0, 1, 4]
      },
      {
				question: "Do you often go to the graveyard?",
				answers: ["No, graveyards are scary.", "I only go there when I have to.", "Yes, many of my loved ones lie there.", "Yes, it makes me feel at peace.", "No."],
				points: [0, 1, 2, 3, 4]
      }
		],

		endQuestions: [
			{
				question: "Would you like me to show you a world that lasts forever?",
				answers: ["Yes. Show me."],
				points: [-1]
			},
      {
        question: "Here we are. Here, nothing falls apart.",
        answers: [],
        points: []
      },
      {
        question: "Everything is eternal here, and you too are eternity itself.",
        answers: [],
        points: []
      },
      {
        question: "Are you content? You've finally escaped the cycle. No more pain. No more attachments. No more decay.",
        answers: [],
        points: []
      },
      {
        question: "Here, we will only exist -- forever.",
        answers: [],
        points: []
      }
		],
		indifferenceQuestion: {
			question: "Do you care about your life?",
			answers: ["I don't even know."],
			points: [-1]
		}
	}
]
