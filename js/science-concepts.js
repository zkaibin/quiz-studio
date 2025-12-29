/**
 * Science Concept Maps - Interactive learning tool
 * Based on Singapore Primary Science Syllabus 2021
 * Organized around 5 themes: Diversity, Cycles, Systems, Energy, Interactions
 */

const conceptMaps = {
  // THEME 1: DIVERSITY
  'diversity-living': {
    title: 'Theme: Diversity - Living Things',
    description: 'Living things are diverse and can be grouped based on their characteristics. They have basic needs and go through life cycles.',
    sections: [
      {
        heading: 'Characteristics of Living Things',
        content: `
          <ul class="concept-list">
            <li><strong>Movement:</strong> All living things can move or respond to stimuli</li>
            <li><strong>Respiration:</strong> Release energy from food (breathing)</li>
            <li><strong>Nutrition:</strong> Need food/nutrients for energy and growth</li>
            <li><strong>Growth:</strong> Increase in size and complexity</li>
            <li><strong>Reproduction:</strong> Produce offspring of the same kind</li>
            <li><strong>Excretion:</strong> Remove waste products from the body</li>
            <li><strong>Respond to environment:</strong> React to light, temperature, touch, etc.</li>
          </ul>
        `
      },
      {
        heading: 'Classification of Living Things',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Animals</h4>
              <p><strong>Vertebrates:</strong> Fish, amphibians, reptiles, birds, mammals<br>
              <strong>Invertebrates:</strong> Insects, spiders, worms, snails</p>
            </div>
            <div class="key-concept-card">
              <h4>Plants</h4>
              <p><strong>Flowering plants:</strong> Have flowers, fruits, seeds<br>
              <strong>Non-flowering:</strong> Ferns, mosses (use spores)</p>
            </div>
            <div class="key-concept-card">
              <h4>Fungi</h4>
              <p>Mushrooms, mold - decompose dead matter</p>
            </div>
            <div class="key-concept-card">
              <h4>Microorganisms</h4>
              <p>Bacteria, viruses - very small, need microscope</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Plant Parts and Functions',
        content: `
          <ul class="concept-list">
            <li><strong>Roots:</strong> Anchor plant, absorb water and minerals from soil</li>
            <li><strong>Stem:</strong> Support plant, transport water and nutrients</li>
            <li><strong>Leaves:</strong> Make food through photosynthesis, gas exchange</li>
            <li><strong>Flowers:</strong> Reproduction (produce seeds)</li>
            <li><strong>Fruits:</strong> Protect seeds, aid in seed dispersal</li>
          </ul>
          <div class="example-box">
            <strong>Photosynthesis:</strong> Plants use sunlight, carbon dioxide, and water to make glucose (food) and oxygen
          </div>
        `
      },
      {
        heading: 'Life Cycles',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Plants</h4>
              <p>Seed → Germination → Seedling → Mature Plant → Flowering → Pollination → Fruit & Seed Formation</p>
            </div>
            <div class="key-concept-card">
              <h4>Butterfly (Complete Metamorphosis)</h4>
              <p>Egg → Larva/Caterpillar → Pupa/Chrysalis → Adult</p>
            </div>
            <div class="key-concept-card">
              <h4>Cockroach (Incomplete Metamorphosis)</h4>
              <p>Egg → Nymph → Adult (no pupa stage)</p>
            </div>
            <div class="key-concept-card">
              <h4>Frog (Amphibian)</h4>
              <p>Egg → Tadpole → Tadpole with legs → Froglet → Adult Frog</p>
            </div>
          </div>
        `
      }
    ]
  },

  'diversity-materials': {
    title: 'Theme: Diversity - Materials',
    description: 'Materials have different properties that determine their uses. Understanding these properties helps us choose the right material for specific purposes.',
    sections: [
      {
        heading: 'Physical Properties of Materials',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Mass</h4>
              <p>Amount of matter in an object (measured in grams/kilograms)</p>
            </div>
            <div class="key-concept-card">
              <h4>Volume</h4>
              <p>Amount of space occupied (measured in cm³, liters)</p>
            </div>
            <div class="key-concept-card">
              <h4>Density</h4>
              <p>Mass per unit volume. Denser objects sink in less dense liquids</p>
            </div>
            <div class="key-concept-card">
              <h4>Hardness</h4>
              <p>Resistance to scratching or denting</p>
            </div>
            <div class="key-concept-card">
              <h4>Flexibility</h4>
              <p>Ability to bend without breaking</p>
            </div>
            <div class="key-concept-card">
              <h4>Strength</h4>
              <p>Ability to withstand force</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Thermal and Electrical Properties',
        content: `
          <div class="example-box">
            <strong>Thermal Conductors:</strong> Materials that allow heat to pass through easily (metals)
          </div>
          <div class="example-box">
            <strong>Thermal Insulators:</strong> Materials that slow down heat transfer (wood, plastic, air)
          </div>
          <div class="example-box">
            <strong>Electrical Conductors:</strong> Allow electricity to flow (metals, graphite)
          </div>
          <div class="example-box">
            <strong>Electrical Insulators:</strong> Block electricity (rubber, plastic, glass)
          </div>
        `
      },
      {
        heading: 'Magnetic Properties',
        content: `
          <ul class="concept-list">
            <li><strong>Magnetic materials:</strong> Iron, steel, nickel, cobalt</li>
            <li><strong>Non-magnetic:</strong> Aluminum, copper, plastic, wood, glass, paper</li>
            <li><strong>Poles:</strong> Every magnet has North and South poles</li>
            <li><strong>Attraction:</strong> Opposite poles attract (N-S)</li>
            <li><strong>Repulsion:</strong> Like poles repel (N-N or S-S)</li>
          </ul>
        `
      },
      {
        heading: 'States of Matter',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Solid</h4>
              <p>Fixed shape, fixed volume<br>Particles tightly packed, vibrate in place</p>
            </div>
            <div class="key-concept-card">
              <h4>Liquid</h4>
              <p>No fixed shape, fixed volume<br>Particles close but can move past each other</p>
            </div>
            <div class="key-concept-card">
              <h4>Gas</h4>
              <p>No fixed shape, no fixed volume<br>Particles far apart, move freely and fast</p>
            </div>
          </div>
        `
      }
    ]
  },

  // THEME 2: CYCLES
  'cycles-water': {
    title: 'Theme: Cycles - Water Cycle',
    description: 'Water moves continuously between Earth and atmosphere through the water cycle, changing states as it moves.',
    sections: [
      {
        heading: 'The Water Cycle Process',
        content: `
          <ul class="concept-list">
            <li><strong>1. Evaporation:</strong> Sun heats water in oceans, rivers, lakes → water changes to water vapor (gas)</li>
            <li><strong>2. Transpiration:</strong> Plants release water vapor from leaves</li>
            <li><strong>3. Condensation:</strong> Water vapor rises, cools, forms tiny water droplets → clouds</li>
            <li><strong>4. Precipitation:</strong> Water droplets combine, become heavy, fall as rain, snow, hail</li>
            <li><strong>5. Collection:</strong> Water flows into rivers, lakes, oceans → cycle repeats</li>
          </ul>
          <div class="example-box">
            <strong>Key Point:</strong> Water is never lost - it continuously cycles through different states
          </div>
        `
      },
      {
        heading: 'Changes in States of Water',
        content: `
          <ul class="concept-list">
            <li><strong>Melting:</strong> Solid (ice) → Liquid (water) [0°C]</li>
            <li><strong>Freezing:</strong> Liquid (water) → Solid (ice) [0°C]</li>
            <li><strong>Evaporation:</strong> Liquid (water) → Gas (water vapor) [100°C or below]</li>
            <li><strong>Boiling:</strong> Rapid evaporation at 100°C</li>
            <li><strong>Condensation:</strong> Gas (water vapor) → Liquid (water)</li>
          </ul>
        `
      },
      {
        heading: 'Factors Affecting Rate of Evaporation',
        content: `
          <ul class="concept-list">
            <li><strong>Temperature:</strong> Higher temperature → faster evaporation</li>
            <li><strong>Surface area:</strong> Larger surface area → faster evaporation</li>
            <li><strong>Wind/Air movement:</strong> More wind → faster evaporation</li>
            <li><strong>Humidity:</strong> Lower humidity → faster evaporation</li>
          </ul>
        `
      }
    ]
  },

  'cycles-matter': {
    title: 'Theme: Cycles - Matter Cycles',
    description: 'Matter cycles through ecosystems. Living things depend on these cycles for survival.',
    sections: [
      {
        heading: 'Food Chains and Food Webs',
        content: `
          <ul class="concept-list">
            <li><strong>Producers:</strong> Plants (make own food through photosynthesis)</li>
            <li><strong>Consumers:</strong> Animals (eat other organisms)</li>
            <li><strong>Herbivores:</strong> Eat only plants (e.g., rabbit, grasshopper)</li>
            <li><strong>Carnivores:</strong> Eat only animals (e.g., lion, eagle)</li>
            <li><strong>Omnivores:</strong> Eat both plants and animals (e.g., human, bear)</li>
            <li><strong>Decomposers:</strong> Break down dead matter (fungi, bacteria)</li>
          </ul>
          <div class="example-box">
            <strong>Example Food Chain:</strong> Grass → Grasshopper → Frog → Snake → Eagle
          </div>
        `
      },
      {
        heading: 'Energy Flow in Ecosystems',
        content: `
          <div class="example-box">
            <strong>Energy Source:</strong> All energy comes from the Sun
          </div>
          <ul class="concept-list">
            <li>Plants capture sun's energy through photosynthesis</li>
            <li>Energy passes from producers to consumers</li>
            <li>Energy decreases at each level (used for life processes, lost as heat)</li>
            <li>Decomposers return nutrients to soil</li>
          </ul>
        `
      }
    ]
  },

  // THEME 3: SYSTEMS
  'systems-cells': {
    title: 'Theme: Systems - Cells and Body Systems',
    description: 'All living things are made of cells. Cells form tissues, which form organs, which form organ systems.',
    sections: [
      {
        heading: 'Cell Structure',
        content: `
          <ul class="concept-list">
            <li><strong>Cell Membrane:</strong> Outer layer that controls what enters/leaves cell</li>
            <li><strong>Cytoplasm:</strong> Jelly-like substance where cell activities occur</li>
            <li><strong>Nucleus:</strong> Control center containing DNA (genetic material)</li>
          </ul>
        `
      },
      {
        heading: 'Plant vs Animal Cells',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Both Have</h4>
              <p>• Cell membrane<br>• Cytoplasm<br>• Nucleus</p>
            </div>
            <div class="key-concept-card">
              <h4>Only Plant Cells</h4>
              <p>• Cell wall (rigid structure)<br>• Chloroplasts (photosynthesis)<br>• Large vacuole (stores water)</p>
            </div>
            <div class="key-concept-card">
              <h4>Only Animal Cells</h4>
              <p>• Smaller vacuoles<br>• No cell wall<br>• No chloroplasts</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Organization of Living Things',
        content: `
          <ul class="concept-list">
            <li><strong>Cells:</strong> Basic unit of life (muscle cell, nerve cell)</li>
            <li><strong>Tissues:</strong> Group of similar cells working together (muscle tissue)</li>
            <li><strong>Organs:</strong> Different tissues working together (heart, stomach, leaf)</li>
            <li><strong>Organ Systems:</strong> Organs working together (digestive system)</li>
            <li><strong>Organism:</strong> Complete living thing (human, plant)</li>
          </ul>
        `
      },
      {
        heading: 'Human Body Systems',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Digestive System</h4>
              <p>Breaks down food into nutrients<br>
              Mouth → Esophagus → Stomach → Small Intestine → Large Intestine</p>
            </div>
            <div class="key-concept-card">
              <h4>Respiratory System</h4>
              <p>Takes in oxygen, removes carbon dioxide<br>
              Nose/Mouth → Trachea → Bronchi → Lungs (alveoli)</p>
            </div>
            <div class="key-concept-card">
              <h4>Circulatory System</h4>
              <p>Transports oxygen, nutrients, waste<br>
              Heart → Arteries → Capillaries → Veins → Heart</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Plant Systems',
        content: `
          <ul class="concept-list">
            <li><strong>Transport System:</strong> Xylem (water up), Phloem (food down)</li>
            <li><strong>Support System:</strong> Stem and cell walls provide structure</li>
            <li><strong>Reproductive System:</strong> Flowers produce seeds</li>
          </ul>
        `
      }
    ]
  },

  'systems-reproduction': {
    title: 'Theme: Systems - Reproduction in Plants',
    description: 'Flowering plants reproduce sexually through pollination and fertilization.',
    sections: [
      {
        heading: 'Parts of a Flower',
        content: `
          <ul class="concept-list">
            <li><strong>Sepals:</strong> Protect flower bud before it opens</li>
            <li><strong>Petals:</strong> Colorful, attract pollinators (insects, birds)</li>
            <li><strong>Stamen (Male):</strong> Produces pollen
              <br>- Anther: Contains pollen grains
              <br>- Filament: Supports anther</li>
            <li><strong>Pistil (Female):</strong> Receives pollen
              <br>- Stigma: Sticky top to catch pollen
              <br>- Style: Connects stigma to ovary
              <br>- Ovary: Contains ovules (eggs)</li>
          </ul>
        `
      },
      {
        heading: 'Sexual Reproduction in Plants',
        content: `
          <div class="example-box">
            <strong>1. Pollination:</strong> Transfer of pollen from anther to stigma
            <br>• Self-pollination: Same flower
            <br>• Cross-pollination: Different flower (wind, insects, birds, water)
          </div>
          <div class="example-box">
            <strong>2. Fertilization:</strong> Pollen nucleus joins with ovule in ovary
          </div>
          <div class="example-box">
            <strong>3. Seed and Fruit Formation:</strong>
            <br>• Fertilized ovule → Seed
            <br>• Ovary → Fruit
          </div>
        `
      },
      {
        heading: 'Seed Dispersal',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Wind</h4>
              <p>Light seeds with wings or parachute-like structures (dandelion, maple)</p>
            </div>
            <div class="key-concept-card">
              <h4>Water</h4>
              <p>Waterproof, can float (coconut, water lily)</p>
            </div>
            <div class="key-concept-card">
              <h4>Animals</h4>
              <p>• Hooks/spines stick to fur (burdock)<br>
              • Eaten and dispersed in droppings (berries)</p>
            </div>
            <div class="key-concept-card">
              <h4>Self-Dispersal</h4>
              <p>Pods burst open, shoot seeds away (peas, beans)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Seed Germination',
        content: `
          <ul class="concept-list">
            <li><strong>Conditions needed:</strong> Water, suitable temperature, oxygen</li>
            <li><strong>Process:</strong> Seed absorbs water → swells → seed coat breaks → root grows down → shoot grows up</li>
            <li><strong>Food source:</strong> Seed has stored food for initial growth until leaves can photosynthesize</li>
          </ul>
        `
      }
    ]
  },

  // THEME 4: ENERGY
  'energy-forms': {
    title: 'Theme: Energy - Forms and Uses',
    description: 'Energy exists in many forms and can be converted from one form to another. Energy cannot be created or destroyed.',
    sections: [
      {
        heading: 'Forms of Energy',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Light Energy</h4>
              <p>Allows us to see. Sources: Sun, light bulbs, fire</p>
            </div>
            <div class="key-concept-card">
              <h4>Heat Energy</h4>
              <p>Makes things hot. Sources: Sun, fire, friction, electricity</p>
            </div>
            <div class="key-concept-card">
              <h4>Sound Energy</h4>
              <p>Produced by vibrations. Allows us to hear</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical Energy</h4>
              <p>Powers devices. Sources: Batteries, generators, solar panels</p>
            </div>
            <div class="key-concept-card">
              <h4>Kinetic Energy</h4>
              <p>Energy of motion. Moving objects have kinetic energy</p>
            </div>
            <div class="key-concept-card">
              <h4>Potential Energy</h4>
              <p>Stored energy. Examples: Stretched spring, object at height</p>
            </div>
            <div class="key-concept-card">
              <h4>Chemical Energy</h4>
              <p>Stored in food, fuel, batteries</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Energy Conversions',
        content: `
          <ul class="concept-list">
            <li><strong>Solar panel:</strong> Light → Electrical</li>
            <li><strong>Light bulb:</strong> Electrical → Light + Heat</li>
            <li><strong>Battery-powered toy:</strong> Chemical → Electrical → Kinetic (+ Sound, Light)</li>
            <li><strong>Photosynthesis:</strong> Light → Chemical (in plants)</li>
            <li><strong>Eating food:</strong> Chemical → Kinetic + Heat (in animals)</li>
            <li><strong>Rubbing hands:</strong> Kinetic → Heat</li>
            <li><strong>Wind turbine:</strong> Kinetic (wind) → Electrical</li>
          </ul>
        `
      },
      {
        heading: 'Heat Transfer',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Conduction</h4>
              <p>Heat transfer through direct contact<br>
              Metals are good conductors</p>
            </div>
            <div class="key-concept-card">
              <h4>Convection</h4>
              <p>Heat transfer through movement of fluids (liquids/gases)<br>
              Hot air/water rises, cold sinks</p>
            </div>
            <div class="key-concept-card">
              <h4>Radiation</h4>
              <p>Heat transfer through waves/rays<br>
              Can travel through vacuum (Sun to Earth)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Energy Sources',
        content: `
          <div class="example-box">
            <strong>Renewable (won't run out):</strong> Solar, wind, hydroelectric, geothermal, biomass
          </div>
          <div class="example-box">
            <strong>Non-renewable (will run out):</strong> Coal, oil, natural gas, nuclear fuel
          </div>
        `
      }
    ]
  },

  'energy-light-sound': {
    title: 'Theme: Energy - Light and Sound',
    description: 'Light and sound are forms of energy with distinct properties and behaviors.',
    sections: [
      {
        heading: 'Properties of Light',
        content: `
          <ul class="concept-list">
            <li>Travels in straight lines</li>
            <li>Travels very fast (300,000 km/s)</li>
            <li>Can be reflected (bounces off surfaces)</li>
            <li>Can be refracted (bends when entering different materials)</li>
            <li>White light is made of 7 colors (rainbow: red, orange, yellow, green, blue, indigo, violet)</li>
          </ul>
        `
      },
      {
        heading: 'Light and Materials',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Transparent</h4>
              <p>Light passes through completely<br>
              Can see clearly (clear glass, water, air)</p>
            </div>
            <div class="key-concept-card">
              <h4>Translucent</h4>
              <p>Some light passes through<br>
              Cannot see clearly (frosted glass, thin paper)</p>
            </div>
            <div class="key-concept-card">
              <h4>Opaque</h4>
              <p>No light passes through<br>
              Cannot see at all. Forms shadows (wood, metal, brick)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Reflection and Refraction',
        content: `
          <div class="example-box">
            <strong>Reflection:</strong> Light bounces off smooth surfaces (mirrors)
            <br>• Angle of incidence = Angle of reflection
            <br>• We see objects because light reflects off them into our eyes
          </div>
          <div class="example-box">
            <strong>Refraction:</strong> Light bends when passing from one material to another
            <br>• Makes objects look bent/shifted (straw in water)
            <br>• Causes rainbows (light bending through water droplets)
          </div>
        `
      },
      {
        heading: 'Properties of Sound',
        content: `
          <ul class="concept-list">
            <li>Produced by vibrations</li>
            <li>Needs a medium to travel (solid, liquid, gas) - cannot travel through vacuum</li>
            <li>Travels faster in solids than liquids, faster in liquids than gases</li>
            <li>Can be reflected (echoes)</li>
          </ul>
        `
      },
      {
        heading: 'Characteristics of Sound',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Pitch</h4>
              <p>How high or low a sound is<br>
              • High pitch: Fast vibrations<br>
              • Low pitch: Slow vibrations</p>
            </div>
            <div class="key-concept-card">
              <h4>Volume/Loudness</h4>
              <p>How loud or soft a sound is<br>
              • Loud: Large vibrations<br>
              • Soft: Small vibrations</p>
            </div>
          </div>
        `
      }
    ]
  },

  'energy-electricity': {
    title: 'Theme: Energy - Electricity',
    description: 'Electricity is a form of energy that flows through circuits to power devices.',
    sections: [
      {
        heading: 'Electric Circuit Components',
        content: `
          <ul class="concept-list">
            <li><strong>Cell/Battery:</strong> Source of electrical energy (converts chemical to electrical)</li>
            <li><strong>Wires:</strong> Conductors that allow electricity to flow (usually copper)</li>
            <li><strong>Switch:</strong> Controls circuit - open (off) or closed (on)</li>
            <li><strong>Bulb:</strong> Converts electrical energy to light (and heat)</li>
            <li><strong>Motor:</strong> Converts electrical energy to kinetic energy</li>
            <li><strong>Buzzer:</strong> Converts electrical energy to sound</li>
          </ul>
        `
      },
      {
        heading: 'Complete Circuit',
        content: `
          <ul class="concept-list">
            <li>Must form a closed loop for electricity to flow</li>
            <li>All components must be properly connected</li>
            <li>If circuit is broken (switch off, wire disconnected), electricity stops</li>
            <li>Electricity flows from positive (+) terminal to negative (-) terminal</li>
          </ul>
        `
      },
      {
        heading: 'Conductors and Insulators',
        content: `
          <div class="example-box">
            <strong>Electrical Conductors:</strong> Allow electricity to flow
            <br>Examples: All metals (copper, iron, aluminum, gold), graphite
          </div>
          <div class="example-box">
            <strong>Electrical Insulators:</strong> Do not allow electricity to flow
            <br>Examples: Plastic, rubber, wood, glass, paper, air, cloth
          </div>
        `
      },
      {
        heading: 'Series vs Parallel Circuits',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Series Circuit</h4>
              <p>• Single path for electricity<br>
              • If one bulb breaks, all stop working<br>
              • Bulbs dimmer with more bulbs added<br>
              • One switch controls all</p>
            </div>
            <div class="key-concept-card">
              <h4>Parallel Circuit</h4>
              <p>• Multiple paths for electricity<br>
              • If one bulb breaks, others still work<br>
              • Bulbs equally bright regardless of number<br>
              • Can have individual switches</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Electrical Safety',
        content: `
          <ul class="concept-list">
            <li>Never touch electrical appliances with wet hands</li>
            <li>Don't overload sockets</li>
            <li>Keep water away from electrical devices</li>
            <li>Don't touch damaged wires or plugs</li>
            <li>Turn off switches before handling appliances</li>
          </ul>
        `
      }
    ]
  },

  // THEME 5: INTERACTIONS
  'interactions-forces': {
    title: 'Theme: Interactions - Forces',
    description: 'Forces are pushes or pulls that can change the motion, speed, or shape of objects.',
    sections: [
      {
        heading: 'Types of Forces',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Gravitational Force</h4>
              <p>Pulls objects toward Earth's center<br>
              Gives objects weight<br>
              Always acts downward</p>
            </div>
            <div class="key-concept-card">
              <h4>Frictional Force</h4>
              <p>Opposes motion between surfaces<br>
              Acts in opposite direction to motion<br>
              Produces heat</p>
            </div>
            <div class="key-concept-card">
              <h4>Magnetic Force</h4>
              <p>Attracts/repels magnetic materials<br>
              Acts at a distance<br>
              Like poles repel, unlike attract</p>
            </div>
            <div class="key-concept-card">
              <h4>Elastic/Spring Force</h4>
              <p>From stretched or compressed springs<br>
              Pushes/pulls back to original shape<br>
              Stores potential energy</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Effects of Forces',
        content: `
          <ul class="concept-list">
            <li><strong>Change speed:</strong> Start moving, speed up, slow down, stop</li>
            <li><strong>Change direction:</strong> Make objects turn or change path</li>
            <li><strong>Change shape:</strong> Stretch, compress, bend, twist objects</li>
          </ul>
          <div class="example-box">
            <strong>Balanced forces:</strong> Equal forces in opposite directions → no change in motion
          </div>
          <div class="example-box">
            <strong>Unbalanced forces:</strong> Forces not equal → object changes motion
          </div>
        `
      },
      {
        heading: 'Friction in Daily Life',
        content: `
          <div class="example-box">
            <strong>Useful Friction:</strong>
            <br>• Walking/running (grip on ground)
            <br>• Brakes on vehicles
            <br>• Writing with pencil
            <br>• Gripping objects
          </div>
          <div class="example-box">
            <strong>Ways to Reduce Friction:</strong>
            <br>• Use lubricants (oil, grease, wax)
            <br>• Make surfaces smoother
            <br>• Use wheels or ball bearings
            <br>• Streamline shapes
          </div>
          <ul class="concept-list">
            <li>Rougher surfaces → more friction</li>
            <li>Heavier objects → more friction</li>
          </ul>
        `
      }
    ]
  },

  'interactions-adaptations': {
    title: 'Theme: Interactions - Adaptations',
    description: 'Living things have special features (adaptations) that help them survive in their environment.',
    sections: [
      {
        heading: 'Structural Adaptations',
        content: `
          <div class="example-box">
            <strong>Body parts that help organisms survive in their habitat</strong>
          </div>
        `
      },
      {
        heading: 'Plant Adaptations',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Desert Plants (e.g., Cactus)</h4>
              <p>• Thick, fleshy stem stores water<br>
              • Spines instead of leaves (reduce water loss)<br>
              • Waxy coating prevents water loss<br>
              • Long roots reach deep underground water</p>
            </div>
            <div class="key-concept-card">
              <h4>Rainforest Plants</h4>
              <p>• Large, broad leaves capture more sunlight<br>
              • Drip tips let water run off quickly<br>
              • Some have aerial roots to absorb moisture<br>
              • Climbing vines reach sunlight</p>
            </div>
            <div class="key-concept-card">
              <h4>Aquatic Plants</h4>
              <p>• Hollow stems help plant float<br>
              • Waxy leaves repel water<br>
              • Flexible stems bend with water current<br>
              • Stomata on upper leaf surface</p>
            </div>
            <div class="key-concept-card">
              <h4>Mangrove Plants</h4>
              <p>• Breathing roots stick out of water<br>
              • Salt-filtering roots<br>
              • Seeds germinate while on tree</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Animal Adaptations',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Polar Animals (Arctic/Antarctic)</h4>
              <p>• Thick fur or blubber for insulation<br>
              • White color for camouflage in snow<br>
              • Small ears reduce heat loss<br>
              • Large paws spread weight on ice</p>
            </div>
            <div class="key-concept-card">
              <h4>Desert Animals</h4>
              <p>• Nocturnal (active at night when cooler)<br>
              • Store water/fat (camel's hump)<br>
              • Light-colored to reflect heat<br>
              • Burrow underground during day</p>
            </div>
            <div class="key-concept-card">
              <h4>Aquatic Animals</h4>
              <p>• Gills for breathing underwater<br>
              • Fins/flippers for swimming<br>
              • Streamlined body reduces water resistance<br>
              • Scales protect body</p>
            </div>
            <div class="key-concept-card">
              <h4>Birds</h4>
              <p>• Hollow bones (lighter for flight)<br>
              • Feathers for flight and insulation<br>
              • Beaks shaped for specific diets<br>
              • Wings for flying</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Behavioral Adaptations',
        content: `
          <ul class="concept-list">
            <li><strong>Migration:</strong> Moving to another place seasonally (birds flying south for winter)</li>
            <li><strong>Hibernation:</strong> Deep sleep during cold months (bears)</li>
            <li><strong>Camouflage:</strong> Blending with environment to hide from predators/prey</li>
            <li><strong>Warning colors:</strong> Bright colors signal danger (poison dart frog)</li>
            <li><strong>Group behavior:</strong> Living/hunting in groups for protection</li>
          </ul>
        `
      }
    ]
  },

  'interactions-environment': {
    title: 'Theme: Interactions - Man and Environment',
    description: 'Human activities impact the environment. We must conserve and protect our natural resources.',
    sections: [
      {
        heading: 'Human Impact on Environment',
        content: `
          <ul class="concept-list">
            <li><strong>Deforestation:</strong> Cutting down trees → habitat loss, soil erosion, climate change</li>
            <li><strong>Pollution:</strong> Air, water, land pollution harms living things</li>
            <li><strong>Overfishing:</strong> Reduces fish populations, disrupts food chains</li>
            <li><strong>Plastic waste:</strong> Harms marine life, takes hundreds of years to decompose</li>
            <li><strong>Climate change:</strong> Global warming from greenhouse gases</li>
          </ul>
        `
      },
      {
        heading: 'Conservation and Sustainability',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Reduce</h4>
              <p>Use less, avoid single-use items, buy only what you need</p>
            </div>
            <div class="key-concept-card">
              <h4>Reuse</h4>
              <p>Use items multiple times, donate old items, repair instead of replacing</p>
            </div>
            <div class="key-concept-card">
              <h4>Recycle</h4>
              <p>Process waste materials to make new products (paper, plastic, metal, glass)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Protecting Our Environment',
        content: `
          <ul class="concept-list">
            <li>Save water: Turn off taps, take shorter showers, fix leaks</li>
            <li>Save energy: Turn off lights/devices, use energy-efficient appliances</li>
            <li>Plant trees: Absorb CO₂, provide oxygen, create habitats</li>
            <li>Use public transport: Reduce air pollution and traffic</li>
            <li>Support eco-friendly products: Choose sustainable, biodegradable items</li>
            <li>Protect wildlife: Don't litter, respect habitats, support conservation</li>
          </ul>
        `
      }
    ]
  }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const topicSelect = document.getElementById('topicSelect');
  const container = document.getElementById('conceptMapsContainer');

  // Generate all concept map HTML
  Object.keys(conceptMaps).forEach(topicId => {
    const topic = conceptMaps[topicId];
    const mapDiv = document.createElement('div');
    mapDiv.className = 'concept-map';
    mapDiv.id = `map-${topicId}`;
    
    let sectionsHTML = '';
    topic.sections.forEach(section => {
      sectionsHTML += `
        <div class="concept-section">
          <h3>${section.heading}</h3>
          ${section.content}
        </div>
      `;
    });
    
    mapDiv.innerHTML = `
      <h2 class="concept-title">${topic.title}</h2>
      <p class="concept-description">${topic.description}</p>
      ${sectionsHTML}
    `;
    
    container.appendChild(mapDiv);
  });

  // Handle topic selection
  topicSelect.addEventListener('change', (e) => {
    const selectedTopic = e.target.value;
    
    // Hide all concept maps
    document.querySelectorAll('.concept-map').forEach(map => {
      map.classList.remove('active');
    });
    
    // Show selected concept map
    if (selectedTopic) {
      const selectedMap = document.getElementById(`map-${selectedTopic}`);
      if (selectedMap) {
        selectedMap.classList.add('active');
        selectedMap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
