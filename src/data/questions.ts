import { Option } from "../types"; // Keep Option import as it might be in a separate types file, or remove if Option is also in this file

export interface Question {
  id: number;
  text: string;
  options: Option[];
  requiresDistance: boolean;  // Required property for distance input
}

export const questions: Question[] = [
  {
    id: 1,
    text: "To start your day, how do you usually commute to work or your main destination?",
    requiresDistance: true,
    options: [
      {
        id: 1,
        text: "I walk - it's close by!",
        icon: "Footprints",
        image: "",
        carbonFootprint: 0,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Zero-emission start to the day!",
        improvement:
          "Walking is the most sustainable commute. Keep it up and enjoy the fresh air and exercise!",
        explanation:
          "Walking produces zero emissions and is fantastic for short commutes. It's healthy, free, and reduces traffic congestion and air pollution.",
      },
      {
        id: 2,
        text: "I cycle - a healthy ride!",
        icon: "Bike",
        image: "",
        carbonFootprint: 0,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Sustainable and healthy commute!",
        improvement:
          "Cycling is a top-tier sustainable option. Keep pedaling for a zero-emission, fitness-boosting commute.",
        explanation:
          "Cycling, like walking, is emission-free and a great way to commute. It's good for your health, reduces traffic noise, and is a sustainable choice for urban areas.",
      },
      {
        id: 3,
        text: "Public transport (bus, tram, subway)",
        icon: "Bus",
        image: "",
        carbonFootprint: 100, // Public transport commute - Adjusted based on data and daily commute context
        treeEquivalent: 4,
        rank: 3,
        performance: "Good - Efficient shared travel.",
        improvement:
          "Public transport is a solid choice. Consider off-peak travel to help with crowding and efficiency.",
        explanation:
          "Public transport is much more efficient than individual cars. Sharing transport reduces per-person emissions and supports sustainable urban mobility.",
      },
      {
        id: 4,
        text: "Train - efficient for longer distances",
        icon: "Train",
        image: "",
        carbonFootprint: 75, // Train commute - Adjusted based on data and commute context
        treeEquivalent: 3,
        rank: 2,
        performance: "Very Good - Efficient for longer commutes.",
        improvement:
          "Trains are great, especially for longer commutes. Electric trains are even better for the environment.",
        explanation:
          "Trains, especially electric, are highly efficient for commuting longer distances, using less energy per passenger than cars.",
      },
      {
        id: 5,
        text: "Electric car (EV)",
        icon: "Car",
        image: "",
        carbonFootprint: 150, // EV commute - Adjusted based on data and commute context
        treeEquivalent: 6,
        rank: 4,
        performance: "Better - Lower emission car travel.",
        improvement:
          "EVs reduce direct emissions. Charge with renewable energy for maximum benefit.",
        explanation:
          "Electric cars have zero tailpipe emissions, a significant improvement over gasoline cars. Their footprint depends on the electricity source, renewables make them much greener.",
      },
      {
        id: 6,
        text: "Gasoline car (personal vehicle)",
        icon: "Car",
        image: "",
        carbonFootprint: 800, // Gasoline car commute - Adjusted based on data and commute context
        treeEquivalent: 36,
        rank: 5,
        performance: "Moderate - Standard car commute emissions.",
        improvement:
          "Consider alternatives for shorter commutes. Carpooling or public transport could reduce your impact.",
        explanation:
          "Gasoline cars are a major source of emissions. Reducing car use, especially for commuting, is key to lowering your carbon footprint.",
      },
      {
        id: 7,
        text: "Motorcycle or scooter",
        icon: "Bike",
        image: "",
        carbonFootprint: 400, // Motorcycle/Scooter commute - Adjusted based on data and commute context
        treeEquivalent: 18,
        rank: 5,
        performance: "Moderate - Still emits carbon.",
        improvement:
          "More fuel-efficient than cars, but still fossil fuel-based. Electric versions or cycling are better.",
        explanation:
          "Motorcycles and scooters are less polluting than cars but still contribute to emissions. Electric models are a more sustainable alternative.",
      },
      {
        id: 8,
        text: "Ride-sharing service (gasoline car)",
        icon: "Car",
        image: "",
        carbonFootprint: 1200, // Ride-sharing commute - Adjusted based on data and commute context
        treeEquivalent: 54,
        rank: 6,
        performance: "Lower - Less efficient car sharing.",
        improvement:
          "Ride-sharing can be less efficient due to detours. Consider more sustainable options if possible.",
        explanation:
          "Ride-sharing in gasoline cars can increase vehicle miles traveled and emissions compared to more direct transport methods.",
      },
    ],
  },
  {
    id: 2,
    text: "In the summer, what temperature do you usually set your home thermostat to for cooling?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "25°C (77°F) or higher - keeping it warm and efficient",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 1,
        performance: "Excellent - Highly energy-saving cooling!",
        improvement:
          "Fantastic! Keeping your thermostat high saves significant energy. Fans can help with comfort at warmer settings.",
        explanation:
          "Setting your thermostat high in summer minimizes AC use and energy consumption, drastically reducing your carbon footprint.",
      },
      {
        id: 2,
        text: "24°C (75°F) - a comfortable energy-conscious setting",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 75,
        treeEquivalent: 3,
        rank: 2,
        performance: "Very Good - Energy-conscious cooling.",
        improvement:
          "Very energy-conscious! Consider raising it a degree higher for even more savings.",
        explanation:
          "24°C is an energy-saving setting for summer. It balances comfort with reduced energy demand and emissions.",
      },
      {
        id: 3,
        text: "23°C (73°F) - reasonable balance of comfort and saving",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 125,
        treeEquivalent: 6,
        rank: 3,
        performance: "Good - Reasonable energy saving cooling.",
        improvement:
          "A good balance, but raising it slightly would increase savings without much comfort change.",
        explanation:
          "23°C is reasonably efficient, but cooling still consumes energy. Higher settings offer more potential for savings.",
      },
      {
        id: 4,
        text: "22°C (72°F) - average cooling temperature",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 200,
        treeEquivalent: 9,
        rank: 4,
        performance: "Moderate - Average cooling temperature.",
        improvement:
          "Common, but on the higher side for energy use. Lowering it would save noticeable energy.",
        explanation:
          "22°C is average but not optimized for efficiency. Lowering the temperature increases energy use and your carbon footprint.",
      },
      {
        id: 5,
        text: "21°C (70°F) - starting to use more cooling energy",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 300,
        treeEquivalent: 14,
        rank: 5,
        performance: "Higher - Increased cooling energy use.",
        improvement:
          "21°C and below significantly increases energy use. Raise it to save substantially.",
        explanation:
          "21°C and lower requires considerable energy for cooling, increasing your environmental impact.",
      },
      {
        id: 6,
        text: "20°C (68°F) or lower - high cooling energy consumption",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 400,
        treeEquivalent: 18,
        rank: 6,
        performance: "High - Significant cooling energy consumption.",
        improvement:
          "20°C or lower is very energy-intensive. Drastically raise it to save energy and reduce your footprint.",
        explanation:
          "20°C and below is highly energy-consuming for cooling, leading to a large carbon footprint.",
      },
      {
        id: 7,
        text: "I only use fans to keep cool",
        icon: "Fan",
        image: "",
        carbonFootprint: 10,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Very low energy cooling!",
        improvement:
          "Fans are super energy-efficient! Keep using them and enjoy the low energy cooling.",
        explanation:
          "Fans use minimal electricity compared to AC, making them a very sustainable and low-carbon cooling option.",
      },
      {
        id: 8,
        text: "I don't use air conditioning at all",
        icon: "Thermometer",
        image: "",
        carbonFootprint: 0,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Zero cooling energy!",
        improvement:
          "Best possible option! Avoiding AC saves maximum energy and eliminates cooling emissions.",
        explanation:
          "Not using AC results in zero emissions from cooling, the most environmentally friendly approach.",
      },
    ],
  },
  {
    id: 3,
    text: "How often do you typically eat vegetarian or vegan meals (without meat or fish) in a week?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Every day - I'm vegan/vegetarian",
        icon: "Salad",
        image: "",
        carbonFootprint: 50, // Vegan/Vegetarian diet - Low annual impact
        treeEquivalent: 2,
        rank: 1,
        performance: "Excellent - Lowest carbon diet!",
        improvement:
          "Eating plant-based every day is the most sustainable dietary choice. Keep enjoying the benefits for your health and the planet!",
        explanation:
          "Vegan and vegetarian diets have the lowest carbon footprint, significantly reducing emissions from food production.",
      },
      {
        id: 2,
        text: "Most days - 5-6 days a week",
        icon: "Salad",
        image: "",
        carbonFootprint: 150, // Mostly vegetarian - Very good reduction
        treeEquivalent: 7,
        rank: 2,
        performance: "Very Good - Significantly reducing meat intake.",
        improvement:
          "Eating plant-based most days is excellent. You're making a big difference by reducing meat consumption.",
        explanation:
          "Reducing meat consumption to just a few days a week greatly lowers your dietary carbon footprint.",
      },
      {
        id: 3,
        text: "A few times a week - 2-4 days",
        icon: "Salad",
        image: "",
        carbonFootprint: 300, // Few times a week vegetarian - Good step
        treeEquivalent: 14,
        rank: 3,
        performance: "Good - Making a positive shift.",
        improvement:
          "Eating plant-based a few times a week is a good step. Try increasing it to most days for greater impact.",
        explanation:
          "Including plant-based meals a few times a week is a positive change, reducing your reliance on carbon-intensive animal products.",
      },
      {
        id: 4,
        text: "Rarely - less than once a week",
        icon: "Drumstick",
        image: "",
        carbonFootprint: 600, // Rarely vegetarian - Moderate meat consumption
        treeEquivalent: 27,
        rank: 4,
        performance: "Moderate - Room for dietary improvement.",
        improvement:
          "Rarely eating plant-based meals means there's room to reduce your dietary footprint. Try incorporating more plant-based meals each week.",
        explanation:
          "Eating plant-based meals rarely means your diet is likely more carbon-intensive. Increasing plant-based meals can significantly reduce your impact.",
      },
      {
        id: 5,
        text: "Never - I eat meat or fish daily",
        icon: "Beef",
        image: "",
        carbonFootprint: 1000, // Daily meat/fish - Higher carbon diet
        treeEquivalent: 45,
        rank: 6,
        performance: "Lower - Higher carbon dietary footprint.",
        improvement:
          "Eating meat or fish daily results in a higher carbon footprint. Consider reducing meat intake and exploring plant-based alternatives.",
        explanation:
          "Daily consumption of meat and fish contributes significantly to a higher carbon footprint due to animal agriculture's emissions.",
      },
      {
        id: 6,
        text: "I'm trying to reduce meat, but it's a process",
        icon: "Carrot",
        image: "",
        carbonFootprint: 400, // Trying to reduce meat - Positive intention, mid-range
        treeEquivalent: 18,
        rank: 3,
        performance: "Good - Positive intention to reduce meat.",
        improvement:
          "Great you're trying to reduce meat! Every step counts. Gradually increase plant-based meals each week.",
        explanation:
          "Intentionally reducing meat consumption is a positive step, even if gradual, towards a more sustainable diet.",
      },
      {
        id: 7,
        text: "I eat plant-based when eating out, but not always at home",
        icon: "Salad",
        image: "",
        carbonFootprint: 350, // Plant-based eating out - Mixed approach
        treeEquivalent: 16,
        rank: 3,
        performance: "Good - Conscious choices when eating out.",
        improvement:
          "Good to choose plant-based when eating out. Try extending this to more meals at home too.",
        explanation:
          "Choosing plant-based when eating out is a conscious effort. Extending this to home meals can further reduce your footprint.",
      },
      {
        id: 8,
        text: "I'm not sure / I don't track my diet",
        icon: "Question",
        image: "",
        carbonFootprint: 500, // Unsure diet - Assuming average diet, room for awareness
        treeEquivalent: 23,
        rank: 4,
        performance: "Moderate - Consider reflecting on your diet.",
        improvement:
          "If unsure, take a moment to think about your typical meals. Awareness is the first step to making changes.",
        explanation:
          "Being unsure suggests an opportunity to become more aware of your dietary habits and their environmental impact.",
      },
    ],
  },
  {
    id: 4,
    text: "When washing clothes at home, what water temperature do you typically select?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Always cold water - for every load",
        icon: "Droplet",
        image: "",
        carbonFootprint: 10,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Maximizing laundry energy savings!",
        improvement:
          "Perfect! Cold water washing is the most energy-efficient way to do laundry. Keep it up!",
        explanation:
          "Cold water washing saves significant energy, as heating water is the biggest energy draw in laundry. It's also gentler on clothes.",
      },
      {
        id: 2,
        text: "Mostly cold water - sometimes warm for heavily soiled items",
        icon: "Droplet",
        image: "",
        carbonFootprint: 30,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Mostly energy-saving washing.",
        improvement:
          "Very good! Try cold water even for most soiled items with modern detergents for even more savings.",
        explanation:
          "Mostly using cold water is excellent. Reducing warm water use minimizes energy for water heating in laundry.",
      },
      {
        id: 3,
        text: "Sometimes cold water - depends on fabric or load type",
        icon: "Droplet",
        image: "",
        carbonFootprint: 60,
        treeEquivalent: 3,
        rank: 3,
        performance: "Good - Occasional cold water use.",
        improvement:
          "Good start! Try to increase cold water washes. It's effective for many fabric types and soil levels.",
        explanation:
          "Using cold water sometimes is better than never, but increasing frequency maximizes energy savings.",
      },
      {
        id: 4,
        text: "Rarely cold water - mostly warm washes",
        icon: "Droplet",
        image: "",
        carbonFootprint: 90,
        treeEquivalent: 4,
        rank: 4,
        performance: "Moderate - Infrequent cold water washing.",
        improvement:
          "Rarely using cold water means missed energy savings. Warm water uses more energy unnecessarily for most laundry.",
        explanation:
          "Warm water washing consumes significantly more energy than cold water, increasing your laundry's carbon footprint.",
      },
      {
        id: 5,
        text: "Mostly warm water - my standard setting",
        icon: "Droplet",
        image: "",
        carbonFootprint: 120,
        treeEquivalent: 5,
        rank: 5,
        performance: "Lower - Higher energy use for laundry.",
        improvement:
          "Warm water is energy-intensive. Switching to cold water for most loads will save a lot of energy.",
        explanation:
          "Primarily using warm water for laundry is a significant energy consumer. Cold water is just as effective for most washes with modern detergents.",
      },
      {
        id: 6,
        text: "Always hot or warm water - for all loads",
        icon: "Droplet",
        image: "",
        carbonFootprint: 150,
        treeEquivalent: 7,
        rank: 6,
        performance: "Lowest - Highest energy use laundry practice.",
        improvement:
          "Hot/warm water always is most energy-intensive. Switch to cold water immediately for massive energy savings.",
        explanation:
          "Always using hot or warm water is the least energy-efficient laundry practice, significantly increasing your carbon footprint.",
      },
      {
        id: 7,
        text: "I use a laundromat and don't control the water temperature",
        icon: "Droplet",
        image: "",
        carbonFootprint: 70,
        treeEquivalent: 3,
        rank: 3,
        performance: "Good - Limited control over water temp.",
        improvement:
          "Inquire if laundromats offer cold water options. Choosing one that does reduces your laundry impact.",
        explanation:
          "Laundromats often use warmer water. Finding one with cold water options helps reduce the energy footprint of your laundry.",
      },
      {
        id: 8,
        text: "I hand wash most clothes",
        icon: "Droplet",
        image: "",
        carbonFootprint: 20,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Often energy-saving hand washing.",
        improvement:
          "Hand washing is often energy-saving. Ensure you're using cold water for maximum benefit.",
        explanation:
          "Hand washing can be very energy-efficient, especially with cold water and air drying, reducing reliance on machines.",
      },
    ],
  },
  {
    id: 5,
    text: "When you're done with a room for a while, do you remember to turn off the lights?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Always - it's a habit!",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 10, // Always turn off lights - Minimal energy waste
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Top energy-saving habit!",
        improvement:
          "Perfect habit! Always turning off lights is a simple yet powerful way to save energy.",
        explanation:
          "Turning off lights when leaving a room consistently minimizes electricity waste and lowers your energy footprint.",
      },
      {
        id: 2,
        text: "Usually - most of the time I remember",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 20, // Usually turn off lights - Very good, but some waste
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Mostly remembering to save energy.",
        improvement:
          "Very good, but strive for 'always' to maximize savings. Make it a conscious effort each time.",
        explanation:
          "Usually turning off lights is commendable. Making it a consistent habit further reduces energy consumption.",
      },
      {
        id: 3,
        text: "Sometimes - if I think about it",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 50, // Sometimes turn off lights - Moderate waste
        treeEquivalent: 2,
        rank: 3,
        performance: "Good - Occasional energy saving.",
        improvement:
          "Good you think about it sometimes. Try to make it a more automatic habit.",
        explanation:
          "Turning off lights sometimes is better than never, but more consistency leads to greater energy savings.",
      },
      {
        id: 4,
        text: "Rarely - I often forget",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 100, // Rarely turn off lights - Higher energy waste
        treeEquivalent: 4,
        rank: 4,
        performance: "Moderate energy waste - Often forgetting.",
        improvement:
          "Rarely turning off lights means wasted energy. Try setting reminders or making it a conscious action.",
        explanation:
          "Forgetting to turn off lights wastes energy and increases your electricity bill unnecessarily.",
      },
      {
        id: 5,
        text: "Never - lights are often left on",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 150, // Never turn off lights - Highest lighting energy waste
        treeEquivalent: 6,
        rank: 6,
        performance: "Wasteful - Consistently leaving lights on.",
        improvement:
          "Always leaving lights on is very wasteful. Make a conscious effort to switch them off every time you leave a room.",
        explanation:
          "Never turning off lights leads to significant energy waste and a higher carbon footprint from your home lighting.",
      },
      {
        id: 6,
        text: "I use energy-efficient LED bulbs",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 30, // LED bulbs - Reduced lighting energy, but habit still matters
        treeEquivalent: 1,
        rank: 3,
        performance: "Good - Using efficient lighting.",
        improvement:
          "LEDs are great, but still turn them off when you leave! Even efficient lights waste energy when left on unnecessarily.",
        explanation:
          "LED bulbs are energy-efficient, but energy waste still occurs if lights are left on in empty rooms.",
      },
      {
        id: 7,
        text: "I have motion sensor lights in some areas",
        icon: "LightBulb",
        image: "",
        carbonFootprint: 20, // Motion sensor lights - Good for automated saving
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Utilizing smart lighting tech.",
        improvement:
          "Motion sensors help, but manual switch-offs are still important, especially in frequently used rooms.",
        explanation:
          "Motion sensors automate energy saving but aren't foolproof. Manual switch-offs add to efficiency.",
      },
      {
        id: 8,
        text: "Natural light is usually enough during the day",
        icon: "Sun",
        image: "",
        carbonFootprint: 5, // Maximize natural light - Minimal lighting energy use
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Maximizing natural light!",
        improvement:
          "Excellent! Using natural light reduces reliance on electric lighting and saves energy. Keep maximizing daylight!",
        explanation:
          "Using natural light is the most sustainable lighting strategy, minimizing electricity use and emissions.",
      },
    ],
  },
  {
    id: 6,
    text: "When cooking at home, which type of appliance do you most often use?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Microwave - quick and energy-efficient for small portions",
        icon: "Microwave",
        image: "",
        carbonFootprint: 20, // Microwave cooking - Low energy for small portions
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Efficient for reheating and small meals.",
        improvement:
          "Microwaves are great for efficiency. For larger meals, consider energy-efficient stovetops or ovens.",
        explanation:
          "Microwaves are generally very energy-efficient, especially for reheating and cooking smaller portions quickly.",
      },
      {
        id: 2,
        text: "Electric or Induction stovetop - efficient and clean",
        icon: "Flame",
        image: "",
        carbonFootprint: 100, // Electric/Induction cooking - Mid-range, depends on source
        treeEquivalent: 4,
        rank: 3,
        performance: "Good - Electric cooking, depending on energy source.",
        improvement:
          "Electric and induction stovetops are good, especially with renewable energy. Ensure efficient cookware use.",
        explanation:
          "Electric and induction stovetops are more energy-efficient than coil stoves and can be sustainable with clean energy sources.",
      },
      {
        id: 3,
        text: "Gas stovetop - common but fossil fuel based",
        icon: "Flame",
        image: "",
        carbonFootprint: 200, // Gas stovetop cooking - Fossil fuel use
        treeEquivalent: 9,
        rank: 4,
        performance: "Moderate - Natural gas is a fossil fuel.",
        improvement:
          "Gas is fossil fuel-based. Consider switching to electric or induction over time.",
        explanation:
          "Gas stovetops directly burn fossil fuels, contributing to greenhouse gas emissions. Electric options are cleaner with renewable energy.",
      },
      {
        id: 4,
        text: "Electric oven - for baking and larger meals",
        icon: "Oven",
        image: "",
        carbonFootprint: 250, // Electric oven cooking - Higher energy for larger meals
        treeEquivalent: 11,
        rank: 5,
        performance: "Moderate - Oven use consumes more energy.",
        improvement:
          "Ovens use more energy. Use efficiently - cook larger batches, avoid preheating unnecessarily.",
        explanation:
          "Electric ovens consume more energy, especially for longer cooking times. Efficient use is key to minimizing their footprint.",
      },
      {
        id: 5,
        text: "Gas oven - fossil fuel based for baking",
        icon: "Oven",
        image: "",
        carbonFootprint: 300, // Gas oven cooking - Fossil fuel oven use
        treeEquivalent: 14,
        rank: 6,
        performance: "Lower - Gas ovens have a notable footprint.",
        improvement:
          "Gas ovens burn fossil fuels. Electric ovens with renewables are a better long-term option.",
        explanation:
          "Gas ovens, like stovetops, directly contribute to emissions by burning fossil fuels. Electric options are cleaner.",
      },
      {
        id: 6,
        text: "Slow cooker or pressure cooker - energy-efficient for certain dishes",
        icon: "Pot",
        image: "",
        carbonFootprint: 40, // Slow/Pressure cooker - Energy efficient cooking
        treeEquivalent: 2,
        rank: 2,
        performance: "Very Good - Energy-efficient cooking methods.",
        improvement:
          "Excellent choices for efficiency! Keep using slow and pressure cookers for suitable meals.",
        explanation:
          "Slow cookers and pressure cookers are very energy-efficient for certain types of cooking, using less energy than ovens.",
      },
      {
        id: 7,
        text: "I mostly eat raw or cold meals - minimal cooking needed",
        icon: "Salad",
        image: "",
        carbonFootprint: 10, // Raw/Cold meals - Minimal cooking energy
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Minimal cooking energy use!",
        improvement:
          "Best for energy saving! Eating raw/cold meals minimizes cooking energy to almost zero.",
        explanation:
          "Raw or cold meals require minimal to no cooking, resulting in the lowest possible energy footprint for meal prep.",
      },
      {
        id: 8,
        text: "I don't usually cook at home",
        icon: "MinusCircle",
        image: "",
        carbonFootprint: 0,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Zero home cooking energy!",
        improvement:
          "If you don't cook at home, you're at zero energy use for home cooking! Be mindful of food sourcing when eating out.",
        explanation:
          "Not cooking at home eliminates energy consumption from home cooking appliances.",
      },
    ],
  },
  {
    id: 7,
    text: "While brushing your teeth, do you turn off the water tap?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Always - water off while brushing every time",
        icon: "Droplet",
        image: "",
        carbonFootprint: 1,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Top water conservation practice!",
        improvement:
          "Perfect! Always turning off the tap is the best way to save water while brushing.",
        explanation:
          "Turning off the tap while brushing saves significant amounts of treated water, reducing water waste.",
      },
      {
        id: 2,
        text: "Usually - water off most of the time",
        icon: "Droplet",
        image: "",
        carbonFootprint: 3,
        treeEquivalent: 0,
        rank: 2,
        performance: "Very Good - Mostly conserving water.",
        improvement:
          "Very good, but aim for 'always' to maximize water savings. Make it a consistent habit.",
        explanation:
          "Usually turning off the tap is a great step. Making it a consistent habit maximizes water conservation.",
      },
      {
        id: 3,
        text: "Sometimes - if I remember",
        icon: "Droplet",
        image: "",
        carbonFootprint: 8,
        treeEquivalent: 0,
        rank: 3,
        performance: "Good - Occasional water saving.",
        improvement:
          "Good you remember sometimes. Try to be more consistent and turn it off every time.",
        explanation:
          "Turning off the tap sometimes is better than never, but consistency is key for effective water saving.",
      },
      {
        id: 4,
        text: "Rarely - I usually leave it running",
        icon: "Droplet",
        image: "",
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
        text: "Never - I always leave the water running",
        icon: "Droplet",
        image: "",
        carbonFootprint: 25,
        treeEquivalent: 1,
        rank: 6,
        performance: "Wasteful practice - Always leaving tap running.",
        improvement:
          "Always leaving the tap running is very wasteful. Start turning it off immediately to save water.",
        explanation:
          "Never turning off the tap is the most water-wasteful practice, wasting significant amounts of clean water.",
      },
      {
        id: 6,
        text: "I use very little water to brush anyway",
        icon: "Droplet",
        image: "",
        carbonFootprint: 5,
        treeEquivalent: 0,
        rank: 2,
        performance: "Good - Minimal water use for brushing.",
        improvement:
          "Using little water is good, but turning off the tap entirely is still the best practice.",
        explanation:
          "Even with minimal water use, turning off the tap completely eliminates water waste during brushing.",
      },
      {
        id: 7,
        text: "I use a cup to rinse - limiting water flow",
        icon: "Droplet",
        image: "",
        carbonFootprint: 2,
        treeEquivalent: 0,
        rank: 2,
        performance: "Very Good - Efficient rinsing with a cup.",
        improvement:
          "Using a cup is a great way to control water use for rinsing. Keep it up!",
        explanation:
          "Using a cup for rinsing is a water-efficient method, limiting water use to only what's needed.",
      },
      {
        id: 8,
        text: "I'm not sure / I haven't thought about it",
        icon: "Question",
        image: "",
        carbonFootprint: 10, // Not sure brushing water - Assuming average water use, room for awareness
        treeEquivalent: 0,
        rank: 3,
        performance: "Good - Consider your water use habits.",
        improvement:
          "Take a moment to think about your brushing habits. Even small changes can save water.",
        explanation:
          "Being unsure is a chance to become more mindful of your water usage during daily routines like brushing.",
      },
    ],
  },
  {
    id: 8,
    text: "When buying new electronics, how often do you prioritize energy efficiency ratings (like Energy Star)?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Always - energy efficiency is a top priority for me",
        icon: "Battery",
        image: "",
        carbonFootprint: 10,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Always prioritizing energy efficiency!",
        improvement:
          "Fantastic! Always choosing energy-efficient electronics is a top way to reduce your footprint.",
        explanation:
          "Prioritizing energy efficiency ensures lower energy consumption over the product's lifespan, saving energy and money.",
      },
      {
        id: 2,
        text: "Usually - I mostly look for energy-efficient models",
        icon: "Battery",
        image: "",
        carbonFootprint: 20,
        treeEquivalent: 1,
        rank: 2,
        performance: "Very Good - Mostly prioritizing efficiency.",
        improvement:
          "Very good, but aim for 'always' for maximum impact. Make efficiency a key decision factor.",
        explanation:
          "Mostly choosing energy-efficient electronics is a strong commitment to sustainability. Striving for 'always' maximizes benefits.",
      },
      {
        id: 3,
        text: "Sometimes - if the price difference isn't too much",
        icon: "Battery",
        image: "",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 3,
        performance: "Good - Considering efficiency occasionally.",
        improvement:
          "Good you consider it sometimes. Think long-term - energy savings often outweigh a small price increase.",
        explanation:
          "Considering efficiency when prices are similar is a start, but long-term savings make it worthwhile even with a slight premium.",
      },
      {
        id: 4,
        text: "Rarely - features and price are more important to me",
        icon: "Battery",
        image: "",
        carbonFootprint: 100,
        treeEquivalent: 4,
        rank: 4,
        performance: "Moderate - Lower priority for efficiency.",
        improvement:
          "Rarely prioritizing efficiency means missed energy savings. Start considering energy labels more often.",
        explanation:
          "Ignoring energy efficiency can lead to higher energy bills and a larger environmental impact over the product's life.",
      },
      {
        id: 5,
        text: "Never - I don't usually check energy efficiency labels",
        icon: "Battery",
        image: "",
        carbonFootprint: 150,
        treeEquivalent: 6,
        rank: 6,
        performance: "Lower - Not considering energy efficiency at all.",
        improvement:
          "Never checking labels is a missed opportunity. Start looking for Energy Star and similar labels - it's easy!",
        explanation:
          "Not checking energy labels means you are missing out on a simple way to choose more sustainable electronics.",
      },
      {
        id: 6,
        text: "I prefer to buy second-hand electronics",
        icon: "RefreshCcw",
        image: "",
        carbonFootprint: 5,
        treeEquivalent: 0,
        rank: 2,
        performance: "Very Good - Sustainable second-hand choices.",
        improvement:
          "Buying second-hand is very sustainable! Keep choosing used electronics whenever possible.",
        explanation:
          "Second-hand purchases extend product lifespan, reducing demand for new manufacturing and lowering environmental impact.",
      },
      {
        id: 7,
        text: "I try to repair electronics to extend their life",
        icon: "Wrench",
        image: "",
        carbonFootprint: 2,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Prioritizing repair and longevity!",
        improvement:
          "Repairing is fantastic! Extending product life is key to reducing electronic waste.",
        explanation:
          "Repairing electronics instead of replacing them reduces waste and the environmental burden of manufacturing new products.",
      },
      {
        id: 8,
        text: "I don't buy new electronics very often",
        icon: "MinusCircle",
        image: "",
        carbonFootprint: 1,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Minimal consumption habits!",
        improvement:
          "Buying less is always the most sustainable choice. Keep minimizing your electronics consumption!",
        explanation:
          "Reducing overall consumption is the most effective way to lower your environmental impact across all product categories.",
      },
    ],
  },
  {
    id: 9,
    text: "When grocery shopping, how often do you actively look for locally sourced and seasonal fruits and vegetables?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Always - I prioritize local and seasonal produce",
        icon: "Home",
        image: "",
        carbonFootprint: 30,
        treeEquivalent: 1,
        rank: 1,
        performance: "Excellent - Top food sustainability practice!",
        improvement:
          "Outstanding! Always choosing local and seasonal is the best for sustainable food choices.",
        explanation:
          "Local and seasonal food minimizes transport emissions, supports local farmers, and often is fresher and more nutritious.",
      },
      {
        id: 2,
        text: "Usually - mostly local and seasonal when available",
        icon: "Home",
        image: "",
        carbonFootprint: 50,
        treeEquivalent: 2,
        rank: 2,
        performance: "Very Good - Mostly choosing local and seasonal.",
        improvement:
          "Very good! Aim for 'always' to maximize the benefits of local and seasonal food.",
        explanation:
          "Frequently choosing local and seasonal produce reduces food miles and supports sustainable agriculture.",
      },
      {
        id: 3,
        text: "Sometimes - if it's convenient or reasonably priced",
        icon: "Carrot",
        image: "",
        carbonFootprint: 100,
        treeEquivalent: 5,
        rank: 3,
        performance: "Good - Occasional local and seasonal choices.",
        improvement:
          "Good start! Try to prioritize local and seasonal even if it requires a bit more effort.",
        explanation:
          "Choosing local and seasonal sometimes is better than never, but more consistent choices have a greater impact.",
      },
      {
        id: 4,
        text: "Rarely - I buy what looks best or is cheapest, regardless of origin",
        icon: "Carrot",
        image: "",
        carbonFootprint: 150,
        treeEquivalent: 7,
        rank: 4,
        performance: "Moderate - Lower priority for local/seasonal.",
        improvement:
          "Rarely prioritizing local and seasonal means missed opportunities for sustainable food choices. Consider origin more often.",
        explanation:
          "Focusing only on appearance and price often means choosing produce with higher food miles and less sustainability.",
      },
      {
        id: 5,
        text: "Never - I don't pay attention to where my produce comes from",
        icon: "Carrot",
        image: "",
        carbonFootprint: 200,
        treeEquivalent: 9,
        rank: 5,
        performance: "Lower priority - Ignoring origin and seasonality.",
        improvement:
          "Never considering origin is a missed opportunity. Start paying attention to where your food comes from for a lower footprint.",
        explanation:
          "Ignoring origin means you're likely consuming produce with higher transport emissions and less local support.",
      },
      {
        id: 6,
        text: "I often buy frozen or canned produce for convenience",
        icon: "Apple",
        image: "",
        carbonFootprint: 120,
        treeEquivalent: 5,
        rank: 4,
        performance: "Moderate footprint - Processed produce impact.",
        improvement:
          "Frozen/canned is convenient, but prioritize fresh, local, and seasonal when possible for lower impact.",
        explanation:
          "Processed produce has a moderate footprint due to processing and packaging. Fresh, local, and seasonal is generally more sustainable.",
      },
      {
        id: 7,
        text: "I grow some of my own fruits and vegetables at home",
        icon: "Apple",
        image: "",
        carbonFootprint: 10,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Growing your own food!",
        improvement:
          "Growing your own is fantastic! Keep gardening and enjoy the freshest, lowest-impact produce.",
        explanation:
          "Homegrown produce has the lowest footprint, eliminating transport and packaging impacts.",
      },
      {
        id: 8,
        text: "I mostly eat out or get prepared meals",
        icon: "Salad",
        image: "",
        carbonFootprint: 180,
        treeEquivalent: 8,
        rank: 4,
        performance: "Moderate footprint - Origin of food often unknown.",
        improvement:
          "Eating out makes it harder to control sourcing. Choose restaurants that prioritize local and seasonal ingredients.",
        explanation:
          "Eating out often means less control over food sourcing. Support restaurants that value sustainability and local produce.",
      },
    ],
  },
  {
    id: 10,
    text: "Before discarding food scraps, do you typically compost them?",
    requiresDistance: false,
    options: [
      {
        id: 1,
        text: "Always - I compost all compostable food scraps at home",
        icon: "Recycle",
        image: "",
        carbonFootprint: 5,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Top waste reduction practice!",
        improvement:
          "Outstanding! Always composting is the best way to manage food waste sustainably.",
        explanation:
          "Composting diverts food waste from landfills, reducing methane emissions and creating valuable soil enrichment.",
      },
      {
        id: 2,
        text: "Usually - most scraps are composted, some unavoidable waste goes to trash",
        icon: "Recycle",
        image: "",
        carbonFootprint: 10,
        treeEquivalent: 0,
        rank: 2,
        performance: "Very Good - Mostly composting food waste.",
        improvement:
          "Very good! Aim for 'always' to maximize composting and minimize landfill waste.",
        explanation:
          "Mostly composting is a great step. Consistent composting significantly reduces landfill waste and methane emissions.",
      },
      {
        id: 3,
        text: "Sometimes - some scraps are composted, but a fair amount goes to trash",
        icon: "Trash2",
        image: "",
        carbonFootprint: 40,
        treeEquivalent: 2,
        rank: 3,
        performance: "Good - Occasional composting.",
        improvement:
          "Good you compost sometimes. Try to increase the amount and frequency to compost more.",
        explanation:
          "Composting sometimes is better than never, but more consistent composting is needed for greater impact.",
      },
      {
        id: 4,
        text: "Rarely - only compost if there's a large quantity of scraps",
        icon: "Trash2",
        image: "",
        carbonFootprint: 80,
        treeEquivalent: 4,
        rank: 4,
        performance: "Moderate waste - Infrequent composting.",
        improvement:
          "Rarely composting misses opportunities. Compost all suitable scraps, even small amounts, regularly.",
        explanation:
          "Composting even small amounts consistently reduces landfill waste and methane production.",
      },
      {
        id: 5,
        text: "Never - food scraps always go straight into the trash",
        icon: "Trash",
        image: "",
        carbonFootprint: 150,
        treeEquivalent: 7,
        rank: 6,
        performance: "Wasteful practice - Never composting.",
        improvement:
          "Never composting is very wasteful. Start composting immediately to reduce waste and environmental impact.",
        explanation:
          "Sending food scraps to landfills is the least sustainable option, leading to methane emissions and wasted resources.",
      },
      {
        id: 6,
        text: "I'm very mindful and don't generate much food waste",
        icon: "Apple",
        image: "",
        carbonFootprint: 10,
        treeEquivalent: 0,
        rank: 1,
        performance: "Excellent - Minimal food waste generation!",
        improvement:
          "Best case scenario! Minimizing food waste is even better than composting. Keep preventing waste at the source.",
        explanation:
          "Preventing food waste in the first place is the most effective way to reduce its environmental impact.",
      },
      {
        id: 7,
        text: "I use a garbage disposal unit for most food waste",
        icon: "Trash",
        image: "",
        carbonFootprint: 120,
        treeEquivalent: 5,
        rank: 4,
        performance:
          "Moderate footprint - Garbage disposal uses water & energy.",
        improvement:
          "Garbage disposals have an impact. Composting is generally more sustainable. Use disposal only for unavoidable waste.",
        explanation:
          "Garbage disposals increase the load on wastewater treatment and can still contribute to greenhouse gas emissions. Composting is a better option.",
      },
      {
        id: 8,
        text: "I live in an apartment without composting options",
        icon: "Trash",
        image: "",
        carbonFootprint: 140,
        treeEquivalent: 6,
        rank: 5,
        performance: "Limited options - Apartment composting challenges.",
        improvement:
          "Apartment composting can be challenging. Explore community programs or vermicomposting. Reduce food waste even without composting.",
        explanation:
          "Apartment living can limit composting, but reducing food waste and exploring alternative composting options are still valuable.",
      },
    ],
  },
];


