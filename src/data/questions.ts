import { Option } from "../types";

export interface Question {
  id: number;
  text: string;
  options: Option[];
  requiresDistance: boolean;
  explanation?: string; // Optional field for question explanation
}

// Helper function to shuffle an array in place (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}


export const questions: Question[] = [
  {
    id: 1,
    text: "Okay lets start from the very beginning . This morning, while brushing your teeth, how long did you leave the water running?",
    requiresDistance: false,
    explanation: "Leaving the water running while brushing wastes a surprising amount of water. Turning off the tap can save gallons each day. Consider using a cup for rinsing to further conserve water.",
    options: shuffleArray([ // <--- SHUFFLED
      {
        id: 1,
        text: "I turn off the tap while brushing",
        carbonFootprint: 1,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Top water conservation practice!",
        improvement:
          "Perfect! Always turning off the tap is the best way to save water while brushing.",
        explanation:
          "Turning off the tap while brushing saves significant amounts of treated water, reducing water waste.",
      },
      {
        id: 2,
        text: "I use a cup to rinse",
        carbonFootprint: 2,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Efficient rinsing with a cup.",
        improvement:
          "Using a cup is a great way to control water use for rinsing. Keep it up!",
        explanation:
          "Using a cup for rinsing is a water-efficient method, limiting water use to only what's needed.",
      },
      {
        id: 3,
        text: "I turn off the tap most of the time",
        carbonFootprint: 3,
        treeEquivalent: 1,
        rank: 3,
        performance: "Very Good - Mostly conserving water.",
        improvement:
          "Very good, but aim for 'always' to maximize water savings. Make it a consistent habit.",
        explanation:
          "Usually turning off the tap is a great step. Making it a consistent habit maximizes water conservation.",
      },
      {
        id: 4,
        text: "I sometimes turn off the tap",
        carbonFootprint: 8,
        treeEquivalent: 1,
        rank: 4,
        performance: "Good - Occasional water saving.",
        improvement:
          "Good you remember sometimes. Try to be more consistent and turn it off every time.",
        explanation:
          "Turning off the tap sometimes is better than never, but consistency is key for effective water saving.",
      },
      {
        id: 5,
        text: "I rarely turn off the tap",
        carbonFootprint: 15,
        treeEquivalent: 1,
        rank: 5,
        performance: "Moderate water waste - Usually leaving tap running.",
        improvement:
          "Rarely turning off the tap wastes water. Make a conscious effort to turn it off each time.",
        explanation:
          "Leaving the tap running while brushing wastes treated water unnecessarily.",
      },
      {
        id: 6,
        text: "I leave the water running the entire time",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 6,
        performance: "Wasteful practice - Always leaving tap running.",
        improvement:
          "Always leaving the tap running is very wasteful. Start turning it off immediately to save water.",
        explanation:
          "Never turning off the tap is the most water-wasteful practice, wasting significant amounts of clean water.",
      },
    ]),
  },
  {
    id: 2,
    text: "For breakfast, what type of cooking fuel did you use for preparing your breakfast?",
    requiresDistance: false,
    explanation: "The type of fuel used for cooking greatly impacts your carbon footprint. Natural gas is a fossil fuel that contributes to greenhouse gas emissions, while electric stoves can be powered by renewable sources. Solid fuels, common in some regions, can have significant health and environmental impacts.",
    options: shuffleArray([ // <--- SHUFFLED
      {
        id: 1,
        text: "I don't usually cook breakfast",
        carbonFootprint: 0,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Zero home cooking energy!",
        improvement:
          "If you don't cook at home, you're at zero energy use for home cooking!",
        explanation:
          "Not cooking breakfast at home eliminates energy consumption from breakfast preparation.",
      },
      {
        id: 2,
        text: "Toaster",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Efficient for toasting.",
        improvement:
          "Toasters are generally energy-efficient for their specific purpose.",
        explanation:
          "Toasters use a relatively small amount of energy for quick toasting tasks.",
      },
      {
        id: 3,
        text: "Microwave or Electric Oven",
        carbonFootprint: 40,
        treeEquivalent: 2,
        rank: 3,
        performance: "Good - Efficient for reheating and some cooking.",
        improvement:
          "Use the microwave for smaller portions and avoid unnecessary preheating of the oven.",
        explanation:
          "Microwaves are energy-efficient, but ovens consume more power. Use them wisely.",
      },
      {
        id: 4,
        text: "Electric or Induction stovetop",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 4,
        performance: "Good - Electric cooking, depending on energy source.",
        improvement:
          "Electric and induction stovetops are good, especially with renewable energy.  Ensure efficient cookware use.",
        explanation:
          "Electric and induction stovetops are more energy-efficient than coil stoves and can be sustainable with clean energy sources.",
      },
      {
        id: 5,
        text: "Gas stovetop",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 5,
        performance: "Moderate - Natural gas is a fossil fuel.",
        improvement: "Gas is fossil fuel-based.  Consider switching to electric or induction over time.",
        explanation:
          "Gas stovetops directly burn fossil fuels, contributing to greenhouse gas emissions.  Electric options are cleaner with renewable energy.",
      },
      {
        id: 6,
        text: "Solid fuels (wood, charcoal, coal)",
        carbonFootprint: 150,
        treeEquivalent: 6,
        rank: 6,
        performance: "High - Solid fuel burning has health and environmental impacts.",
        improvement: "If possible, transition to cleaner cooking methods. Ensure proper ventilation if using solid fuels.",
        explanation:
          "Burning solid fuels releases particulate matter and other pollutants, impacting air quality and contributing to deforestation if not sustainably sourced.",
      },

    ]),
  },
  {
    id: 3,
    text: "What was you primary source of protein for the breakfast?",
    requiresDistance: false,
    explanation: "The source of your protein significantly impacts your carbon footprint. Plant-based proteins generally have the lowest impact, while red meat has the highest.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 1,
        text: "Plant-based (e.g., tofu, lentils, nuts, tempeh)",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Lowest carbon protein source!",
        improvement: "Keep enjoying plant-based protein!",
        explanation:
          "Plant-based proteins have a significantly lower environmental impact than animal-based proteins.",
      },
       {
        id: 6,
        text: "I don't typically eat a protein-rich breakfast",
        carbonFootprint: 5,
        treeEquivalent: 1,
        rank: 2,
        performance: "Low footprint - No protein focus at breakfast.",
        improvement: "Consider adding a small amount of plant-based protein for nutritional benefits.",
        explanation:
          "If you don't focus on protein at breakfast, your footprint from this meal is likely low.",
      },
      {
        id: 2,
        text: "Eggs",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 3,
        performance: "Good - Moderate carbon protein source.",
        improvement:
          "Eggs are a better choice than red meat. Consider plant-based options occasionally.",
        explanation: "Eggs have a lower carbon footprint than red meat, but higher than plant-based options.",
      },
      {
        id: 3,
        text: "Dairy (e.g., yogurt, milk, cheese)",
        carbonFootprint: 35,
        treeEquivalent: 2,
        rank: 4,
        performance: "Moderate - Dairy has a noticeable footprint.",
        improvement:
          "Consider plant-based milk alternatives (soy, almond, oat) to reduce your impact.",
        explanation:
          "Dairy production has a significant environmental impact due to methane emissions and land use.",
      },
      {
        id: 4,
        text: "Processed meat (e.g., bacon, sausage)",
        carbonFootprint: 60,
        treeEquivalent: 3,
        rank: 5,
        performance: "Higher - Processed meats have a larger footprint.",
        improvement:
          "Reduce processed meat consumption for both health and environmental reasons.",
        explanation:
          "Processed meats have a high carbon footprint due to processing, packaging, and livestock farming.",
      },
      {
        id: 5,
        text: "Red/White meat (e.g., beef, lamb, chicken)",
        carbonFootprint: 80,
        treeEquivalent: 4,
        rank: 6,
        performance: "Highest - Red meat has a significant impact.",
        improvement: "Consider reducing red meat consumption significantly.",
        explanation:
          "Red meat production has the highest carbon footprint among common protein sources.",
      },
    ]),
  },
  {
    id: 4,
    text: "How did you commute for reaching this location?",
    requiresDistance: true,
    explanation: "Your mode of transportation has a significant impact on your carbon footprint. Walking, cycling, and public transportation are the most sustainable options. Electric vehicles are better than gasoline cars, but still have an impact from manufacturing and electricity generation. Consider local transportation options like three-wheelers.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 1,
        text: "Walk or cycle",
        carbonFootprint: 0,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Zero-emission commute!",
        improvement: "Keep up the great work!",
        explanation: "Walking and cycling are the most sustainable commute options.",
      },
      {
        id: 2,
        text: "Public transport (bus, tram, subway)",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 2,
        performance: "Good - Efficient shared travel.",
        improvement:
          "Consider off-peak travel to help with crowding and efficiency.",
        explanation:
          "Public transport is much more efficient than individual cars.",
      },
      {
          id: 3,
          text: "Three-wheeler",
          carbonFootprint: 75,
          treeEquivalent: 3,
          rank: 3,
          performance: "Good - More efficient than cars, especially CNG or electric.",
          improvement: "Opt for CNG or electric versions if available.",
          explanation: "Three-wheelers can be a more efficient alternative to cars, particularly if they use CNG or electricity."
      },
      {
        id: 4,
        text: "Electric car (EV)",
        carbonFootprint: 150,
        treeEquivalent: 6,
        rank: 4,
        performance: "Better - Lower emission car travel.",
        improvement: "Charge with renewable energy for maximum benefit.",
        explanation:
          "Electric cars have zero tailpipe emissions, a significant improvement over gasoline cars.",
      },
      {
        id: 5,
        text: "Gasoline car (personal vehicle)",
        carbonFootprint: 800,
        treeEquivalent: 36,
        rank: 5,
        performance: "Moderate - Standard car commute emissions.",
        improvement: "Consider alternatives for shorter commutes. Carpooling helps.",
        explanation: "Gasoline cars are a major source of emissions.",
      },
      {
        id: 6,
        text: "Motorcycle or scooter",
        carbonFootprint: 400,
        treeEquivalent: 18,
        rank: 6,
        performance: "Moderate - Still emits carbon, but less than cars.",
        improvement:
          "More fuel-efficient than cars, but still fossil fuel-based. Electric versions are better.",
        explanation:
          "Motorcycles and scooters are often less polluting than cars but still contribute to emissions.",
      },
    ]),
  },
  {
    id: 5,
    text: "But wait when leaving your home did you check and turn off the electrical appliances?",
    requiresDistance: false,
    explanation: "Many electronic devices consume energy even when turned off or in standby mode. This is known as 'phantom load'. Unplugging devices or using power strips can eliminate this wasted energy.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 1,
        text: "I always turn them off completely",
        carbonFootprint: 5,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Minimizing energy waste!",
        improvement: "Keep up this excellent habit!",
        explanation: "Turning off electronics completely eliminates 'phantom load'.",
      },
      {
        id: 2,
        text: "I use smart power strips to manage power usage",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very good - Smart power strips help automate savings",
        improvement:
          "Great Choice",
        explanation: "It helps reduce consumption",
      },
      {
        id: 3,
        text: "I mostly turn them off, but sometimes use standby",
        carbonFootprint: 15,
        treeEquivalent: 1,
        rank: 3,
        performance: "Very Good - Mostly minimizing energy waste.",
        improvement: "Try to eliminate standby use completely.",
        explanation:
          "Mostly turning off is great.  Standby still uses some energy.",
      },
      {
        id: 4,
        text: "I use standby for convenience",
        carbonFootprint: 30,
        treeEquivalent: 1,
        rank: 4,
        performance: "Moderate - Standby mode uses energy.",
        improvement:
          "Unplug devices or use a power strip to easily turn them off.",
        explanation:
            "Standby mode, while convenient, consumes energy continuously ('phantom load').",
      },
      {
        id: 5,
        text: "I leave them on standby most of the time",
        carbonFootprint: 45,
        treeEquivalent: 2,
        rank: 5,
        performance: "Noticeable energy waste - Frequent standby use.",
        improvement: "Make a conscious effort to turn devices off more often.",
        explanation:
          "Leaving devices on standby frequently contributes to unnecessary energy consumption.",
      },
      {
        id: 6,
        text: "I rarely turn electronics off",
        carbonFootprint: 60,
        treeEquivalent: 3,
        rank: 6,
        performance: "Higher energy waste - Devices left on or in standby.",
        improvement: "Start turning off devices regularly to save energy.",
        explanation:
          "Leaving electronics on or in standby consistently wastes energy.",
      },

    ]),
  },
  {
    id: 6,
    text: "After you reached your office, what temperature did you set your thermostat on?",
    requiresDistance: false,
    explanation: "Setting your thermostat at a higher temperature in the summer (or lower in the winter) reduces energy consumption. Every degree makes a difference! Fans can also provide cooling with significantly less energy use.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 6,
        text: "I don't use air conditioning",
        carbonFootprint: 0,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Zero cooling energy!",
        improvement:
          "Best possible option! Avoiding AC saves maximum energy.",
        explanation:
          "Not using AC results in zero emissions from cooling, the most environmentally friendly approach.",
      },
      {
        id: 5,
        text: "I only use fans",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 2,
        performance: "Excellent - Very low energy cooling!",
        improvement: "Keep using them and enjoy the low energy cooling.",
        explanation:
          "Fans use minimal electricity compared to AC, making them a very sustainable option.",
      },
      {
        id: 1,
        text: "25°C (77°F) or higher",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 3,
        performance: "Excellent - Highly energy-saving cooling!",
        improvement: "Fans can help with comfort at warmer settings.",
        explanation:
          "Setting your thermostat high minimizes AC use and energy consumption.",
      },
      {
        id: 2,
        text: "23-24°C (73-75°F)",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 4,
        performance: "Very Good - Energy-conscious cooling.",
        improvement: "Consider raising it a degree higher for even more savings.",
        explanation:
          "23-24°C is an energy-saving setting. It balances comfort with reduced energy demand.",
      },
      {
        id: 3,
        text: "21-22°C (70-72°F)",
        carbonFootprint: 250,
        treeEquivalent: 11,
        rank: 5,
        performance: "Moderate - Average cooling temperature.",
        improvement: "Lowering the temperature would save noticeable energy.",
        explanation:
          "21-22°C is average but not optimized for efficiency.",
      },
      {
        id: 4,
        text: "20°C (68°F) or lower",
        carbonFootprint: 400,
        treeEquivalent: 18,
        rank: 6,
        performance: "High - Significant cooling energy consumption.",
        improvement:
          "20°C or lower is very energy-intensive. Raise it to save energy.",
        explanation:
          "20°C and below is highly energy-consuming for cooling, leading to a large carbon footprint.",
      },
    ]),
  },
  {
    id: 7,
    text: "Have you ever noticed that the appliances around you are energy efficient?",
    requiresDistance: false,
    explanation: "Energy-efficient appliances use less energy to perform the same tasks, saving money on utility bills and reducing your carbon footprint. Look for the Energy Star label and other efficiency ratings when purchasing new appliances.",
    options: shuffleArray([  // <--- SHUFFLED
       {
        id: 6,
        text: "I try to repair appliances to extend their life",
        carbonFootprint: 5,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent = repair saves more",
        improvement:
          "Good",
        explanation: "Repair is the best way",
      },
      {
        id: 1,
        text: "Very important - I always look for the most efficient models",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 2,
        performance: "Excellent - Always prioritizing energy efficiency!",
        improvement:
          "Fantastic! Always choosing energy-efficient appliances is a top way to reduce your footprint.",
        explanation:
          "Prioritizing energy efficiency ensures lower energy consumption over the product's lifespan.",
      },
      {
        id: 2,
        text: "Important - I usually consider energy ratings",
        carbonFootprint: 20,
        treeEquivalent: 1,
        rank: 3,
        performance: "Very Good - Mostly prioritizing efficiency.",
        improvement: "Aim for 'always' for maximum impact.",
        explanation:
          "Mostly choosing energy-efficient appliances is a strong commitment to sustainability.",
      },
      {
        id: 3,
        text: "Somewhat important - I consider it if the price is right",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 4,
        performance: "Good - Considering efficiency occasionally.",
        improvement:
          "Think long-term - energy savings often outweigh a small price increase.",
        explanation:
          "Considering efficiency when prices are similar is a start, but long-term savings make it worthwhile.",
      },
      {
        id: 4,
        text: "Not very important - Other factors are more important",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 5,
        performance: "Moderate - Lower priority for efficiency.",
        improvement:
          "Rarely prioritizing efficiency means missed energy savings. Start considering energy labels.",
        explanation:
          "Ignoring energy efficiency can lead to higher energy bills and a larger environmental impact.",
      },
      {
        id: 5,
        text: "I don't consider energy ratings at all",
        carbonFootprint: 150,
        treeEquivalent: 6,
        rank: 6,
        performance: "Lower - Not considering energy efficiency.",
        improvement:
          "Start looking for Energy Star and similar labels - it's easy!",
        explanation:
          "Not checking energy labels means you are missing out on a simple way to choose more sustainable appliances.",
      },

    ]),
  },
  {
    id: 8,
    text: "Tell us consciously, whats your average screen time daily?",
    requiresDistance: false,
    explanation: "The more time you spend using electronic devices, the more energy they consume. Reducing screen time and using power-saving modes can help lower your energy footprint.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 1,
        text: "Less than 2 hours",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Minimal screen time!",
        improvement: "Keep up the low screen time!",
        explanation: "Low screen time means lower energy consumption from devices.",
      },
        {
        id: 6,
        text: "I use power-saving modes on my devices",
        carbonFootprint: 15,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very good - Power Saving mode saves a lot",
        improvement: "Good Choice",
        explanation:
          "It helps to reduce wastage of energy",
      },
      {
        id: 2,
        text: "2-4 hours",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 3,
        performance: "Good - Moderate screen time.",
        improvement: "Try to be mindful of device usage and power-saving settings.",
        explanation: "Moderate screen time has a moderate energy impact.",
      },
      {
        id: 3,
        text: "4-6 hours",
        carbonFootprint: 40,
        treeEquivalent: 2,
        rank: 4,
        performance: "Moderate - Noticeable energy use.",
        improvement: "Consider reducing screen time or using devices more efficiently.",
        explanation: "4-6 hours of screen time increases energy consumption.",
      },
      {
        id: 4,
        text: "6-8 hours",
        carbonFootprint: 60,
        treeEquivalent: 3,
        rank: 5,
        performance: "Higher energy use - Significant screen time.",
        improvement: "Try to reduce screen time and unplug devices when not in use.",
        explanation: "6-8 hours of screen time has a considerable energy impact.",
      },
      {
        id: 5,
        text: "More than 8 hours",
        carbonFootprint: 80,
        treeEquivalent: 4,
        rank: 6,
        performance: "High energy use - Extensive screen time.",
        improvement: "Reduce screen time significantly to lower your footprint.",
        explanation:
          "More than 8 hours of screen time results in high energy consumption from devices.",
      },
    ]),
  },
  {
    id: 9,
    text: "How do you typically get your groceries?",
    requiresDistance: true,
    explanation: "Where you get your groceries and how often can impact your carbon footprint. Supporting local vendors and minimizing trips reduces emissions.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 1,
        text: "From a local farmers market or directly from producers",
        carbonFootprint: 15,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Supports local and reduces transportation!",
        improvement: "Keep supporting local vendors!",
        explanation: "Buying locally reduces transportation emissions and supports your community.",
      },
      {
        id: 2,
        text: "Mostly from a supermarket, making a trip once a week",
        carbonFootprint: 30,
        treeEquivalent: 2,
        rank: 2,
        performance: "Good - Efficient supermarket trips.",
        improvement: "Plan your trips to minimize frequency.",
        explanation: "Fewer, larger supermarket trips are more efficient than frequent, small ones.",
      },
      {
        id: 3,
        text: "Mostly from a supermarket, several trips a week",
        carbonFootprint: 60,
        treeEquivalent: 3,
        rank: 3,
        performance: "Moderate - Frequent supermarket trips increase emissions.",
        improvement: "Try to consolidate trips into one or two per week.",
        explanation: "Multiple trips to the supermarket consume more fuel and energy.",
      },
      {
        id: 4,
        text: "A mix of supermarket and local stores",
        carbonFootprint: 40,
        treeEquivalent: 2,
        rank: 4,
        performance: "Good - Balancing convenience and local support.",
        improvement: "Try to prioritize local options when possible.",
        explanation: "Combining supermarket convenience with local shopping is a good balance.",
      },
      {
        id: 5,
        text: "Mostly order online for delivery",
        carbonFootprint: 50,
        treeEquivalent: 3,
        rank: 5,
        performance: "Moderate - Delivery emissions depend on efficiency.",
        improvement: "Choose delivery services with efficient routing and packaging.",
        explanation: "Online grocery delivery can be efficient or inefficient, depending on the service.",
      },
      {
        id: 6,
        text: "Primarily from convenience stores",
        carbonFootprint: 70,
        treeEquivalent: 3,
        rank: 6,
        performance: "Higher Impact - Relying on convenience stores.",
        improvement: "Try to plan trips to supermarkets or local markets for a wider selection and lower impact.",
        explanation: "Convenience stores often have higher prices and a less sustainable supply chain.",
      },

    ]),
  },
  {
    id: 10,
    text: "Before sleeping, do you consider sorting your household waste",
    requiresDistance: false,
    explanation: "Proper waste sorting is crucial for reducing landfill waste and maximizing recycling and composting. Recycling conserves resources, while composting reduces methane emissions from landfills.",
    options: shuffleArray([  // <--- SHUFFLED
      {
        id: 1,
        text: "I separate recyclables, compost, and trash",
        carbonFootprint: 10,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Comprehensive waste sorting!",
        improvement: "Keep up the fantastic waste management!",
        explanation:
          "Separating waste streams maximizes recycling and composting, minimizing landfill waste.",
      },
      {
        id: 5,
        text: "I compost food scraps and yard waste",
        carbonFootprint: 15,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very good",
        improvement: "Excellent option",
        explanation: "It is a great way to manage waste",
      },
      {
        id: 2,
        text: "I separate recyclables and trash",
        carbonFootprint: 30,
        treeEquivalent: 1,
        rank: 3,
        performance: "Very Good - Separating recyclables is crucial.",
        improvement: "Consider adding composting if possible.",
        explanation:
          "Separating recyclables from trash significantly reduces landfill waste.",
      },
      {
          id: 6,
          text: "My waste management is handled by my building/community",
          carbonFootprint: 50,
          treeEquivalent: 2,
          rank: 4,
          performance: "Moderate - Depends on your building's waste management system.",
          improvement: "Inquire about your building's waste sorting and recycling practices.",
          explanation: "Your impact depends on the effectiveness of your building's system. Advocate for better practices if needed."
      },
      {
        id: 3,
        text: "I sometimes separate recyclables",
        carbonFootprint: 60,
        treeEquivalent: 2,
        rank: 5,
        performance: "Good - Occasional recycling.",
        improvement: "Try to make recycling a consistent habit.",
        explanation:
          "Recycling sometimes is better than never, but consistency is key.",
      },
      {
        id: 4,
        text: "I don't separate my waste",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 6,
        performance: "Wasteful - All waste goes to landfill.",
        improvement: "Start separating recyclables immediately to reduce your impact.",
        explanation:
          "Not separating waste means valuable materials end up in landfills unnecessarily.",
      },
    ]),
  },
];