import { Option } from "../types";

export interface Question {
  id: number;
  text: string;
  options: Option[];
  requiresDistance: boolean;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "How long do you typically leave the water running while brushing your teeth?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "I turn off the tap while brushing",
        carbonFootprint: 1,
        treeEquivalent: 1,  // Minimum 1
        rank: 1,
        performance: "Excellent - Top water conservation practice!",
        improvement:
          "Perfect! Always turning off the tap is the best way to save water while brushing.",
        explanation:
          "Turning off the tap while brushing saves significant amounts of treated water, reducing water waste.",
      },
      {
        id: 2,
        text: "I turn off the tap most of the time",
        carbonFootprint: 3,
        treeEquivalent: 1,  // Minimum 1
        rank: 2,
        performance: "Very Good - Mostly conserving water.",
        improvement:
          "Very good, but aim for 'always' to maximize water savings. Make it a consistent habit.",
        explanation:
          "Usually turning off the tap is a great step. Making it a consistent habit maximizes water conservation.",
      },
      {
        id: 3,
        text: "I sometimes turn off the tap",
        carbonFootprint: 8,
        treeEquivalent: 1,  // Minimum 1
        rank: 3,
        performance: "Good - Occasional water saving.",
        improvement:
          "Good you remember sometimes. Try to be more consistent and turn it off every time.",
        explanation:
          "Turning off the tap sometimes is better than never, but consistency is key for effective water saving.",
      },
      {
        id: 4,
        text: "I rarely turn off the tap",
        carbonFootprint: 15,
        treeEquivalent: 1,
        rank: 4,
        performance: "Moderate water waste - Usually leaving tap running.",
        improvement:
          "Rarely turning off the tap wastes water. Make a conscious effort to turn it off each time.",
        explanation:
          "Leaving the tap running while brushing wastes treated water unnecessarily.",
      },
      {
        id: 5,
        text: "I leave the water running the entire time",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 5,
        performance: "Wasteful practice - Always leaving tap running.",
        improvement:
          "Always leaving the tap running is very wasteful. Start turning it off immediately to save water.",
        explanation:
          "Never turning off the tap is the most water-wasteful practice, wasting significant amounts of clean water.",
      },
      {
        id: 6,
        text: "I use a cup to rinse",
        carbonFootprint: 2,
        treeEquivalent: 1,  // Minimum 1
        rank: 2,
        performance: "Very Good - Efficient rinsing with a cup.",
        improvement:
          "Using a cup is a great way to control water use for rinsing. Keep it up!",
        explanation:
          "Using a cup for rinsing is a water-efficient method, limiting water use to only what's needed.",
      },
    ],
  },
  {
    id: 2,
    text: "What is your primary protein source at breakfast?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Plant-based (e.g., tofu, beans, nuts)",
        carbonFootprint: 10,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.5)
        rank: 1,
        performance: "Excellent - Lowest carbon protein source!",
        improvement: "Keep enjoying plant-based protein!",
        explanation:
          "Plant-based proteins have a significantly lower environmental impact than animal-based proteins.",
      },
      {
        id: 2,
        text: "Eggs",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 2,
        performance: "Good - Moderate carbon protein source.",
        improvement:
          "Eggs are a better choice than red meat. Consider plant-based options occasionally.",
        explanation: "Eggs have a lower carbon footprint than red meat, but higher than plant-based options.",
      },
      {
        id: 3,
        text: "Dairy (e.g., yogurt, milk, cheese)",
        carbonFootprint: 35,
        treeEquivalent: 2,   // Adjusted from 1.5
        rank: 3,
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
        rank: 4,
        performance: "Higher - Processed meats have a larger footprint.",
        improvement:
          "Reduce processed meat consumption for both health and environmental reasons.",
        explanation:
          "Processed meats have a high carbon footprint due to processing, packaging, and livestock farming.",
      },
      {
        id: 5,
        text: "Red meat (e.g., steak)",
        carbonFootprint: 80,
        treeEquivalent: 4,
        rank: 5,
        performance: "Highest - Red meat has a significant impact.",
        improvement: "Consider reducing red meat consumption significantly.",
        explanation:
          "Red meat production has the highest carbon footprint among common protein sources.",
      },
      {
        id: 6,
        text: "I don't typically eat a protein-rich breakfast",
        carbonFootprint: 5,
        treeEquivalent: 1,  // Minimum 1
        rank: 1,
        performance: "Low footprint - No protein focus at breakfast.",
        improvement: "Consider adding a small amount of plant-based protein for nutritional benefits.",
        explanation:
          "If you don't focus on protein at breakfast, your footprint from this meal is likely low.",
      },
    ],
  },
  {
    id: 3,
    text: "What type of cooking fuel/energy do you use to prepare breakfast?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Microwave",
        carbonFootprint: 20,
        treeEquivalent: 1,
        rank: 1,
        performance: "Very Good - Efficient for reheating and small meals.",
        improvement:
          "Microwaves are great for efficiency.  For larger meals, consider energy-efficient stovetops or ovens.",
        explanation:
          "Microwaves are generally very energy-efficient, especially for reheating and cooking smaller portions quickly.",
      },
      {
        id: 2,
        text: "Electric or Induction stovetop",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 2,
        performance: "Good - Electric cooking, depending on energy source.",
        improvement:
          "Electric and induction stovetops are good, especially with renewable energy.  Ensure efficient cookware use.",
        explanation:
          "Electric and induction stovetops are more energy-efficient than coil stoves and can be sustainable with clean energy sources.",
      },
      {
        id: 3,
        text: "Gas stovetop",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 3,
        performance: "Moderate - Natural gas is a fossil fuel.",
        improvement: "Gas is fossil fuel-based.  Consider switching to electric or induction over time.",
        explanation:
          "Gas stovetops directly burn fossil fuels, contributing to greenhouse gas emissions.  Electric options are cleaner with renewable energy.",
      },
      {
        id: 4,
        text: "Electric oven",
        carbonFootprint: 75,
        treeEquivalent: 3,
        rank: 2,
        performance: "Moderate - Oven use consumes more energy.",
        improvement:
          "Ovens use more energy. Use efficiently - cook larger batches, avoid preheating unnecessarily.",
        explanation:
          "Electric ovens consume more energy, especially for longer cooking times. Efficient use is key to minimizing their footprint.",
      },
      {
        id: 5,
        text: "I don't usually cook breakfast",
        carbonFootprint: 0,
        treeEquivalent: 1, // Minimum 1
        rank: 1,
        performance: "Excellent - Zero home cooking energy!",
        improvement:
          "If you don't cook at home, you're at zero energy use for home cooking!",
        explanation:
          "Not cooking breakfast at home eliminates energy consumption from breakfast preparation.",
      },
       {
        id: 6,
        text: "Toaster",
        carbonFootprint: 10,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.5)
        rank: 1,
        performance: "Very Good - Efficient for toasting.",
        improvement:
          "Toasters are generally energy-efficient for their specific purpose.",
        explanation:
          "Toasters use a relatively small amount of energy for quick toasting tasks.",
      },
    ],
  },
  {
    id: 4,
    text: "What is your primary mode of transportation for daily commuting?",
    requiresDistance: true,
    options: [
      {
        id: 1,
        text: "Walk or cycle",
        carbonFootprint: 0,
        treeEquivalent: 1,   // Minimum 1
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
        text: "Train",
        carbonFootprint: 75,
        treeEquivalent: 3,
        rank: 2,
        performance: "Very Good - Efficient for longer commutes.",
        improvement:
          "Trains are great, especially for longer commutes. Electric trains are even better.",
        explanation:
          "Trains, especially electric, are highly efficient for commuting longer distances.",
      },
      {
        id: 4,
        text: "Electric car (EV)",
        carbonFootprint: 150,
        treeEquivalent: 6,
        rank: 3,
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
        rank: 4,
        performance: "Moderate - Standard car commute emissions.",
        improvement: "Consider alternatives for shorter commutes. Carpooling helps.",
        explanation: "Gasoline cars are a major source of emissions.",
      },
      {
        id: 6,
        text: "Motorcycle or scooter",
        carbonFootprint: 400,
        treeEquivalent: 18,
        rank: 3,
        performance: "Moderate - Still emits carbon, but less than cars.",
        improvement:
          "More fuel-efficient than cars, but still fossil fuel-based. Electric versions are better.",
        explanation:
          "Motorcycles and scooters are often less polluting than cars but still contribute to emissions.",
      },
    ],
  },
  {
    id: 5,
    text: "When leaving your home, do you turn off electronics or leave them on standby?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "I always turn them off completely",
        carbonFootprint: 5,
        treeEquivalent: 1,  // Minimum 1
        rank: 1,
        performance: "Excellent - Minimizing energy waste!",
        improvement: "Keep up this excellent habit!",
        explanation: "Turning off electronics completely eliminates 'phantom load'.",
      },
      {
        id: 2,
        text: "I mostly turn them off, but sometimes use standby",
        carbonFootprint: 15,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.5)
        rank: 2,
        performance: "Very Good - Mostly minimizing energy waste.",
        improvement: "Try to eliminate standby use completely.",
        explanation:
          "Mostly turning off is great.  Standby still uses some energy.",
      },
      {
        id: 3,
        text: "I use standby for convenience",
        carbonFootprint: 30,
        treeEquivalent: 1,
        rank: 3,
        performance: "Moderate - Standby mode uses energy.",
        improvement:
          "Unplug devices or use a power strip to easily turn them off.",
        explanation:
            "Standby mode, while convenient, consumes energy continuously ('phantom load').",
      },
      {
        id: 4,
        text: "I leave them on standby most of the time",
        carbonFootprint: 45,
        treeEquivalent: 2,
        rank: 3,
        performance: "Noticeable energy waste - Frequent standby use.",
        improvement: "Make a conscious effort to turn devices off more often.",
        explanation:
          "Leaving devices on standby frequently contributes to unnecessary energy consumption.",
      },
      {
        id: 5,
        text: "I rarely turn electronics off",
        carbonFootprint: 60,
        treeEquivalent: 3,  // Adjusted from 2.5
        rank: 4,
        performance: "Higher energy waste - Devices left on or in standby.",
        improvement: "Start turning off devices regularly to save energy.",
        explanation:
          "Leaving electronics on or in standby consistently wastes energy.",
      },
      {
        id: 6,
        text: "I use smart power strips to manage power usage",
        carbonFootprint: 10,
        treeEquivalent: 1,  // Minimum 1
        rank: 2,
        performance: "Very good - Smart power strips help automate savings",
        improvement:
          "Great Choice",
        explanation: "It helps reduce consumption",
      },
    ],
  },
  {
    id: 6,
    text: "What temperature do you typically set your air conditioning to in summer?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "25°C (77°F) or higher",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 1,
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
        rank: 2,
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
        rank: 3,
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
        rank: 4,
        performance: "High - Significant cooling energy consumption.",
        improvement:
          "20°C or lower is very energy-intensive. Raise it to save energy.",
        explanation:
          "20°C and below is highly energy-consuming for cooling, leading to a large carbon footprint.",
      },
      {
        id: 5,
        text: "I only use fans",
        carbonFootprint: 10,
        treeEquivalent: 1,    // Minimum 1
        rank: 1,
        performance: "Excellent - Very low energy cooling!",
        improvement: "Keep using them and enjoy the low energy cooling.",
        explanation:
          "Fans use minimal electricity compared to AC, making them a very sustainable option.",
      },
      {
        id: 6,
        text: "I don't use air conditioning",
        carbonFootprint: 0,
        treeEquivalent: 1,   // Minimum 1
        rank: 1,
        performance: "Excellent - Zero cooling energy!",
        improvement:
          "Best possible option! Avoiding AC saves maximum energy.",
        explanation:
          "Not using AC results in zero emissions from cooling, the most environmentally friendly approach.",
      },
    ],
  },
  {
    id: 7,
    text: "When purchasing new appliances, how important is the energy rating in your decision?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Very important - I always look for the most efficient models",
        carbonFootprint: 10,
        treeEquivalent: 1,   // Minimum 1
        rank: 1,
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
        rank: 2,
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
        rank: 3,
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
        rank: 4,
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
        rank: 5,
        performance: "Lower - Not considering energy efficiency.",
        improvement:
          "Start looking for Energy Star and similar labels - it's easy!",
        explanation:
          "Not checking energy labels means you are missing out on a simple way to choose more sustainable appliances.",
      },
      {
        id: 6,
        text: "I try to repair appliances to extend their life",
        carbonFootprint: 5,
        treeEquivalent: 1,  // Minimum 1
        rank: 1,
        performance: "Excellent = repair saves more",
        improvement:
          "Good",
        explanation: "Repair is the best way",
      },
    ],
  },
  {
    id: 8,
    text: "How many hours per day do you spend on electronic devices?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Less than 2 hours",
        carbonFootprint: 10,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.5)
        rank: 1,
        performance: "Excellent - Minimal screen time!",
        improvement: "Keep up the low screen time!",
        explanation: "Low screen time means lower energy consumption from devices.",
      },
      {
        id: 2,
        text: "2-4 hours",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 2,
        performance: "Good - Moderate screen time.",
        improvement: "Try to be mindful of device usage and power-saving settings.",
        explanation: "Moderate screen time has a moderate energy impact.",
      },
      {
        id: 3,
        text: "4-6 hours",
        carbonFootprint: 40,
        treeEquivalent: 2,
        rank: 3,
        performance: "Moderate - Noticeable energy use.",
        improvement: "Consider reducing screen time or using devices more efficiently.",
        explanation: "4-6 hours of screen time increases energy consumption.",
      },
      {
        id: 4,
        text: "6-8 hours",
        carbonFootprint: 60,
        treeEquivalent: 3,
        rank: 4,
        performance: "Higher energy use - Significant screen time.",
        improvement: "Try to reduce screen time and unplug devices when not in use.",
        explanation: "6-8 hours of screen time has a considerable energy impact.",
      },
      {
        id: 5,
        text: "More than 8 hours",
        carbonFootprint: 80,
        treeEquivalent: 4,
        rank: 5,
        performance: "High energy use - Extensive screen time.",
        improvement: "Reduce screen time significantly to lower your footprint.",
        explanation:
          "More than 8 hours of screen time results in high energy consumption from devices.",
      },
      {
        id: 6,
        text: "I use power-saving modes on my devices",
        carbonFootprint: 15,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.7)
        rank: 2,
        performance: "Very good - Power Saving mode saves a lot",
        improvement: "Good Choice",
        explanation:
          "It helps to reduce wastage of energy",
      },
    ],
  },
  {
    id: 9,
    text: "How do you typically transport your groceries home?",
    requiresDistance: true,
    options: [
      {
        id: 1,
        text: "Walk or cycle",
        carbonFootprint: 0,
        treeEquivalent: 1,   // Minimum 1
        rank: 1,
        performance: "Excellent - Zero-emission grocery transport!",
        improvement: "Keep up the fantastic work!",
        explanation:
          "Walking or cycling for groceries is the most sustainable option.",
      },
      {
        id: 2,
        text: "Public transport",
        carbonFootprint: 20,
        treeEquivalent: 1,
        rank: 2,
        performance: "Good - Efficient shared transport.",
        improvement: "Combine with reusable bags for even better impact.",
        explanation: "Public transport is much more efficient than driving alone.",
      },
      {
        id: 3,
        text: "Electric car (EV)",
        carbonFootprint: 30,
        treeEquivalent: 2,  // Adjusted from 1.5
        rank: 3,
        performance: "Better - Lower emission car travel.",
        improvement: "Charge with renewable energy for maximum benefit.",
        explanation:
          "Electric cars have zero tailpipe emissions, a significant improvement for short trips.",
      },
      {
        id: 4,
        text: "Gasoline car",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 4,
        performance: "Moderate - Car trips for groceries add up.",
        improvement: "Combine trips or consider alternatives for shorter distances.",
        explanation: "Gasoline car trips, even short ones, contribute to emissions.",
      },
      {
        id: 5,
        text: "I get groceries delivered",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 3,
        performance: "Moderate - Delivery impact depends on efficiency.",
        improvement:
          "Choose delivery services with efficient routing and sustainable practices.",
        explanation:
          "Grocery delivery can be efficient or inefficient, depending on the service.",
      },
      {
        id: 6,
        text: "I use reusable bags",
        carbonFootprint: 5,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.2)
        rank: 2,
        performance: "Good - Every bag counts",
        improvement:
          "Reusable bags always a good option",
        explanation: "Using these reduces unneccesary waste",
      },
    ],
  },
  {
    id: 10,
    text: "How do you typically sort your household waste?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "I separate recyclables, compost, and trash",
        carbonFootprint: 10,
        treeEquivalent: 1,   // Minimum 1
        rank: 1,
        performance: "Excellent - Comprehensive waste sorting!",
        improvement: "Keep up the fantastic waste management!",
        explanation:
          "Separating waste streams maximizes recycling and composting, minimizing landfill waste.",
      },
      {
        id: 2,
        text: "I separate recyclables and trash",
        carbonFootprint: 30,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Separating recyclables is crucial.",
        improvement: "Consider adding composting if possible.",
        explanation:
          "Separating recyclables from trash significantly reduces landfill waste.",
      },
      {
        id: 3,
        text: "I sometimes separate recyclables",
        carbonFootprint: 60,
        treeEquivalent: 2,
        rank: 3,
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
        rank: 4,
        performance: "Wasteful - All waste goes to landfill.",
        improvement: "Start separating recyclables immediately to reduce your impact.",
        explanation:
          "Not separating waste means valuable materials end up in landfills unnecessarily.",
      },
      {
        id: 5,
        text: "I compost food scraps and yard waste",
        carbonFootprint: 15,
        treeEquivalent: 1,  // Minimum 1 (adjusted from 0.5)
        rank: 2,
        performance: "Very good",
        improvement: "Excellent option",
        explanation: "It is a great way to manage waste",
      },
      {
          id: 6,
          text: "My waste management is handled by my building/community",
          carbonFootprint: 50,
          treeEquivalent: 2,
          rank: 3,
          performance: "Moderate - Depends on your building's waste management system.",
          improvement: "Inquire about your building's waste sorting and recycling practices.",
          explanation: "Your impact depends on the effectiveness of your building's system. Advocate for better practices if needed."
      }
    ],
  },
];