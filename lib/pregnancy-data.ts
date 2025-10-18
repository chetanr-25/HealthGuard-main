export interface WeekData {
  title: string
  sizeComparison: string
  babyDevelopment: string[]
  maternalChanges: string
  symptoms: string[]
  tips: string
}

const pregnancyWeekData: Record<number, WeekData> = {
  1: {
    title: "Conception Week",
    sizeComparison: "Smaller than a grain of rice",
    babyDevelopment: ["Sperm meets egg", "Genetic material combines", "Cell division begins"],
    maternalChanges: "No visible changes yet. Your body is preparing for pregnancy.",
    symptoms: ["None yet"],
    tips: "Start taking prenatal vitamins with folic acid to support early development.",
  },
  12: {
    title: "End of First Trimester",
    sizeComparison: "Plum (2 inches)",
    babyDevelopment: [
      "All major organs formed",
      "Heartbeat visible on ultrasound",
      "Fingers and toes distinct",
      "Baby can make facial expressions",
    ],
    maternalChanges: "Morning sickness may ease. Energy levels improving.",
    symptoms: ["Fatigue", "Nausea", "Breast tenderness"],
    tips: "Schedule your first prenatal visit if you haven't already. Discuss any concerns with your doctor.",
  },
  20: {
    title: "Halfway Point",
    sizeComparison: "Banana (6.5 inches)",
    babyDevelopment: [
      "Gender can be determined",
      "Baby's movements felt (quickening)",
      "Eyebrows and eyelashes forming",
      "Vernix (protective coating) developing",
    ],
    maternalChanges: "Belly is noticeably round. Energy levels increasing.",
    symptoms: ["Back pain", "Leg cramps", "Increased appetite"],
    tips: "Attend your anatomy scan. This is a great time to bond with your baby through ultrasound images.",
  },
  24: {
    title: "Viability Milestone",
    sizeComparison: "Corn on the cob (11.4 inches)",
    babyDevelopment: [
      "Lungs beginning to develop",
      "Baby can hear sounds",
      "Taste buds forming",
      "Brain rapidly developing",
    ],
    maternalChanges: "Significant weight gain. Braxton Hicks contractions may start.",
    symptoms: ["Shortness of breath", "Frequent urination", "Swelling"],
    tips: "Your baby is now considered viable. Continue regular prenatal checkups and monitor fetal movements.",
  },
  28: {
    title: "Start of Third Trimester",
    sizeComparison: "Eggplant (14.8 inches)",
    babyDevelopment: [
      "Eyes can open and close",
      "Baby has sleep-wake cycles",
      "Rapid brain development",
      "Baby gaining weight rapidly",
    ],
    maternalChanges: "Belly is very prominent. May feel more tired.",
    symptoms: ["Braxton Hicks", "Swelling", "Heartburn", "Insomnia"],
    tips: "Start preparing for labor. Take childbirth classes and finalize your birth plan.",
  },
  36: {
    title: "Full Term",
    sizeComparison: "Honeydew melon (18.7 inches)",
    babyDevelopment: [
      "Baby is fully developed",
      "Lungs are mature",
      "Baby may drop into birth position",
      "Ready for birth",
    ],
    maternalChanges: "Feeling heavy and uncomfortable. Nesting instinct strong.",
    symptoms: ["Pelvic pressure", "Frequent urination", "Difficulty sleeping"],
    tips: "Pack your hospital bag. Be alert for signs of labor. Rest as much as possible.",
  },
  40: {
    title: "Due Date",
    sizeComparison: "Watermelon (20 inches)",
    babyDevelopment: [
      "Baby is fully developed",
      "Ready to meet the world",
      "All systems functioning",
      "Waiting for labor to begin",
    ],
    maternalChanges: "Anticipation and excitement. May feel anxious about labor.",
    symptoms: ["Contractions", "Bloody show", "Water breaking"],
    tips: "Labor could begin anytime. Stay calm and contact your doctor if you experience labor signs.",
  },
}

// Generate data for all 40 weeks with interpolated values
export function getWeekData(week: number): WeekData {
  if (pregnancyWeekData[week]) {
    return pregnancyWeekData[week]
  }

  // Default data for weeks not explicitly defined
  const trimester = week <= 12 ? 1 : week <= 26 ? 2 : 3
  const sizeInches = 0.5 + week * 0.5
  const sizes = [
    "grain of rice",
    "pea",
    "blueberry",
    "grape",
    "plum",
    "peach",
    "banana",
    "corn",
    "eggplant",
    "honeydew",
    "watermelon",
  ]
  const sizeIndex = Math.min(Math.floor(week / 4), sizes.length - 1)

  return {
    title: `Week ${week} Development`,
    sizeComparison: `${sizes[sizeIndex]} (${sizeInches.toFixed(1)} inches)`,
    babyDevelopment: [
      "Continued growth and development",
      "Organ systems maturing",
      "Brain development progressing",
      "Baby gaining weight",
    ],
    maternalChanges: `You're in your ${trimester === 1 ? "first" : trimester === 2 ? "second" : "third"} trimester. Your body continues to adapt to pregnancy.`,
    symptoms:
      trimester === 1
        ? ["Nausea", "Fatigue"]
        : trimester === 2
          ? ["Back pain", "Increased appetite"]
          : ["Braxton Hicks", "Swelling"],
    tips: `Continue prenatal care and maintain healthy habits. Listen to your body and rest when needed.`,
  }
}
