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
            <li><strong>Movement:</strong> All living things can move or respond to stimuli. Plants move towards light, animals move from place to place.</li>
            <li><strong>Respiration:</strong> Release energy from food. Animals take in oxygen and release carbon dioxide. Plants do this day and night.</li>
            <li><strong>Nutrition:</strong> Need food/nutrients for energy and growth. Plants make their own food (producers), animals eat plants or other animals (consumers).</li>
            <li><strong>Growth:</strong> Increase in size and mass over time. Young organisms grow into mature adults.</li>
            <li><strong>Reproduction:</strong> Produce offspring of the same kind to continue the species. Animals mate, plants produce seeds.</li>
            <li><strong>Excretion:</strong> Remove waste products. Animals remove urine and carbon dioxide, plants remove oxygen at night and waste through leaves.</li>
            <li><strong>Response to changes:</strong> React to light, temperature, touch, sound, and other stimuli in their environment.</li>
          </ul>
          <div class="example-box">
            <strong>Exam Key Point:</strong> All living things have these 7 characteristics. Non-living things may show some (e.g., car moves) but not all characteristics.
          </div>
        `
      },
      {
        heading: 'Classification of Living Things',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Animals</h4>
              <p><strong>Examples:</strong> Fish, amphibians, reptiles, birds, mammals, insects, spiders, worms, snails</p>
              <p><strong>Features:</strong> Cannot make their own food, most can move from place to place, have sense organs</p>
            </div>
            <div class="key-concept-card">
              <h4>Plants</h4>
              <p><strong>Flowering plants:</strong> Have flowers, fruits, seeds (e.g., rose, sunflower, mango tree)</p>
              <p><strong>Non-flowering:</strong> Ferns (have leaves), mosses (no proper roots), reproduce using spores</p>
            </div>
            <div class="key-concept-card">
              <h4>Fungi</h4>
              <p><strong>Examples:</strong> Mushrooms, mold, yeast</p>
              <p><strong>Role:</strong> Decompose dead plants and animals, recycling nutrients back to soil</p>
            </div>
            <div class="key-concept-card">
              <h4>Microorganisms</h4>
              <p><strong>Examples:</strong> Bacteria, viruses, algae, protozoa</p>
              <p><strong>Note:</strong> Too small to see with naked eye, need microscope. Can be useful (yogurt) or harmful (diseases)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Classify living things by observable features. Plants make their own food through photosynthesis. Animals need to eat plants or other animals.
          </div>
        `
      },
      {
        heading: 'Plant Parts and Functions',
        content: `
          <ul class="concept-list">
            <li><strong>Roots:</strong> Anchor plant firmly in soil, absorb water and mineral salts (nutrients), store food (e.g., carrots, radish)</li>
            <li><strong>Stem:</strong> Support the plant and hold up leaves, flowers, and fruits. Transport water up from roots and food down from leaves</li>
            <li><strong>Leaves:</strong> Make food through photosynthesis using sunlight. Allow gas exchange (take in CO₂, release O₂). Green color from chlorophyll</li>
            <li><strong>Flowers:</strong> Reproductive part that produces seeds. Contains male parts (stamen) and female parts (pistil)</li>
            <li><strong>Fruits:</strong> Protect seeds inside. Help disperse seeds by wind, water, animals, or splitting</li>
          </ul>
          <div class="example-box">
            <strong>Photosynthesis Equation:</strong> Carbon dioxide + Water + Sunlight → Glucose (food) + Oxygen<br>
            Plants need: (1) Sunlight, (2) Carbon dioxide from air, (3) Water from soil, (4) Chlorophyll in leaves
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Each plant part has a specific function. Water travels UP the stem from roots to leaves. Food travels DOWN the stem from leaves to other parts.
          </div>
        `
      },
      {
        heading: 'Life Cycles',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Plants (Flowering)</h4>
              <p><strong>Seed →</strong> Needs water, air, and suitable temperature to germinate</p>
              <p><strong>Germination →</strong> Seed sprouts roots and shoot</p>
              <p><strong>Seedling →</strong> Young plant grows leaves, needs water, air, light, nutrients</p>
              <p><strong>Mature Plant →</strong> Fully grown, produces flowers</p>
              <p><strong>Flowering →</strong> Pollination occurs (pollen from stamen to pistil)</p>
              <p><strong>Fruit & Seeds →</strong> After fertilization, seeds form inside fruits</p>
            </div>
            <div class="key-concept-card">
              <h4>Butterfly (Complete Metamorphosis)</h4>
              <p><strong>Egg →</strong> Female lays eggs on leaves</p>
              <p><strong>Larva (Caterpillar) →</strong> Hatches and eats a lot, grows and molts</p>
              <p><strong>Pupa (Chrysalis) →</strong> Does not eat or move, undergoes transformation</p>
              <p><strong>Adult →</strong> Emerges with wings, can fly and reproduce</p>
              <p><strong>Note:</strong> 4 distinct stages, each looks very different</p>
            </div>
            <div class="key-concept-card">
              <h4>Cockroach (Incomplete Metamorphosis)</h4>
              <p><strong>Egg →</strong> Female lays eggs in egg case</p>
              <p><strong>Nymph →</strong> Looks like small adult, no wings, molts several times</p>
              <p><strong>Adult →</strong> Fully grown with wings</p>
              <p><strong>Note:</strong> Only 3 stages, no pupa stage, young looks similar to adult</p>
            </div>
            <div class="key-concept-card">
              <h4>Frog (Amphibian)</h4>
              <p><strong>Egg →</strong> Laid in water (frog spawn)</p>
              <p><strong>Tadpole →</strong> Lives in water, has tail and gills, eats algae</p>
              <p><strong>Tadpole with legs →</strong> Back legs appear first, then front legs</p>
              <p><strong>Froglet →</strong> Tail shrinks, develops lungs</p>
              <p><strong>Adult Frog →</strong> Lives on land and water, breathes with lungs</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Complete metamorphosis = 4 stages (egg, larva, pupa, adult). Incomplete metamorphosis = 3 stages (egg, nymph, adult) with no pupa. Young in incomplete metamorphosis looks similar to adult.
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
              <p>Amount of matter in an object. Measured using a balance or weighing scale.</p>
              <p><strong>Unit:</strong> Grams (g), kilograms (kg)</p>
              <p><strong>Note:</strong> Mass stays the same regardless of location</p>
            </div>
            <div class="key-concept-card">
              <h4>Volume</h4>
              <p>Amount of space an object occupies. For liquids, use measuring cylinder.</p>
              <p><strong>Unit:</strong> Cubic centimeters (cm³), milliliters (ml), liters (l)</p>
              <p><strong>Note:</strong> 1 ml = 1 cm³</p>
            </div>
            <div class="key-concept-card">
              <h4>Density</h4>
              <p>How heavy something is for its size. Density = Mass ÷ Volume</p>
              <p><strong>Denser objects:</strong> Sink in water (e.g., metal, stone)</p>
              <p><strong>Less dense objects:</strong> Float in water (e.g., wood, cork, ice)</p>
            </div>
            <div class="key-concept-card">
              <h4>Hardness</h4>
              <p>Resistance to scratching, denting, or being deformed</p>
              <p><strong>Hard:</strong> Diamond, steel, glass - difficult to scratch</p>
              <p><strong>Soft:</strong> Clay, wax, lead - easy to scratch or dent</p>
            </div>
            <div class="key-concept-card">
              <h4>Flexibility</h4>
              <p>Ability to bend without breaking and return to original shape</p>
              <p><strong>Flexible:</strong> Rubber, paper, cloth, plastic bags</p>
              <p><strong>Not flexible:</strong> Glass, ceramic - will break when bent</p>
            </div>
            <div class="key-concept-card">
              <h4>Strength</h4>
              <p>Ability to support heavy loads or withstand force without breaking</p>
              <p><strong>Strong:</strong> Steel, concrete, thick wood beams</p>
              <p><strong>Weak:</strong> Thin paper, thin plastic sheets</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Materials are chosen based on their properties. E.g., Cooking pots are metal (good heat conductor), pot handles are plastic/wood (heat insulators to prevent burns).
          </div>
        `
      },
      {
        heading: 'Thermal and Electrical Properties',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Thermal Conductors</h4>
              <p>Materials that allow heat to pass through easily</p>
              <p><strong>Examples:</strong> Metals (copper, aluminum, iron, steel)</p>
              <p><strong>Uses:</strong> Cooking pots, frying pans, kettles, radiators</p>
            </div>
            <div class="key-concept-card">
              <h4>Thermal Insulators</h4>
              <p>Materials that slow down or prevent heat transfer</p>
              <p><strong>Examples:</strong> Wood, plastic, rubber, cloth, air, foam</p>
              <p><strong>Uses:</strong> Pot handles, oven mitts, thermos flasks, winter clothing</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical Conductors</h4>
              <p>Materials that allow electricity to flow through easily</p>
              <p><strong>Examples:</strong> All metals (copper, silver, gold, aluminum), graphite</p>
              <p><strong>Uses:</strong> Electrical wires, circuit boards, light bulb filaments</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical Insulators</h4>
              <p>Materials that block or prevent flow of electricity</p>
              <p><strong>Examples:</strong> Rubber, plastic, glass, wood, cloth, ceramics</p>
              <p><strong>Uses:</strong> Wire coating, electrical plugs, switch covers (for safety)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Metals are BOTH good thermal AND electrical conductors. Electrical wires are made of copper (conductor) coated with plastic (insulator) for safety.
          </div>
        `
      },
      {
        heading: 'Magnetic Properties',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Magnetic Materials</h4>
              <p><strong>Can be attracted by magnets:</strong> Iron, steel, nickel, cobalt</p>
              <p><strong>Note:</strong> Only these metals are magnetic. Not all metals are magnetic!</p>
            </div>
            <div class="key-concept-card">
              <h4>Non-Magnetic Materials</h4>
              <p><strong>Cannot be attracted by magnets:</strong> Aluminum, copper, gold, silver, brass, plastic, wood, glass, paper, cloth</p>
            </div>
          </div>
          <ul class="concept-list">
            <li><strong>Poles:</strong> Every magnet has a North (N) pole and South (S) pole</li>
            <li><strong>Attraction:</strong> Opposite poles attract each other (N attracts S)</li>
            <li><strong>Repulsion:</strong> Like poles repel each other (N repels N, S repels S)</li>
            <li><strong>Magnetic force:</strong> Strongest at the poles, can act through some materials (paper, plastic)</li>
            <li><strong>Magnets can:</strong> Attract magnetic materials, attract or repel other magnets</li>
          </ul>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Common mistake - Not all metals are magnetic! Aluminum cans and copper coins are NOT attracted to magnets. Only iron, steel, nickel, and cobalt are magnetic.
          </div>
        `
      },
      {
        heading: 'States of Matter',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Solid</h4>
              <p><strong>Shape:</strong> Fixed/definite shape</p>
              <p><strong>Volume:</strong> Fixed/definite volume</p>
              <p><strong>Particles:</strong> Very tightly packed, vibrate in fixed positions</p>
              <p><strong>Examples:</strong> Ice, rock, wood, metal, sugar, salt</p>
            </div>
            <div class="key-concept-card">
              <h4>Liquid</h4>
              <p><strong>Shape:</strong> No fixed shape (takes shape of container)</p>
              <p><strong>Volume:</strong> Fixed/definite volume</p>
              <p><strong>Particles:</strong> Close together but can move and slide past each other</p>
              <p><strong>Examples:</strong> Water, milk, oil, juice, honey</p>
            </div>
            <div class="key-concept-card">
              <h4>Gas</h4>
              <p><strong>Shape:</strong> No fixed shape (spreads to fill container)</p>
              <p><strong>Volume:</strong> No fixed volume (expands to fill space)</p>
              <p><strong>Particles:</strong> Very far apart, move freely and rapidly in all directions</p>
              <p><strong>Examples:</strong> Air, oxygen, carbon dioxide, water vapor, steam</p>
            </div>
          </div>
          <div class="example-box">
            <strong>State Changes:</strong><br>
            • <strong>Melting:</strong> Solid → Liquid (ice melts to water)<br>
            • <strong>Freezing:</strong> Liquid → Solid (water freezes to ice)<br>
            • <strong>Evaporation/Boiling:</strong> Liquid → Gas (water evaporates to water vapor)<br>
            • <strong>Condensation:</strong> Gas → Liquid (water vapor condenses to water droplets)<br>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Water can exist in all 3 states - ice (solid), water (liquid), water vapor/steam (gas). Matter can change states when heated or cooled, but the amount of matter stays the same.
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
            <li><strong>1. Evaporation:</strong> Sun's heat energy causes water in oceans, rivers, lakes, and puddles to change from liquid to water vapor (gas). Water rises into the air.</li>
            <li><strong>2. Transpiration:</strong> Plants absorb water from soil through roots. Water travels up to leaves and is released as water vapor through tiny pores (stomata).</li>
            <li><strong>3. Condensation:</strong> As water vapor rises high into the atmosphere, it cools down. Cool water vapor changes back to tiny liquid water droplets, forming clouds and fog.</li>
            <li><strong>4. Precipitation:</strong> Water droplets in clouds combine and grow larger. When too heavy, they fall as rain, snow, sleet, or hail.</li>
            <li><strong>5. Collection:</strong> Water that falls flows over land (runoff) into streams, rivers, lakes, and oceans. Some water seeps into ground (groundwater). The cycle repeats endlessly.</li>
          </ul>
          <div class="example-box">
            <strong>Exam Key Point:</strong> The water cycle is continuous and never stops. The same water is recycled over and over. Water changes state (solid, liquid, gas) but the total amount of water on Earth stays the same.
          </div>
        `
      },
      {
        heading: 'Changes in States of Water',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Melting</h4>
              <p><strong>Change:</strong> Solid (ice) → Liquid (water)</p>
              <p><strong>Temperature:</strong> 0°C</p>
              <p><strong>Energy:</strong> Heat is absorbed</p>
              <p><strong>Example:</strong> Ice cube melts in warm room</p>
            </div>
            <div class="key-concept-card">
              <h4>Freezing</h4>
              <p><strong>Change:</strong> Liquid (water) → Solid (ice)</p>
              <p><strong>Temperature:</strong> 0°C</p>
              <p><strong>Energy:</strong> Heat is released</p>
              <p><strong>Example:</strong> Water in freezer turns to ice</p>
            </div>
            <div class="key-concept-card">
              <h4>Evaporation</h4>
              <p><strong>Change:</strong> Liquid (water) → Gas (water vapor)</p>
              <p><strong>Temperature:</strong> Any temperature (faster when warmer)</p>
              <p><strong>Energy:</strong> Heat is absorbed</p>
              <p><strong>Example:</strong> Wet clothes dry, puddles disappear</p>
            </div>
            <div class="key-concept-card">
              <h4>Boiling</h4>
              <p><strong>Change:</strong> Liquid (water) → Gas (steam)</p>
              <p><strong>Temperature:</strong> 100°C (at sea level)</p>
              <p><strong>Note:</strong> Rapid evaporation with bubbles</p>
              <p><strong>Example:</strong> Kettle boiling water</p>
            </div>
            <div class="key-concept-card">
              <h4>Condensation</h4>
              <p><strong>Change:</strong> Gas (water vapor) → Liquid (water)</p>
              <p><strong>Energy:</strong> Heat is released</p>
              <p><strong>Example:</strong> Water droplets on cold drink, mirror fogs up after hot shower</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Melting and freezing occur at 0°C. Boiling occurs at 100°C. Evaporation can happen at any temperature. During state changes, temperature stays constant until change is complete.
          </div>
        `
      },
      {
        heading: 'Factors Affecting Rate of Evaporation',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Temperature</h4>
              <p><strong>Effect:</strong> Higher temperature → Faster evaporation</p>
              <p><strong>Reason:</strong> Water particles have more energy to escape</p>
              <p><strong>Example:</strong> Wet clothes dry faster on hot sunny day than cool day</p>
            </div>
            <div class="key-concept-card">
              <h4>Surface Area</h4>
              <p><strong>Effect:</strong> Larger surface area → Faster evaporation</p>
              <p><strong>Reason:</strong> More water exposed to air</p>
              <p><strong>Example:</strong> Water in wide dish dries faster than in narrow bottle</p>
            </div>
            <div class="key-concept-card">
              <h4>Wind/Air Movement</h4>
              <p><strong>Effect:</strong> More wind → Faster evaporation</p>
              <p><strong>Reason:</strong> Wind blows away water vapor, allowing more evaporation</p>
              <p><strong>Example:</strong> Clothes dry faster on windy day, using fan speeds up drying</p>
            </div>
            <div class="key-concept-card">
              <h4>Humidity</h4>
              <p><strong>Effect:</strong> Lower humidity → Faster evaporation</p>
              <p><strong>Reason:</strong> Drier air can absorb more water vapor</p>
              <p><strong>Example:</strong> Clothes dry slower on humid/rainy days</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> To speed up drying: increase temperature (use heat), increase surface area (spread out), increase air movement (use fan), reduce humidity (use dry air). All 4 factors work together.
          </div>
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
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Producers</h4>
              <p>Plants and algae that make their own food using sunlight (photosynthesis)</p>
              <p><strong>Examples:</strong> Grass, trees, vegetables, algae, seaweed</p>
              <p><strong>Role:</strong> First level of food chain, provide food for all other organisms</p>
            </div>
            <div class="key-concept-card">
              <h4>Consumers</h4>
              <p>Animals that must eat other organisms for food</p>
              <p><strong>Primary consumers (Herbivores):</strong> Eat only plants (rabbit, caterpillar, deer, cow)</p>
              <p><strong>Secondary consumers (Carnivores):</strong> Eat herbivores (snake, fox, spider)</p>
              <p><strong>Tertiary consumers:</strong> Eat other carnivores (eagle, lion, shark)</p>
              <p><strong>Omnivores:</strong> Eat both plants and animals (human, bear, pig, crow)</p>
            </div>
            <div class="key-concept-card">
              <h4>Decomposers</h4>
              <p>Break down dead plants and animals into simpler substances</p>
              <p><strong>Examples:</strong> Bacteria, fungi (mushrooms, mold), earthworms</p>
              <p><strong>Role:</strong> Return nutrients to soil for plants to use, keep ecosystem clean</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Food Chain Examples:</strong><br>
            • Land: Grass → Grasshopper → Frog → Snake → Eagle<br>
            • Water: Algae → Small fish → Big fish → Human<br>
            • Garden: Plant → Caterpillar → Bird → Cat
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Food chains show "who eats whom" in a straight line. Arrows show direction of energy flow (from food to feeder). All food chains start with producers (plants) and get energy from the Sun.
          </div>
        `
      },
      {
        heading: 'Energy Flow in Ecosystems',
        content: `
          <div class="example-box">
            <strong>Energy Source:</strong> The Sun is the ultimate source of energy for almost all life on Earth
          </div>
          <ul class="concept-list">
            <li><strong>Step 1 - Sun to Producers:</strong> Plants capture sun's light energy and convert it to chemical energy (food) through photosynthesis</li>
            <li><strong>Step 2 - Producers to Consumers:</strong> When animals eat plants, energy is transferred from plants to animals</li>
            <li><strong>Step 3 - Consumer to Consumer:</strong> When carnivores eat herbivores, energy transfers again</li>
            <li><strong>Energy Loss:</strong> At each level, about 90% of energy is used for life processes (movement, breathing, keeping warm) or lost as heat. Only 10% passes to next level.</li>
            <li><strong>Decomposers' Role:</strong> When organisms die, decomposers break them down and return nutrients (not energy) to soil for plants to reuse</li>
          </ul>
          <div class="example-box">
            <strong>Food Pyramid:</strong><br>
            Producers (most numerous, most energy) → Primary consumers → Secondary consumers → Tertiary consumers (fewest, least energy)<br>
            <strong>Why pyramid shape?</strong> Energy decreases at each level, so fewer organisms can be supported at higher levels.
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Energy flows in ONE direction (Sun → Plants → Animals) and cannot be recycled. Energy is lost as heat at each level. If one organism in food chain is removed, the entire ecosystem is affected.
          </div>
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
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Cell Membrane</h4>
              <p><strong>Function:</strong> Controls what enters and leaves the cell (like a gatekeeper)</p>
              <p><strong>Location:</strong> Outer boundary of all cells</p>
              <p><strong>Key Point:</strong> Allows useful substances in (oxygen, nutrients) and waste out</p>
            </div>
            <div class="key-concept-card">
              <h4>Cytoplasm</h4>
              <p><strong>Function:</strong> Jelly-like substance where most cell activities occur</p>
              <p><strong>Contains:</strong> Water, nutrients, and structures needed for cell functions</p>
              <p><strong>Key Point:</strong> All chemical reactions happen here</p>
            </div>
            <div class="key-concept-card">
              <h4>Nucleus</h4>
              <p><strong>Function:</strong> Control center of the cell, directs all activities</p>
              <p><strong>Contains:</strong> DNA (genetic material/instructions for cell)</p>
              <p><strong>Key Point:</strong> Like the "brain" of the cell, controls growth and reproduction</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> All cells have cell membrane, cytoplasm, and nucleus. These are the THREE basic parts found in both plant and animal cells. Cells are too small to see with naked eye - need microscope.
          </div>
        `
      },
      {
        heading: 'Plant vs Animal Cells',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Both Plant & Animal Cells Have</h4>
              <p>• <strong>Cell membrane:</strong> Controls entry/exit of substances</p>
              <p>• <strong>Cytoplasm:</strong> Where cell activities occur</p>
              <p>• <strong>Nucleus:</strong> Control center with DNA</p>
            </div>
            <div class="key-concept-card">
              <h4>Only Plant Cells Have</h4>
              <p>• <strong>Cell wall:</strong> Rigid outer layer (outside cell membrane) for support and protection, made of cellulose</p>
              <p>• <strong>Chloroplasts:</strong> Green structures containing chlorophyll for photosynthesis (making food)</p>
              <p>• <strong>Large vacuole:</strong> Large fluid-filled space for storing water, nutrients, and waste</p>
            </div>
            <div class="key-concept-card">
              <h4>Animal Cells Characteristics</h4>
              <p>• <strong>No cell wall:</strong> More flexible shape</p>
              <p>• <strong>No chloroplasts:</strong> Cannot make own food</p>
              <p>• <strong>Small vacuoles:</strong> Or no vacuoles</p>
              <p>• <strong>Shape:</strong> Usually irregular or round</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Plant cells are usually rectangular/box-shaped (because of cell wall). Animal cells are more rounded/irregular. Chloroplasts make plants green and allow them to make food. Cell wall gives plants rigid structure to stand upright.
          </div>
        `
      },
      {
        heading: 'Organization of Living Things',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>1. Cells</h4>
              <p><strong>Definition:</strong> Basic unit of life, smallest living unit</p>
              <p><strong>Examples:</strong> Muscle cell (long for contraction), nerve cell (long with branches for signals), red blood cell (carries oxygen)</p>
            </div>
            <div class="key-concept-card">
              <h4>2. Tissues</h4>
              <p><strong>Definition:</strong> Group of similar cells working together for same function</p>
              <p><strong>Examples:</strong> Muscle tissue (many muscle cells), nervous tissue (nerve cells), leaf tissue (many leaf cells)</p>
            </div>
            <div class="key-concept-card">
              <h4>3. Organs</h4>
              <p><strong>Definition:</strong> Different types of tissues working together</p>
              <p><strong>Examples:</strong> Heart (muscle + nerve tissues), stomach (muscle + lining tissues), leaf (many tissue types)</p>
            </div>
            <div class="key-concept-card">
              <h4>4. Organ Systems</h4>
              <p><strong>Definition:</strong> Group of organs working together for major function</p>
              <p><strong>Examples:</strong> Digestive system (mouth, stomach, intestines), respiratory system (nose, trachea, lungs)</p>
            </div>
            <div class="key-concept-card">
              <h4>5. Organism</h4>
              <p><strong>Definition:</strong> Complete living thing with all systems working together</p>
              <p><strong>Examples:</strong> Human, dog, plant, tree</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Organization levels from smallest to largest: Cells → Tissues → Organs → Organ Systems → Organism. Each level builds on the previous one. Remember this sequence!
          </div>
        `
      },
      {
        heading: 'Human Body Systems',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Digestive System</h4>
              <p><strong>Function:</strong> Breaks down food into small nutrients that body can absorb</p>
              <p><strong>Pathway:</strong> Mouth (chewing, saliva) → Esophagus (tube to stomach) → Stomach (acid digests) → Small Intestine (nutrients absorbed) → Large Intestine (water absorbed, waste formed)</p>
              <p><strong>Key organs:</strong> Liver (produces bile), pancreas (produces enzymes)</p>
            </div>
            <div class="key-concept-card">
              <h4>Respiratory System</h4>
              <p><strong>Function:</strong> Takes in oxygen (O₂) for cells, removes carbon dioxide (CO₂) waste</p>
              <p><strong>Pathway:</strong> Nose/Mouth (air enters) → Trachea (windpipe) → Bronchi (branches) → Lungs (air sacs/alveoli for gas exchange)</p>
              <p><strong>Process:</strong> Oxygen enters blood, carbon dioxide exits blood</p>
            </div>
            <div class="key-concept-card">
              <h4>Circulatory System</h4>
              <p><strong>Function:</strong> Transports oxygen, nutrients, hormones to cells; removes carbon dioxide and waste from cells</p>
              <p><strong>Parts:</strong> Heart (pumps blood), arteries (carry blood away from heart), veins (carry blood to heart), capillaries (tiny vessels where exchange occurs)</p>
              <p><strong>Blood:</strong> Red cells (carry oxygen), white cells (fight disease), platelets (clot blood), plasma (liquid part)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> All body systems work together. Digestive gets nutrients, respiratory gets oxygen, circulatory transports both to all cells. If one system fails, others are affected.
          </div>
        `
      },
      {
        heading: 'Plant Systems',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Transport System</h4>
              <p><strong>Xylem vessels:</strong> Tube-like structures that transport water and mineral salts UP from roots to leaves (one-way)</p>
              <p><strong>Phloem vessels:</strong> Tube-like structures that transport food (glucose) DOWN from leaves to all parts (can go up or down)</p>
              <p><strong>Location:</strong> Both found in stems, roots, and leaves</p>
            </div>
            <div class="key-concept-card">
              <h4>Support System</h4>
              <p><strong>Stem:</strong> Provides main support, holds plant upright</p>
              <p><strong>Cell walls:</strong> Rigid structure in each cell provides strength</p>
              <p><strong>Water pressure:</strong> Water in cells keeps them firm and plant upright (wilts without water)</p>
            </div>
            <div class="key-concept-card">
              <h4>Reproductive System</h4>
              <p><strong>Flowers:</strong> Contain male parts (stamen) and female parts (pistil) for reproduction</p>
              <p><strong>Seeds:</strong> Formed after pollination and fertilization</p>
              <p><strong>Fruits:</strong> Protect seeds and help in dispersal</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Xylem transports water UP only. Phloem transports food in both directions. Plant wilts when cells lose water pressure. All flowering plants have these three systems working together.
          </div>
        `
      }
    ]
  },

  'systems-reproduction': {
    title: 'Theme: Systems - Reproduction in Plants',
    description: 'Flowering plants reproduce sexually through pollination and fertilization, producing seeds that grow into new plants.',
    sections: [
      {
        heading: 'Parts of a Flower',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Sepals</h4>
              <p><strong>Function:</strong> Protect the flower bud before it opens</p>
              <p><strong>Appearance:</strong> Green, leaf-like structures at base of flower</p>
              <p><strong>Location:</strong> Outermost part</p>
            </div>
            <div class="key-concept-card">
              <h4>Petals</h4>
              <p><strong>Function:</strong> Attract pollinators (insects, birds, bats) with bright colors and scent</p>
              <p><strong>Appearance:</strong> Colorful, often scented</p>
              <p><strong>Note:</strong> Wind-pollinated flowers have small, dull petals</p>
            </div>
            <div class="key-concept-card">
              <h4>Stamen (Male Part)</h4>
              <p><strong>Function:</strong> Produces pollen grains (male sex cells)</p>
              <p><strong>Parts:</strong></p>
              <p>• <strong>Anther:</strong> Sac at top that produces and stores pollen</p>
              <p>• <strong>Filament:</strong> Stalk that holds up the anther</p>
            </div>
            <div class="key-concept-card">
              <h4>Pistil/Carpel (Female Part)</h4>
              <p><strong>Function:</strong> Receives pollen and produces seeds</p>
              <p><strong>Parts:</strong></p>
              <p>• <strong>Stigma:</strong> Sticky surface at top to catch and trap pollen</p>
              <p>• <strong>Style:</strong> Tube connecting stigma to ovary</p>
              <p>• <strong>Ovary:</strong> Base containing ovules (female sex cells/eggs)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Male part = Stamen (anther + filament). Female part = Pistil (stigma + style + ovary). Pollen from anther must reach stigma for reproduction. Remember: Stigma is sticky to catch pollen!
          </div>
        `
      },
      {
        heading: 'Sexual Reproduction in Plants',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>1. Pollination</h4>
              <p><strong>Definition:</strong> Transfer of pollen grains from anther (male) to stigma (female)</p>
              <p><strong>Self-pollination:</strong> Pollen lands on stigma of same flower or another flower on same plant</p>
              <p><strong>Cross-pollination:</strong> Pollen transferred to stigma of flower on different plant (better for genetic variety)</p>
              <p><strong>Agents:</strong> Wind, insects (bees, butterflies), birds, water, animals</p>
            </div>
            <div class="key-concept-card">
              <h4>2. Fertilization</h4>
              <p><strong>Process:</strong> After pollen lands on stigma, pollen tube grows down through style to ovary</p>
              <p><strong>Fusion:</strong> Male nucleus from pollen joins with female ovule nucleus in ovary</p>
              <p><strong>Result:</strong> Fertilized ovule will develop into seed</p>
            </div>
            <div class="key-concept-card">
              <h4>3. Seed and Fruit Formation</h4>
              <p><strong>After fertilization:</strong></p>
              <p>• Fertilized ovule → Seed (contains embryo/baby plant + stored food)</p>
              <p>• Ovary wall → Fruit (protects seeds)</p>
              <p>• Other parts wither and fall off (petals, stamen, style)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Pollination ≠ Fertilization! Pollination = pollen transfer. Fertilization = nuclei fusion. Sequence: Pollination first → Then Fertilization → Then Fruit & Seed formation.
          </div>
        `
      },
      {
        heading: 'Seed Dispersal',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Wind Dispersal</h4>
              <p><strong>Adaptations:</strong> Light seeds, wings, parachute-like structures (hairs), or flattened shape</p>
              <p><strong>Examples:</strong> Dandelion (parachute of hairs), maple (winged), lalang grass</p>
              <p><strong>How:</strong> Wind carries seeds far from parent plant</p>
            </div>
            <div class="key-concept-card">
              <h4>Water Dispersal</h4>
              <p><strong>Adaptations:</strong> Waterproof outer layer, fibrous or spongy tissue to float, air spaces</p>
              <p><strong>Examples:</strong> Coconut, water lily, mangrove</p>
              <p><strong>How:</strong> Seeds float on water to new locations</p>
            </div>
            <div class="key-concept-card">
              <h4>Animal Dispersal</h4>
              <p><strong>Type 1 - Hooks/Spines:</strong> Stick to animal fur or clothing, carried away</p>
              <p><strong>Examples:</strong> Burdock, cocklebur</p>
              <p><strong>Type 2 - Eaten by animals:</strong> Juicy, edible fruits. Seeds pass through digestive system unharmed, dispersed in droppings</p>
              <p><strong>Examples:</strong> Berries, guava, mango, papaya</p>
            </div>
            <div class="key-concept-card">
              <h4>Self-Dispersal (Explosive)</h4>
              <p><strong>Adaptations:</strong> Dry pods that split suddenly when ripe, shooting seeds out</p>
              <p><strong>Examples:</strong> Peas, beans, balsam, rubber seeds</p>
              <p><strong>How:</strong> Pod dries and bursts, flinging seeds away</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Why Dispersal Important?</strong> Prevents overcrowding, reduces competition for sunlight/water/nutrients, allows plants to colonize new areas.
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Match seed features to dispersal method. Wings/light = wind. Hooks = animals (on fur). Fleshy/juicy = animals (eaten). Waterproof/floats = water. Pod bursts = self-dispersal.
          </div>
        `
      },
      {
        heading: 'Seed Germination',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Conditions Needed</h4>
              <p><strong>1. Water:</strong> Seed must absorb water to soften seed coat and activate enzymes</p>
              <p><strong>2. Suitable Temperature:</strong> Warm temperature (not too hot or cold) for enzyme activity</p>
              <p><strong>3. Oxygen:</strong> For respiration to release energy for growth</p>
              <p><strong>NOT needed:</strong> Light and soil (not essential for germination itself)</p>
            </div>
            <div class="key-concept-card">
              <h4>Germination Process</h4>
              <p><strong>Step 1:</strong> Seed absorbs water and swells</p>
              <p><strong>Step 2:</strong> Seed coat softens and breaks open</p>
              <p><strong>Step 3:</strong> Root (radicle) emerges first and grows downward</p>
              <p><strong>Step 4:</strong> Shoot emerges and grows upward toward light</p>
              <p><strong>Step 5:</strong> First leaves open and begin photosynthesis</p>
            </div>
            <div class="key-concept-card">
              <h4>Food Source</h4>
              <p><strong>Stored food:</strong> Seed contains stored food (starch) in cotyledons or endosperm</p>
              <p><strong>Purpose:</strong> Provides energy for initial growth until seedling has leaves</p>
              <p><strong>Later:</strong> Once leaves develop, plant makes own food through photosynthesis</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Three conditions needed: Water, Oxygen, Suitable Temperature. Light is NOT needed for germination (but needed after for growth). Root always grows DOWN first (toward water), shoot grows UP (toward light).
          </div>
        `
      }
    ]
  },

  'systems-animal-reproduction': {
    title: 'Theme: Systems - Reproduction in Animals',
    description: 'Animals reproduce to continue their species. Most animals reproduce sexually, requiring male and female parents.',
    sections: [
      {
        heading: 'Sexual Reproduction in Animals',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Sexual Reproduction Process</h4>
              <p><strong>Definition:</strong> Two parents (male and female) are needed to produce offspring</p>
              <p><strong>Male sex cell:</strong> Sperm</p>
              <p><strong>Female sex cell:</strong> Egg/Ovum</p>
              <p><strong>Fertilization:</strong> Sperm joins with egg to form a fertilized egg (zygote)</p>
              <p><strong>Development:</strong> Fertilized egg develops into new organism</p>
            </div>
            <div class="key-concept-card">
              <h4>Types of Animal Reproduction</h4>
              <p><strong>Internal Fertilization:</strong> Sperm and egg join inside female's body</p>
              <p>• Examples: Mammals, birds, reptiles, insects</p>
              <p><strong>External Fertilization:</strong> Sperm and egg join outside body (usually in water)</p>
              <p>• Examples: Fish, frogs, sea animals</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Sexual reproduction needs TWO parents (male + female). Offspring have characteristics from both parents. Internal fertilization = fertilization inside body. External fertilization = fertilization outside body in water.
          </div>
        `
      },
      {
        heading: 'How Animals Give Birth',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Mammals (Viviparous)</h4>
              <p><strong>Method:</strong> Give birth to live young</p>
              <p><strong>Development:</strong> Baby develops inside mother's body (uterus/womb)</p>
              <p><strong>Nutrition:</strong> Mother provides food through placenta, then milk after birth</p>
              <p><strong>Examples:</strong> Humans, dogs, cats, cows, whales, dolphins</p>
              <p><strong>Care:</strong> Parents care for young after birth</p>
            </div>
            <div class="key-concept-card">
              <h4>Egg-laying Animals (Oviparous)</h4>
              <p><strong>Method:</strong> Lay eggs, young hatch from eggs</p>
              <p><strong>Birds:</strong> Hard-shelled eggs, parent sits on eggs to keep warm</p>
              <p><strong>Reptiles:</strong> Soft leathery eggs (snakes, turtles, lizards)</p>
              <p><strong>Amphibians:</strong> Jelly-like eggs in water (frogs, toads)</p>
              <p><strong>Fish:</strong> Lay many eggs in water</p>
              <p><strong>Insects:</strong> Lay eggs on plants or in soil</p>
            </div>
            <div class="key-concept-card">
              <h4>Special Cases</h4>
              <p><strong>Marsupials:</strong> Give birth to very tiny young that continue developing in mother's pouch</p>
              <p>• Examples: Kangaroo, koala, opossum</p>
              <p><strong>Monotremes:</strong> Mammals that lay eggs!</p>
              <p>• Examples: Platypus, echidna (only two types)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Viviparous = give birth to live young (mammals). Oviparous = lay eggs (birds, reptiles, fish, insects, amphibians). Most mammals give birth to live young, but platypus and echidna lay eggs!
          </div>
        `
      },
      {
        heading: 'Human Reproduction System',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Male Reproductive System</h4>
              <p><strong>Testes:</strong> Produce sperm (male sex cells)</p>
              <p><strong>Sperm:</strong> Tiny cells with tail for swimming, millions produced</p>
              <p><strong>Function:</strong> Deliver sperm to female reproductive system</p>
            </div>
            <div class="key-concept-card">
              <h4>Female Reproductive System</h4>
              <p><strong>Ovaries:</strong> Produce eggs/ova (female sex cells), release one egg per month</p>
              <p><strong>Uterus (Womb):</strong> Where baby develops and grows during pregnancy</p>
              <p><strong>Function:</strong> Provide environment for fertilization and baby development</p>
            </div>
            <div class="key-concept-card">
              <h4>Pregnancy and Birth</h4>
              <p><strong>Fertilization:</strong> Sperm meets and joins with egg</p>
              <p><strong>Pregnancy:</strong> Fertilized egg implants in uterus, develops for about 9 months (40 weeks)</p>
              <p><strong>Placenta:</strong> Special organ that provides food and oxygen from mother to baby</p>
              <p><strong>Umbilical cord:</strong> Connects baby to placenta</p>
              <p><strong>Birth:</strong> Baby is pushed out through birth canal</p>
              <p><strong>After birth:</strong> Mother feeds baby with breast milk</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Human baby develops inside mother's uterus for 9 months. Baby gets food and oxygen through umbilical cord connected to placenta. Humans are mammals - give birth to live young and feed with milk.
          </div>
        `
      },
      {
        heading: 'Parental Care in Animals',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>High Parental Care</h4>
              <p><strong>Mammals & Birds:</strong> Care for young extensively</p>
              <p>• Feed and protect young</p>
              <p>• Teach survival skills</p>
              <p>• Few offspring but higher survival rate</p>
              <p><strong>Examples:</strong> Humans (many years), elephants, lions, eagles, penguins</p>
            </div>
            <div class="key-concept-card">
              <h4>Low Parental Care</h4>
              <p><strong>Fish, Amphibians, Most Reptiles:</strong> Little or no care</p>
              <p>• Lay many eggs and leave</p>
              <p>• Young must survive on their own</p>
              <p>• Many offspring but lower survival rate</p>
              <p><strong>Examples:</strong> Fish lay thousands of eggs, frogs lay hundreds, sea turtles</p>
            </div>
            <div class="key-concept-card">
              <h4>Moderate Care</h4>
              <p><strong>Some Reptiles & Insects:</strong> Provide some protection</p>
              <p>• Crocodiles guard nest and carry babies to water</p>
              <p>• Some spiders protect egg sacs</p>
              <p>• Bees and ants care for larvae in colony</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Why Different Strategies?</strong> More parental care = fewer offspring but higher survival. Less care = many offspring but most don't survive. Both strategies help species continue.
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Animals with high parental care produce fewer young (humans usually 1 baby). Animals with low parental care produce many young (fish produce thousands of eggs). Trade-off between quantity and quality of care.
          </div>
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
              <p><strong>What it does:</strong> Allows us to see objects and colors</p>
              <p><strong>Sources:</strong> Sun (natural), light bulbs, candles, fire, torches, stars</p>
              <p><strong>Properties:</strong> Travels in straight lines, fastest form of energy</p>
            </div>
            <div class="key-concept-card">
              <h4>Heat Energy (Thermal)</h4>
              <p><strong>What it does:</strong> Makes objects warmer, can change state of matter</p>
              <p><strong>Sources:</strong> Sun, fire, friction (rubbing), burning fuel, electricity, hot objects</p>
              <p><strong>Properties:</strong> Always flows from hot to cold objects</p>
            </div>
            <div class="key-concept-card">
              <h4>Sound Energy</h4>
              <p><strong>What it does:</strong> Allows us to hear, produced by vibrations</p>
              <p><strong>Sources:</strong> Musical instruments, voices, speakers, bells, animals</p>
              <p><strong>Properties:</strong> Needs medium to travel, cannot travel through vacuum</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical Energy</h4>
              <p><strong>What it does:</strong> Powers devices and appliances</p>
              <p><strong>Sources:</strong> Batteries, power stations, solar panels, generators, wind turbines</p>
              <p><strong>Properties:</strong> Flows through conductors (metals), can be converted to other forms easily</p>
            </div>
            <div class="key-concept-card">
              <h4>Kinetic Energy (Movement)</h4>
              <p><strong>What it does:</strong> Energy of moving objects</p>
              <p><strong>Examples:</strong> Running person, moving car, flowing water, blowing wind, rolling ball</p>
              <p><strong>Properties:</strong> Faster movement = more kinetic energy, heavier object = more energy</p>
            </div>
            <div class="key-concept-card">
              <h4>Potential Energy (Stored)</h4>
              <p><strong>What it does:</strong> Stored energy ready to be used</p>
              <p><strong>Examples:</strong> Stretched rubber band, compressed spring, object at height, wound-up toy</p>
              <p><strong>Properties:</strong> Can be converted to kinetic energy when released</p>
            </div>
            <div class="key-concept-card">
              <h4>Chemical Energy</h4>
              <p><strong>What it does:</strong> Energy stored in substances</p>
              <p><strong>Sources:</strong> Food, fuel (petrol, coal, natural gas), batteries, wood</p>
              <p><strong>Properties:</strong> Released when substance is burned or digested</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Energy cannot be created or destroyed, only converted from one form to another. All living things need energy to survive. The Sun is Earth's main source of energy.
          </div>
        `
      },
      {
        heading: 'Energy Conversions',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Light to Electrical</h4>
              <p><strong>Solar panel:</strong> Converts sunlight to electrical energy</p>
              <p><strong>Use:</strong> Power homes, calculators, street lights</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical to Light & Heat</h4>
              <p><strong>Light bulb:</strong> Electrical → Light + Heat (heat is wasted)</p>
              <p><strong>LED bulbs:</strong> More efficient, less heat waste</p>
            </div>
            <div class="key-concept-card">
              <h4>Chemical to Other Forms</h4>
              <p><strong>Battery-powered toy:</strong> Chemical → Electrical → Kinetic (movement) + Sound + Light</p>
              <p><strong>Burning fuel:</strong> Chemical → Heat + Light</p>
              <p><strong>Photosynthesis:</strong> Light → Chemical (food in plants)</p>
            </div>
            <div class="key-concept-card">
              <h4>Kinetic to Other Forms</h4>
              <p><strong>Rubbing hands:</strong> Kinetic (movement) → Heat (friction)</p>
              <p><strong>Wind turbine:</strong> Kinetic (wind) → Electrical</p>
              <p><strong>Hydroelectric:</strong> Kinetic (flowing water) → Electrical</p>
            </div>
            <div class="key-concept-card">
              <h4>Food Energy in Living Things</h4>
              <p><strong>Animals eating:</strong> Chemical (in food) → Kinetic (movement) + Heat (body warmth)</p>
              <p><strong>Why we eat:</strong> Get energy for all life activities</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Energy conversion always involves some energy being "wasted" as heat. No energy conversion is 100% efficient. Track energy conversions step-by-step in devices.
          </div>
        `
      },
      {
        heading: 'Heat Transfer',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Conduction</h4>
              <p><strong>Definition:</strong> Heat transfer through direct contact between objects/materials</p>
              <p><strong>How it works:</strong> Heat passes from particle to particle in solids</p>
              <p><strong>Good conductors:</strong> Metals (copper, aluminum, iron, steel)</p>
              <p><strong>Poor conductors (insulators):</strong> Wood, plastic, air, cloth, paper</p>
              <p><strong>Examples:</strong> Metal spoon gets hot in hot soup, touching hot stove, ironing clothes</p>
            </div>
            <div class="key-concept-card">
              <h4>Convection</h4>
              <p><strong>Definition:</strong> Heat transfer through movement of fluids (liquids and gases)</p>
              <p><strong>How it works:</strong> Hot fluid rises (less dense), cold fluid sinks (more dense), creating circulation</p>
              <p><strong>Medium needed:</strong> Only occurs in liquids and gases, not solids</p>
              <p><strong>Examples:</strong> Boiling water (hot water rises to top), air conditioning (cool air sinks), sea breeze, heating a room</p>
            </div>
            <div class="key-concept-card">
              <h4>Radiation</h4>
              <p><strong>Definition:</strong> Heat transfer through electromagnetic waves/rays (infrared)</p>
              <p><strong>How it works:</strong> Heat travels as waves, no medium needed</p>
              <p><strong>Special property:</strong> Can travel through vacuum (empty space)</p>
              <p><strong>Examples:</strong> Sun warming Earth, standing near fire, microwave oven, heat from light bulb</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Conduction needs contact. Convection needs fluids (liquids/gases). Radiation doesn't need any medium. Heat always flows from hot to cold until temperatures equal.
          </div>
        `
      },
      {
        heading: 'Energy Sources',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Renewable Energy (Won't Run Out)</h4>
              <p><strong>Solar:</strong> From sunlight using solar panels</p>
              <p><strong>Wind:</strong> Wind turns turbines to generate electricity</p>
              <p><strong>Hydroelectric:</strong> Flowing/falling water spins turbines</p>
              <p><strong>Geothermal:</strong> Heat from inside Earth</p>
              <p><strong>Biomass:</strong> Energy from plant/animal waste, wood</p>
              <p><strong>Advantages:</strong> Clean, won't run out, environmentally friendly</p>
              <p><strong>Disadvantages:</strong> Weather-dependent, expensive to set up</p>
            </div>
            <div class="key-concept-card">
              <h4>Non-Renewable Energy (Will Run Out)</h4>
              <p><strong>Coal:</strong> Burned in power stations to produce electricity</p>
              <p><strong>Oil/Petroleum:</strong> Refined into petrol, diesel for vehicles</p>
              <p><strong>Natural Gas:</strong> Used for cooking, heating, electricity</p>
              <p><strong>Nuclear:</strong> Uranium fuel produces huge amounts of energy</p>
              <p><strong>Formation:</strong> Formed from dead organisms over millions of years (fossil fuels)</p>
              <p><strong>Advantages:</strong> Reliable, produces lots of energy, readily available now</p>
              <p><strong>Disadvantages:</strong> Limited supply, causes pollution, contributes to climate change</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Why Switch to Renewable?</strong> Non-renewable sources are running out and cause pollution. Renewable sources are cleaner and sustainable for future generations.
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Renewable = can be replaced/won't run out (sun, wind, water). Non-renewable = finite supply/will run out (fossil fuels). We should conserve energy and use more renewable sources.
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
            <li><strong>Travels in straight lines:</strong> Light rays move in straight paths (can see with laser pointer or sunbeams through clouds)</li>
            <li><strong>Travels very fast:</strong> 300,000 km/s - fastest thing in universe! Can travel from Sun to Earth in about 8 minutes</li>
            <li><strong>Reflection:</strong> Light bounces off surfaces (mirrors, shiny objects). We see objects because they reflect light into our eyes</li>
            <li><strong>Refraction:</strong> Light bends when entering different materials (air to water, air to glass). Makes objects look bent or shifted</li>
            <li><strong>White light composition:</strong> Made of 7 colors - Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV/rainbow)</li>
            <li><strong>Can travel through vacuum:</strong> Doesn't need medium (unlike sound). This is why we can see sunlight and stars</li>
          </ul>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Light travels in straight lines at very high speed. Light can be reflected (bounces) or refracted (bends). White light contains all 7 rainbow colors.
          </div>
        `
      },
      {
        heading: 'Light and Materials',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Transparent</h4>
              <p><strong>Definition:</strong> Allows all light to pass through</p>
              <p><strong>Result:</strong> Can see clearly through the material</p>
              <p><strong>Examples:</strong> Clear glass, clean water, air, clear plastic wrap</p>
              <p><strong>Shadow:</strong> Does NOT form shadow (or very faint)</p>
            </div>
            <div class="key-concept-card">
              <h4>Translucent</h4>
              <p><strong>Definition:</strong> Allows some light to pass through but scatters it</p>
              <p><strong>Result:</strong> Cannot see clearly, blurry view</p>
              <p><strong>Examples:</strong> Frosted glass, wax paper, thin cloth, bathroom window glass, tissue paper</p>
              <p><strong>Shadow:</strong> Forms faint/blurry shadow</p>
            </div>
            <div class="key-concept-card">
              <h4>Opaque</h4>
              <p><strong>Definition:</strong> Blocks all light, no light passes through</p>
              <p><strong>Result:</strong> Cannot see through at all</p>
              <p><strong>Examples:</strong> Wood, metal, brick, cardboard, thick books, your hand</p>
              <p><strong>Shadow:</strong> Forms dark, clear shadow</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Transparent = see clearly through (all light passes). Translucent = see blurry/partial light passes. Opaque = cannot see through/no light passes/forms shadow.
          </div>
        `
      },
      {
        heading: 'Reflection and Refraction',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Reflection</h4>
              <p><strong>Definition:</strong> Light bounces off surfaces</p>
              <p><strong>Law:</strong> Angle of incidence = Angle of reflection</p>
              <p><strong>Best reflectors:</strong> Smooth, shiny surfaces (mirrors, polished metal, still water)</p>
              <p><strong>Why we see objects:</strong> Light reflects off objects into our eyes</p>
              <p><strong>Examples:</strong> Seeing your image in mirror, seeing moon (reflects sunlight), shiny spoon reflection</p>
            </div>
            <div class="key-concept-card">
              <h4>Refraction</h4>
              <p><strong>Definition:</strong> Light bends when passing from one material to another</p>
              <p><strong>When it happens:</strong> Light changes speed entering different materials</p>
              <p><strong>Air to water:</strong> Light slows down and bends</p>
              <p><strong>Examples:</strong> Straw looks bent in glass of water, swimming pool looks shallower than it is, fish appears at different position, rainbow formation (light bending through water droplets)</p>
              <p><strong>Applications:</strong> Eyeglasses, camera lenses, magnifying glass use refraction</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Reflection = light bounces off (like a ball bouncing off wall). Refraction = light bends when entering different materials (like walking from land into water). Both follow predictable rules.
          </div>
        `
      },
      {
        heading: 'Properties of Sound',
        content: `
          <ul class="concept-list">
            <li><strong>Produced by vibrations:</strong> All sounds come from objects vibrating back and forth (strings, drums, vocal cords, speakers)</li>
            <li><strong>Needs a medium to travel:</strong> Must travel through solid, liquid, or gas. CANNOT travel through vacuum (empty space with no air)</li>
            <li><strong>Speed in different materials:</strong> Travels fastest in solids, slower in liquids, slowest in gases
              <br>• Steel (solid): ~5,000 m/s
              <br>• Water (liquid): ~1,500 m/s
              <br>• Air (gas): ~340 m/s</li>
            <li><strong>Sound travels slower than light:</strong> This is why you see lightning before hearing thunder</li>
            <li><strong>Reflection:</strong> Sound can bounce off hard surfaces creating echoes</li>
            <li><strong>Absorption:</strong> Soft materials absorb sound (carpets, curtains, foam reduce noise)</li>
          </ul>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Sound needs a medium (solid/liquid/gas) to travel - no sound in space! Sound travels fastest in solids. All sounds are produced by vibrations.
          </div>
        `
      },
      {
        heading: 'Characteristics of Sound',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Pitch (High or Low)</h4>
              <p><strong>Definition:</strong> How high or low a sound is</p>
              <p><strong>High pitch:</strong> Fast vibrations (high frequency)
                <br>• Examples: Whistle, bird chirping, mosquito buzz, violin, woman's voice</p>
              <p><strong>Low pitch:</strong> Slow vibrations (low frequency)
                <br>• Examples: Thunder, drum, man's voice, lion's roar, bass guitar</p>
              <p><strong>How to change:</strong> Short/thin/tight strings = high pitch. Long/thick/loose strings = low pitch</p>
            </div>
            <div class="key-concept-card">
              <h4>Volume/Loudness (Loud or Soft)</h4>
              <p><strong>Definition:</strong> How loud or soft a sound is</p>
              <p><strong>Loud sounds:</strong> Large vibrations (big amplitude)
                <br>• Examples: Explosion, siren, rock concert, shouting
                <br>• Can damage hearing if too loud</p>
              <p><strong>Soft sounds:</strong> Small vibrations (small amplitude)
                <br>• Examples: Whisper, leaves rustling, quiet music, typing</p>
              <p><strong>How to change:</strong> Hit/pluck/blow harder = louder. Gentler = softer</p>
              <p><strong>Distance:</strong> Sounds get softer as you move farther away</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Pitch = high or low (frequency of vibrations). Volume = loud or soft (size of vibrations). They are DIFFERENT - you can have high pitch soft sound or low pitch loud sound!
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
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Cell/Battery</h4>
              <p><strong>Function:</strong> Source of electrical energy, pushes electricity around circuit</p>
              <p><strong>Energy conversion:</strong> Chemical energy → Electrical energy</p>
              <p><strong>Terminals:</strong> Positive (+) and Negative (-) ends</p>
              <p><strong>Symbol:</strong> Long line = positive, short line = negative</p>
            </div>
            <div class="key-concept-card">
              <h4>Wires</h4>
              <p><strong>Function:</strong> Conductors that carry electricity around circuit</p>
              <p><strong>Material:</strong> Usually copper (excellent conductor)</p>
              <p><strong>Coating:</strong> Plastic insulation for safety</p>
            </div>
            <div class="key-concept-card">
              <h4>Switch</h4>
              <p><strong>Function:</strong> Controls flow of electricity</p>
              <p><strong>Open (OFF):</strong> Circuit broken, no electricity flows, devices don't work</p>
              <p><strong>Closed (ON):</strong> Circuit complete, electricity flows, devices work</p>
            </div>
            <div class="key-concept-card">
              <h4>Bulb</h4>
              <p><strong>Function:</strong> Produces light</p>
              <p><strong>Energy conversion:</strong> Electrical → Light + Heat</p>
              <p><strong>How it works:</strong> Thin filament inside glows when electricity passes through</p>
            </div>
            <div class="key-concept-card">
              <h4>Motor</h4>
              <p><strong>Function:</strong> Produces movement</p>
              <p><strong>Energy conversion:</strong> Electrical → Kinetic (movement)</p>
              <p><strong>Uses:</strong> Fans, toys, washing machines, drills</p>
            </div>
            <div class="key-concept-card">
              <h4>Buzzer</h4>
              <p><strong>Function:</strong> Produces sound</p>
              <p><strong>Energy conversion:</strong> Electrical → Sound</p>
              <p><strong>Uses:</strong> Alarms, doorbells, timers</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Every circuit needs: (1) Energy source (battery), (2) Conducting path (wires), (3) Component to use energy (bulb/motor/buzzer). Switch is optional but useful to control circuit.
          </div>
        `
      },
      {
        heading: 'Complete Circuit',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>What Makes a Complete Circuit</h4>
              <p>• Must form a closed loop with no breaks</p>
              <p>• All components properly connected with wires</p>
              <p>• Circuit must include energy source (battery)</p>
              <p>• Switch must be closed (if present)</p>
            </div>
            <div class="key-concept-card">
              <h4>Incomplete/Broken Circuit</h4>
              <p><strong>Causes:</strong></p>
              <p>• Switch is open (turned off)</p>
              <p>• Wire is disconnected or broken</p>
              <p>• Bulb is removed or burned out</p>
              <p>• Battery is dead or removed</p>
              <p><strong>Result:</strong> Electricity cannot flow, components don't work</p>
            </div>
            <div class="key-concept-card">
              <h4>Direction of Flow</h4>
              <p><strong>Conventional flow:</strong> Electricity flows from positive (+) terminal around circuit to negative (-) terminal</p>
              <p><strong>Remember:</strong> Must have complete path from + to - for electricity to flow</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Circuit must be CLOSED (complete loop) for electricity to flow. Any break stops the flow. Think of it like water flowing through pipes - if pipe is broken, water stops flowing.
          </div>
        `
      },
      {
        heading: 'Conductors and Insulators',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Electrical Conductors</h4>
              <p><strong>Definition:</strong> Materials that allow electricity to flow through easily</p>
              <p><strong>Examples:</strong> All metals - copper (best for wires), aluminum, iron, steel, silver, gold, brass</p>
              <p><strong>Also conducts:</strong> Graphite (pencil lead), salt water, human body (be careful!)</p>
              <p><strong>Uses:</strong> Electrical wires, circuit components, plugs</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical Insulators</h4>
              <p><strong>Definition:</strong> Materials that do NOT allow electricity to flow</p>
              <p><strong>Examples:</strong> Plastic, rubber, wood, glass, paper, cloth, ceramics, air, pure water</p>
              <p><strong>Uses:</strong> Wire coating, plug covers, switch cases, gloves for safety, tool handles</p>
              <p><strong>Safety:</strong> Protect us from electric shocks</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Why Wires Have Plastic Coating?</strong> Copper wire (conductor) carries electricity. Plastic coating (insulator) prevents electricity from escaping and protects us from shocks.
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Conductors = allow electricity (all metals). Insulators = block electricity (plastic, rubber, wood). Same materials that conduct heat usually conduct electricity (metals do both).
          </div>
        `
      },
      {
        heading: 'Series vs Parallel Circuits',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Series Circuit</h4>
              <p><strong>Design:</strong> Components connected one after another in single path (like beads on a string)</p>
              <p><strong>Effect of adding bulbs:</strong> Bulbs get dimmer (share energy)</p>
              <p><strong>If one bulb breaks:</strong> All bulbs go out (circuit broken)</p>
              <p><strong>Switch:</strong> One switch controls all bulbs</p>
              <p><strong>Current:</strong> Same throughout circuit</p>
              <p><strong>Example:</strong> Old Christmas lights (if one breaks, all go out)</p>
              <p><strong>Advantage:</strong> Simple, uses less wire</p>
              <p><strong>Disadvantage:</strong> Not practical - one faulty bulb stops everything</p>
            </div>
            <div class="key-concept-card">
              <h4>Parallel Circuit</h4>
              <p><strong>Design:</strong> Components connected side-by-side with multiple paths (like ladder rungs)</p>
              <p><strong>Effect of adding bulbs:</strong> All bulbs stay equally bright (each gets full energy)</p>
              <p><strong>If one bulb breaks:</strong> Other bulbs still work (other paths available)</p>
              <p><strong>Switch:</strong> Can have individual switches for each branch</p>
              <p><strong>Current:</strong> Splits between branches</p>
              <p><strong>Example:</strong> House wiring, modern Christmas lights</p>
              <p><strong>Advantage:</strong> Reliable - devices work independently</p>
              <p><strong>Disadvantage:</strong> Needs more wire, more complex</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Series = one path/bulbs dim/all stop if one breaks. Parallel = multiple paths/bulbs bright/others work if one breaks. Home circuits are parallel so lights/appliances work independently.
          </div>
        `
      },
      {
        heading: 'Electrical Safety',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Water and Electricity</h4>
              <p>• NEVER touch electrical appliances with wet hands</p>
              <p>• Keep water away from electrical devices</p>
              <p>• Don't use electrical devices in bathroom near water</p>
              <p><strong>Why dangerous:</strong> Water conducts electricity, can cause severe shock</p>
            </div>
            <div class="key-concept-card">
              <h4>Safe Usage</h4>
              <p>• Don't overload sockets (too many plugs)</p>
              <p>• Turn off switches before handling appliances</p>
              <p>• Don't touch damaged wires or plugs</p>
              <p>• Don't poke objects into sockets</p>
              <p>• Keep electrical cords away from heat sources</p>
              <p>• Unplug appliances when not in use</p>
            </div>
            <div class="key-concept-card">
              <h4>If Emergency</h4>
              <p>• Never touch person being electrocuted</p>
              <p>• Turn off main switch first</p>
              <p>• Use non-conductor (wood, plastic) to separate person from source</p>
              <p>• Call for adult help immediately</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Electricity + Water = DANGER! Always keep them apart. Follow safety rules to prevent electric shocks and fires. When in doubt, ask an adult for help.
          </div>
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
              <p><strong>Definition:</strong> Pull between objects with mass (Earth pulls everything down)</p>
              <p><strong>Effects:</strong> Makes objects fall to ground, gives us weight</p>
              <p><strong>Examples:</strong> Apple falls, ball thrown up comes down, we stay on ground</p>
              <p><strong>Direction:</strong> Always downwards towards Earth's center</p>
              <p><strong>Facts:</strong> Works through air, stronger on bigger objects</p>
            </div>
            <div class="key-concept-card">
              <h4>Frictional Force</h4>
              <p><strong>Definition:</strong> Force between surfaces that touch, opposes motion</p>
              <p><strong>Effects:</strong> Slows/stops moving objects, produces heat</p>
              <p><strong>Examples:</strong> Brakes stop bicycle, hands rub warm, walking possible</p>
              <p><strong>Direction:</strong> Always opposite to motion</p>
              <p><strong>Depends on:</strong> Surface roughness, force pressing surfaces together</p>
            </div>
            <div class="key-concept-card">
              <h4>Magnetic Force</h4>
              <p><strong>Definition:</strong> Push or pull between magnets or magnetic materials</p>
              <p><strong>Effects:</strong> Attracts iron/steel/nickel/cobalt, repels like poles</p>
              <p><strong>Examples:</strong> Fridge magnets, compass needle, magnetic toys</p>
              <p><strong>Direction:</strong> Attraction (opposite poles) or repulsion (like poles)</p>
              <p><strong>Facts:</strong> Works through non-magnetic materials, doesn't need contact</p>
            </div>
            <div class="key-concept-card">
              <h4>Elastic/Spring Force</h4>
              <p><strong>Definition:</strong> Force from stretched/compressed elastic objects</p>
              <p><strong>Effects:</strong> Pushes/pulls object back to original shape</p>
              <p><strong>Examples:</strong> Rubber band snaps back, spring bounces, bow shoots arrow</p>
              <p><strong>Direction:</strong> Always towards original position</p>
              <p><strong>Facts:</strong> Stronger stretch = stronger force, stores energy</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Forces are pushes or pulls. Cannot see forces, but can see their effects on objects. Different types of forces work in different ways and situations.
          </div>
        `
      },
      {
        heading: 'Effects of Forces',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Change Speed</h4>
              <p><strong>Speed up (accelerate):</strong> Push swing, kick ball, pedal bicycle</p>
              <p><strong>Slow down (decelerate):</strong> Apply brakes, catch ball, friction stops car</p>
              <p><strong>Start moving:</strong> Push stationary cart, throw ball</p>
              <p><strong>Stop moving:</strong> Grab moving swing, goalkeeper catches ball</p>
            </div>
            <div class="key-concept-card">
              <h4>Change Direction</h4>
              <p><strong>Examples:</strong> Hit tennis ball with racket, wind changes kite direction, bounce ball off wall, steer car around corner</p>
              <p><strong>Note:</strong> Even if speed stays same, changing direction means force is acting</p>
              <p><strong>Circular motion:</strong> Needs continuous force towards center (e.g., swinging ball on string)</p>
            </div>
            <div class="key-concept-card">
              <h4>Change Shape</h4>
              <p><strong>Stretch:</strong> Pull rubber band, stretch spring, pull dough</p>
              <p><strong>Compress:</strong> Squeeze sponge, press spring, sit on cushion</p>
              <p><strong>Bend:</strong> Fold paper, bend wire, deform clay</p>
              <p><strong>Twist:</strong> Wring towel, twist balloon, turn doorknob</p>
              <p><strong>Permanent vs Temporary:</strong> Some materials return to shape (elastic), others don't (plastic)</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Balanced forces:</strong> Equal forces in opposite directions → no change in motion (e.g., tug-of-war draw, book on table)
          </div>
          <div class="example-box">
            <strong>Unbalanced forces:</strong> Forces not equal → object changes motion (e.g., push stronger than friction, ball falls due to gravity)
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Forces cause THREE main effects: (1) Change speed (faster/slower/start/stop), (2) Change direction (turn, bounce, curve), (3) Change shape (stretch/squeeze/bend). Can have multiple effects at once.
          </div>
        `
      },
      {
        heading: 'Friction in Daily Life',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>When Friction is Useful</h4>
              <p><strong>Walking/Running:</strong> Friction between shoes and ground prevents slipping</p>
              <p><strong>Vehicle Brakes:</strong> Friction slows wheels to stop car/bicycle</p>
              <p><strong>Gripping:</strong> Friction helps hold pencil, open jars, climb rope</p>
              <p><strong>Writing:</strong> Friction between pen and paper leaves marks</p>
              <p><strong>Lighting Match:</strong> Friction creates heat to ignite match</p>
              <p><strong>Tires on Road:</strong> Grooves increase friction for better control</p>
            </div>
            <div class="key-concept-card">
              <h4>When We Want to Reduce Friction</h4>
              <p><strong>Moving Heavy Objects:</strong></p>
              <p>• Use wheels/rollers (easier to roll than drag)</p>
              <p>• Add lubricant/oil (makes surfaces slippery)</p>
              <p>• Polish surfaces smooth (less friction)</p>
              <p><strong>Examples:</strong></p>
              <p>• Oil in car engine - reduces friction between moving parts</p>
              <p>• Ball bearings in wheels - rolling reduces friction</p>
              <p>• Wax on skis - helps slide smoothly on snow</p>
              <p>• Streamlined shapes - reduces air friction on cars/planes</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Factors Affecting Friction:</strong><br>
            • Rougher surfaces → more friction<br>
            • Heavier objects → more friction<br>
            • Type of materials - different combinations create different friction
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Friction can be helpful (walking, brakes) or unwanted (machine parts wearing out). We increase friction with rough surfaces/grooves, decrease friction with oil/wheels/smooth surfaces. Same force can be good or bad depending on situation.
          </div>
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
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Migration</h4>
              <p><strong>Definition:</strong> Seasonal movement to another place for better conditions</p>
              <p><strong>Reasons:</strong> Find food, escape harsh weather, breed in safe areas</p>
              <p><strong>Examples:</strong></p>
              <p>• Birds fly south for winter (warmer, more food)</p>
              <p>• Wildebeest migrate for fresh grass and water</p>
              <p>• Monarch butterflies travel thousands of kilometers</p>
              <p><strong>Benefits:</strong> Survive seasonal changes, access resources year-round</p>
            </div>
            <div class="key-concept-card">
              <h4>Hibernation</h4>
              <p><strong>Definition:</strong> Deep sleep state during cold months to conserve energy</p>
              <p><strong>How it works:</strong> Body temperature drops, heart/breathing slow, uses stored fat</p>
              <p><strong>Examples:</strong> Bears, hedgehogs, some frogs and insects</p>
              <p><strong>Benefits:</strong> Survive winter when food is scarce, don't need to hunt/forage</p>
              <p><strong>Preparation:</strong> Eat extra food in autumn to build fat reserves</p>
            </div>
            <div class="key-concept-card">
              <h4>Camouflage</h4>
              <p><strong>Definition:</strong> Blending with environment to become hard to see</p>
              <p><strong>Purpose for prey:</strong> Hide from predators to avoid being eaten</p>
              <p><strong>Purpose for predators:</strong> Sneak up on prey without being detected</p>
              <p><strong>Examples:</strong></p>
              <p>• Chameleon changes color to match surroundings</p>
              <p>• Stick insects look like twigs</p>
              <p>• Snow leopard's spots blend with rocky terrain</p>
              <p>• Leaf insects look exactly like leaves</p>
            </div>
            <div class="key-concept-card">
              <h4>Warning Colors</h4>
              <p><strong>Definition:</strong> Bright colors signal "I'm dangerous - don't eat me!"</p>
              <p><strong>Examples:</strong> Poison dart frogs (bright red/yellow), wasps (black and yellow stripes), monarch butterflies (orange - tastes bad)</p>
              <p><strong>Benefits:</strong> Predators learn to avoid brightly colored prey</p>
            </div>
            <div class="key-concept-card">
              <h4>Group Behavior</h4>
              <p><strong>Living in groups:</strong></p>
              <p>• Protection - more eyes watch for danger</p>
              <p>• Hunting - coordinate to catch bigger prey (wolves, lions)</p>
              <p>• Survival - young protected in center of herd</p>
              <p>• Communication - warn others of threats</p>
              <p><strong>Examples:</strong> Fish schools, bird flocks, elephant herds, ant colonies</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Behavioral adaptations are ACTIONS animals do to survive, different from structural adaptations (body parts). Migration = move to better place. Hibernation = sleep through winter. Camouflage = hide. Warning colors = show danger. Group = strength in numbers.
          </div>
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
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Deforestation (Cutting Down Forests)</h4>
              <p><strong>Causes:</strong> Logging for wood/paper, clearing land for farms/buildings, development</p>
              <p><strong>Consequences:</strong></p>
              <p>• Habitat loss - animals lose homes and die</p>
              <p>• Soil erosion - tree roots hold soil, without them soil washes away</p>
              <p>• Climate change - fewer trees to absorb CO₂, more greenhouse gases</p>
              <p>• Loss of biodiversity - many species become extinct</p>
              <p>• Disrupts water cycle - less transpiration means less rain</p>
            </div>
            <div class="key-concept-card">
              <h4>Pollution</h4>
              <p><strong>Air pollution:</strong> Vehicle exhaust, factory smoke, burning → breathing problems, acid rain, smog</p>
              <p><strong>Water pollution:</strong> Sewage, chemicals, oil spills → kills aquatic life, unsafe drinking water</p>
              <p><strong>Land pollution:</strong> Garbage, toxic waste → harms soil, contaminates food chain</p>
              <p><strong>Noise pollution:</strong> Loud sounds disturb animals, affect communication and hunting</p>
              <p><strong>Effects:</strong> Harms human health, kills wildlife, damages ecosystems</p>
            </div>
            <div class="key-concept-card">
              <h4>Overfishing</h4>
              <p><strong>Problem:</strong> Catching fish faster than they can reproduce</p>
              <p><strong>Consequences:</strong></p>
              <p>• Fish populations decline, some species endangered</p>
              <p>• Disrupts food chains - predators lose food source</p>
              <p>• Damages marine ecosystems with nets and trawlers</p>
              <p>• Affects communities dependent on fishing for food/income</p>
            </div>
            <div class="key-concept-card">
              <h4>Plastic Waste</h4>
              <p><strong>Problem:</strong> Plastic doesn't decompose, accumulates in environment</p>
              <p><strong>Consequences:</strong></p>
              <p>• Marine animals eat plastic, choke, or starve (stomachs full of plastic)</p>
              <p>• Takes 400-1000 years to break down</p>
              <p>• Microplastics enter food chain, consumed by fish and eventually humans</p>
              <p>• Litter spoils beaches, oceans, streets</p>
            </div>
            <div class="key-concept-card">
              <h4>Climate Change / Global Warming</h4>
              <p><strong>Causes:</strong> Burning fossil fuels (coal, oil, gas) releases CO₂ and other greenhouse gases</p>
              <p><strong>Effects:</strong></p>
              <p>• Rising temperatures melt ice caps, sea levels rise</p>
              <p>• Extreme weather - more storms, droughts, floods</p>
              <p>• Habitats change - animals must adapt or migrate</p>
              <p>• Coral reefs dying from warmer oceans</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Human activities damage environment in many ways. Main problems: deforestation (loses trees), pollution (poisons air/water/land), overfishing (too few fish), plastic waste (doesn't break down), climate change (Earth getting warmer). All connected - one problem makes others worse.
          </div>
        `
      },
      {
        heading: 'Conservation and Sustainability',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Reduce</h4>
              <p><strong>Meaning:</strong> Use less, create less waste</p>
              <p><strong>Actions:</strong></p>
              <p>• Avoid single-use items (plastic bags, bottles, straws)</p>
              <p>• Buy only what you need, don't waste food</p>
              <p>• Choose products with less packaging</p>
              <p>• Turn off lights/devices when not using</p>
              <p>• Take shorter showers, save water</p>
              <p><strong>Why important:</strong> Best way to help - if we don't use it, we don't waste it</p>
            </div>
            <div class="key-concept-card">
              <h4>Reuse</h4>
              <p><strong>Meaning:</strong> Use items multiple times instead of throwing away</p>
              <p><strong>Actions:</strong></p>
              <p>• Use reusable bags, water bottles, containers</p>
              <p>• Donate old clothes, toys, books to others who need them</p>
              <p>• Repair broken items instead of replacing</p>
              <p>• Use both sides of paper before recycling</p>
              <p>• Convert old items to new uses (jars as storage, clothes as rags)</p>
              <p><strong>Why important:</strong> Saves resources, reduces waste going to landfills</p>
            </div>
            <div class="key-concept-card">
              <h4>Recycle</h4>
              <p><strong>Meaning:</strong> Process waste materials to make new products</p>
              <p><strong>What can be recycled:</strong></p>
              <p>• Paper/cardboard → new paper products</p>
              <p>• Plastic bottles → new containers, fleece clothing</p>
              <p>• Metal cans → new cans, building materials</p>
              <p>• Glass bottles → new glass containers</p>
              <p><strong>How to recycle:</strong> Clean items, sort by type, put in correct recycling bins</p>
              <p><strong>Why important:</strong> Saves raw materials, uses less energy than making from scratch</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Priority Order:</strong> Reduce (best) → Reuse (good) → Recycle (still helpful). Reducing is most effective because it prevents waste from being created in first place.
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> The 3Rs help conserve resources and protect environment. Reduce = use less. Reuse = use again. Recycle = make new from old. Remember order of importance: Reduce is best!
          </div>
        `
      },
      {
        heading: 'Protecting Our Environment',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Save Water</h4>
              <p>• Turn off taps while brushing teeth or soaping hands</p>
              <p>• Take shorter showers (5-10 minutes)</p>
              <p>• Fix leaking taps immediately - drips waste liters per day</p>
              <p>• Use full loads for washing machines and dishwashers</p>
              <p>• Collect rainwater for watering plants</p>
              <p><strong>Why:</strong> Fresh water is limited resource, many places face water shortages</p>
            </div>
            <div class="key-concept-card">
              <h4>Save Energy</h4>
              <p>• Turn off lights when leaving room</p>
              <p>• Unplug devices when not using (chargers still use power when plugged in)</p>
              <p>• Use energy-efficient LED bulbs and appliances</p>
              <p>• Use natural light during daytime instead of lights</p>
              <p>• Use fans instead of air conditioning when possible</p>
              <p><strong>Why:</strong> Most electricity from burning fossil fuels → reduces pollution and climate change</p>
            </div>
            <div class="key-concept-card">
              <h4>Plant Trees</h4>
              <p>• Trees absorb CO₂ (reduce greenhouse gases)</p>
              <p>• Provide oxygen for us to breathe</p>
              <p>• Create habitats for animals and insects</p>
              <p>• Prevent soil erosion with roots</p>
              <p>• Provide shade, cool the environment</p>
              <p><strong>Action:</strong> Join tree planting activities, plant in gardens, support reforestation</p>
            </div>
            <div class="key-concept-card">
              <h4>Use Public Transport / Carpool</h4>
              <p>• Buses/trains carry many people at once</p>
              <p>• Reduces number of vehicles on road → less air pollution</p>
              <p>• Reduces traffic congestion</p>
              <p>• Walk or cycle for short distances - good for health too!</p>
            </div>
            <div class="key-concept-card">
              <h4>Support Eco-Friendly Products</h4>
              <p>• Choose sustainable products (bamboo, recycled materials)</p>
              <p>• Buy biodegradable items that break down naturally</p>
              <p>• Support companies with good environmental practices</p>
              <p>• Avoid products with excessive packaging</p>
            </div>
            <div class="key-concept-card">
              <h4>Protect Wildlife</h4>
              <p>• Don't litter - trash harms animals</p>
              <p>• Respect animal habitats - don't disturb nests or homes</p>
              <p>• Don't buy products from endangered species (ivory, exotic pets)</p>
              <p>• Support wildlife conservation organizations</p>
              <p>• Report animal abuse or illegal hunting</p>
            </div>
          </div>
          <div class="example-box">
            <strong>Exam Key Point:</strong> Everyone can help protect environment through daily actions. Small changes by many people make BIG difference. Remember: Individual actions matter - you have power to create positive change!
          </div>
        `
      }
    ]
  }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  console.log('Science Concepts: DOM loaded');
  const topicSelect = document.getElementById('topicSelect');
  const container = document.getElementById('conceptMapsContainer');
  
  console.log('Topic select:', topicSelect);
  console.log('Container:', container);
  console.log('ConceptMaps keys:', Object.keys(conceptMaps));

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
    console.log('Created map:', topicId);
  });
  
  console.log('Total maps created:', document.querySelectorAll('.concept-map').length);

  // Handle topic selection
  topicSelect.addEventListener('change', (e) => {
    const selectedTopic = e.target.value;
    console.log('Selected topic:', selectedTopic);
    
    // Hide all concept maps
    document.querySelectorAll('.concept-map').forEach(map => {
      map.classList.remove('active');
    });
    
    // Show selected concept map
    if (selectedTopic) {
      const selectedMap = document.getElementById(`map-${selectedTopic}`);
      console.log('Found map element:', selectedMap);
      if (selectedMap) {
        selectedMap.classList.add('active');
        console.log('Added active class');
        selectedMap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
