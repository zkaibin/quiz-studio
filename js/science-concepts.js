/**
 * Science Concept Maps - Interactive learning tool
 */

const conceptMaps = {
  'living-things': {
    title: 'Living Things',
    description: 'All living things share common characteristics and have life cycles.',
    sections: [
      {
        heading: 'Characteristics of Living Things (MRS GREN)',
        content: `
          <ul class="concept-list">
            <li><strong>M</strong>ovement - All living things can move (plants grow toward light)</li>
            <li><strong>R</strong>espiration - Release energy from food</li>
            <li><strong>S</strong>ensitivity - Respond to changes in environment</li>
            <li><strong>G</strong>rowth - Increase in size and develop</li>
            <li><strong>R</strong>eproduction - Produce offspring</li>
            <li><strong>E</strong>xcretion - Remove waste products</li>
            <li><strong>N</strong>utrition - Need food for energy</li>
          </ul>
        `
      },
      {
        heading: 'Life Cycles',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Complete Metamorphosis</h4>
              <p>Butterfly: Egg → Larva (Caterpillar) → Pupa (Chrysalis) → Adult</p>
            </div>
            <div class="key-concept-card">
              <h4>Incomplete Metamorphosis</h4>
              <p>Grasshopper: Egg → Nymph → Adult</p>
            </div>
            <div class="key-concept-card">
              <h4>Mammals</h4>
              <p>Born alive, drink mother's milk, have hair/fur</p>
            </div>
            <div class="key-concept-card">
              <h4>Plants</h4>
              <p>Seed → Germination → Seedling → Mature Plant → Flowering → Seed</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Plant Parts and Functions',
        content: `
          <ul class="concept-list">
            <li><strong>Roots:</strong> Absorb water and nutrients, anchor plant</li>
            <li><strong>Stem:</strong> Transport water and nutrients, support plant</li>
            <li><strong>Leaves:</strong> Make food through photosynthesis</li>
            <li><strong>Flowers:</strong> Reproduction (make seeds)</li>
          </ul>
          <div class="example-box">
            <strong>Photosynthesis Formula:</strong>
            Carbon Dioxide + Water + Sunlight → Glucose + Oxygen
          </div>
        `
      }
    ]
  },

  'materials': {
    title: 'Materials',
    description: 'Different materials have different properties that make them suitable for different uses.',
    sections: [
      {
        heading: 'Properties of Materials',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Hardness</h4>
              <p>How difficult it is to scratch or dent (diamond is very hard)</p>
            </div>
            <div class="key-concept-card">
              <h4>Flexibility</h4>
              <p>Ability to bend without breaking (rubber, plastic)</p>
            </div>
            <div class="key-concept-card">
              <h4>Transparency</h4>
              <p>Allows light to pass through (glass, clear plastic)</p>
            </div>
            <div class="key-concept-card">
              <h4>Luster</h4>
              <p>How shiny the surface is (metals are lustrous)</p>
            </div>
            <div class="key-concept-card">
              <h4>Waterproof</h4>
              <p>Does not absorb water (plastic, rubber)</p>
            </div>
            <div class="key-concept-card">
              <h4>Strength</h4>
              <p>Ability to withstand force without breaking</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Common Materials',
        content: `
          <ul class="concept-list">
            <li><strong>Metals:</strong> Strong, hard, conduct heat/electricity, lustrous</li>
            <li><strong>Wood:</strong> Strong, insulator, can float, burns</li>
            <li><strong>Plastic:</strong> Light, waterproof, flexible, does not rust</li>
            <li><strong>Glass:</strong> Transparent, hard, brittle, smooth</li>
            <li><strong>Rubber:</strong> Flexible, waterproof, elastic, insulator</li>
            <li><strong>Fabric:</strong> Soft, absorbent, flexible</li>
          </ul>
        `
      },
      {
        heading: 'Magnetic Materials',
        content: `
          <div class="example-box">
            <strong>Magnetic:</strong> Iron, steel, nickel, cobalt
          </div>
          <div class="example-box">
            <strong>Non-Magnetic:</strong> Aluminum, copper, plastic, wood, glass
          </div>
        `
      }
    ]
  },

  'cycles': {
    title: 'Cycles in Nature',
    description: 'Water and other materials move through cycles in nature.',
    sections: [
      {
        heading: 'The Water Cycle',
        content: `
          <ul class="concept-list">
            <li><strong>Evaporation:</strong> Water heated by sun → water vapor (gas)</li>
            <li><strong>Condensation:</strong> Water vapor cools → water droplets (liquid)</li>
            <li><strong>Precipitation:</strong> Water droplets fall as rain, snow, hail</li>
            <li><strong>Collection:</strong> Water collects in rivers, lakes, oceans</li>
          </ul>
          <div class="example-box">
            <strong>Key Point:</strong> Water changes state but never disappears - it moves in a continuous cycle
          </div>
        `
      },
      {
        heading: 'States of Water',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Solid (Ice)</h4>
              <p>Below 0°C - Fixed shape and volume</p>
            </div>
            <div class="key-concept-card">
              <h4>Liquid (Water)</h4>
              <p>0°C to 100°C - Takes shape of container</p>
            </div>
            <div class="key-concept-card">
              <h4>Gas (Water Vapor)</h4>
              <p>Above 100°C - No fixed shape or volume</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Factors Affecting Evaporation',
        content: `
          <ul class="concept-list">
            <li>Higher temperature → faster evaporation</li>
            <li>Wind/moving air → faster evaporation</li>
            <li>Larger surface area → faster evaporation</li>
            <li>Lower humidity → faster evaporation</li>
          </ul>
        `
      }
    ]
  },

  'energy': {
    title: 'Energy',
    description: 'Energy exists in many forms and can be converted from one form to another.',
    sections: [
      {
        heading: 'Forms of Energy',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Light Energy</h4>
              <p>From sun, light bulbs - allows us to see</p>
            </div>
            <div class="key-concept-card">
              <h4>Heat Energy</h4>
              <p>From sun, fire, friction - makes things hot</p>
            </div>
            <div class="key-concept-card">
              <h4>Sound Energy</h4>
              <p>From vibrations - allows us to hear</p>
            </div>
            <div class="key-concept-card">
              <h4>Electrical Energy</h4>
              <p>From batteries, power outlets - powers devices</p>
            </div>
            <div class="key-concept-card">
              <h4>Chemical Energy</h4>
              <p>Stored in food, batteries, fuel</p>
            </div>
            <div class="key-concept-card">
              <h4>Kinetic Energy</h4>
              <p>Energy of movement</p>
            </div>
            <div class="key-concept-card">
              <h4>Potential Energy</h4>
              <p>Stored energy (stretched spring, object at height)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Energy Conversion Examples',
        content: `
          <ul class="concept-list">
            <li>Battery → Electrical energy → Light bulb (light + heat)</li>
            <li>Solar panel: Light energy → Electrical energy</li>
            <li>Food: Chemical energy → Movement (kinetic) + Heat</li>
            <li>Stretched rubber band: Potential energy → Kinetic energy</li>
            <li>Windmill: Kinetic (wind) → Electrical energy</li>
          </ul>
        `
      },
      {
        heading: 'Energy Sources',
        content: `
          <div class="example-box">
            <strong>Renewable:</strong> Solar, wind, water (hydroelectric), never run out
          </div>
          <div class="example-box">
            <strong>Non-Renewable:</strong> Coal, oil, natural gas - will run out
          </div>
        `
      }
    ]
  },

  'forces': {
    title: 'Forces',
    description: 'Forces are pushes or pulls that can change the motion or shape of objects.',
    sections: [
      {
        heading: 'Types of Forces',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Gravitational Force</h4>
              <p>Pulls objects toward Earth's center. Gives weight.</p>
            </div>
            <div class="key-concept-card">
              <h4>Frictional Force</h4>
              <p>Opposes motion between surfaces. Slows things down.</p>
            </div>
            <div class="key-concept-card">
              <h4>Magnetic Force</h4>
              <p>Attracts magnetic materials. Can push or pull.</p>
            </div>
            <div class="key-concept-card">
              <h4>Elastic Force</h4>
              <p>From stretched or compressed springs/rubber.</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Effects of Forces',
        content: `
          <ul class="concept-list">
            <li>Change speed (make objects start moving, speed up, or slow down)</li>
            <li>Change direction (make objects turn)</li>
            <li>Change shape (stretch, compress, bend objects)</li>
          </ul>
        `
      },
      {
        heading: 'Friction',
        content: `
          <div class="example-box">
            <strong>Useful Friction:</strong> Walking, brakes on bikes, writing with pencil
          </div>
          <div class="example-box">
            <strong>Reducing Friction:</strong> Oil/lubricants, smooth surfaces, ball bearings, streamlined shapes
          </div>
          <ul class="concept-list">
            <li>Rough surfaces → more friction</li>
            <li>Smooth surfaces → less friction</li>
            <li>Heavier objects → more friction</li>
          </ul>
        `
      }
    ]
  },

  'electricity': {
    title: 'Electricity',
    description: 'Electricity flows through circuits and powers many devices we use daily.',
    sections: [
      {
        heading: 'Electric Circuit Components',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Cell/Battery</h4>
              <p>Source of electrical energy</p>
            </div>
            <div class="key-concept-card">
              <h4>Wires</h4>
              <p>Conduct electricity (usually copper)</p>
            </div>
            <div class="key-concept-card">
              <h4>Switch</h4>
              <p>Controls flow of electricity (on/off)</p>
            </div>
            <div class="key-concept-card">
              <h4>Bulb</h4>
              <p>Converts electrical energy to light</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Complete Circuit',
        content: `
          <ul class="concept-list">
            <li>Must have a closed loop for electricity to flow</li>
            <li>If circuit is broken (switch off, wire disconnected), electricity stops</li>
            <li>All parts must be connected properly</li>
          </ul>
        `
      },
      {
        heading: 'Conductors and Insulators',
        content: `
          <div class="example-box">
            <strong>Conductors (allow electricity):</strong> Metals (copper, iron, aluminum), graphite
          </div>
          <div class="example-box">
            <strong>Insulators (block electricity):</strong> Plastic, rubber, wood, glass, paper, air
          </div>
        `
      },
      {
        heading: 'Series vs Parallel Circuits',
        content: `
          <ul class="concept-list">
            <li><strong>Series:</strong> Components in single path - if one breaks, all stop. Bulbs dimmer with more bulbs.</li>
            <li><strong>Parallel:</strong> Components in separate paths - if one breaks, others work. Bulbs stay bright.</li>
          </ul>
        `
      }
    ]
  },

  'matter': {
    title: 'Matter',
    description: 'Matter exists in three states and can change between them.',
    sections: [
      {
        heading: 'Three States of Matter',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Solid</h4>
              <p>Fixed shape, fixed volume. Particles packed tightly.</p>
            </div>
            <div class="key-concept-card">
              <h4>Liquid</h4>
              <p>No fixed shape (takes container shape), fixed volume. Particles move freely.</p>
            </div>
            <div class="key-concept-card">
              <h4>Gas</h4>
              <p>No fixed shape, no fixed volume. Particles far apart, move very fast.</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Changes of State',
        content: `
          <ul class="concept-list">
            <li><strong>Melting:</strong> Solid → Liquid (ice to water)</li>
            <li><strong>Freezing:</strong> Liquid → Solid (water to ice)</li>
            <li><strong>Evaporation:</strong> Liquid → Gas (water to water vapor)</li>
            <li><strong>Condensation:</strong> Gas → Liquid (water vapor to water)</li>
            <li><strong>Sublimation:</strong> Solid → Gas directly (dry ice)</li>
          </ul>
        `
      },
      {
        heading: 'Mixtures and Solutions',
        content: `
          <div class="example-box">
            <strong>Solution:</strong> One substance dissolves in another (salt in water)
          </div>
          <div class="example-box">
            <strong>Suspension:</strong> Particles float but don't dissolve (sand in water)
          </div>
          <ul class="concept-list">
            <li><strong>Filtration:</strong> Separate solids from liquids (coffee filter)</li>
            <li><strong>Evaporation:</strong> Separate dissolved solid from liquid (get salt from salt water)</li>
            <li><strong>Magnetism:</strong> Separate magnetic materials (iron from sand)</li>
          </ul>
        `
      }
    ]
  },

  'light': {
    title: 'Light',
    description: 'Light travels in straight lines and can be reflected or refracted.',
    sections: [
      {
        heading: 'Properties of Light',
        content: `
          <ul class="concept-list">
            <li>Travels in straight lines</li>
            <li>Travels very fast (fastest thing in universe)</li>
            <li>Can travel through transparent materials</li>
            <li>Cannot travel through opaque materials (creates shadows)</li>
            <li>Reflects off shiny surfaces</li>
          </ul>
        `
      },
      {
        heading: 'Transparent, Translucent, Opaque',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Transparent</h4>
              <p>Light passes through - can see clearly (glass, clear water)</p>
            </div>
            <div class="key-concept-card">
              <h4>Translucent</h4>
              <p>Some light passes through - cannot see clearly (frosted glass, wax paper)</p>
            </div>
            <div class="key-concept-card">
              <h4>Opaque</h4>
              <p>No light passes through - cannot see (wood, metal, cardboard)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Reflection and Refraction',
        content: `
          <div class="example-box">
            <strong>Reflection:</strong> Light bounces off shiny surfaces (mirrors). Angle in = angle out.
          </div>
          <div class="example-box">
            <strong>Refraction:</strong> Light bends when moving between materials (air to water). Makes objects look bent/shifted.
          </div>
          <ul class="concept-list">
            <li>Rainbow: White light splits into colors through water droplets</li>
            <li>Dispersion: White light = mixture of all colors</li>
          </ul>
        `
      }
    ]
  },

  'heat': {
    title: 'Heat',
    description: 'Heat is a form of energy that flows from hot to cold objects.',
    sections: [
      {
        heading: 'Heat Transfer Methods',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Conduction</h4>
              <p>Heat through direct contact. Metals conduct well.</p>
            </div>
            <div class="key-concept-card">
              <h4>Convection</h4>
              <p>Heat through movement of fluids (liquids/gases). Hot air rises.</p>
            </div>
            <div class="key-concept-card">
              <h4>Radiation</h4>
              <p>Heat through rays/waves. Can travel through space (sun to Earth).</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Conductors and Insulators of Heat',
        content: `
          <div class="example-box">
            <strong>Good Conductors:</strong> Metals (copper, aluminum, iron) - feel cold because they conduct heat away from hand
          </div>
          <div class="example-box">
            <strong>Good Insulators:</strong> Wood, plastic, rubber, fabric, air - used to trap heat or keep heat out
          </div>
        `
      },
      {
        heading: 'Effects of Heat',
        content: `
          <ul class="concept-list">
            <li>Objects expand when heated (metals, air in balloon)</li>
            <li>Objects contract when cooled</li>
            <li>Temperature increases with added heat</li>
            <li>Can change state of matter (ice melts, water boils)</li>
          </ul>
        `
      },
      {
        heading: 'Everyday Applications',
        content: `
          <ul class="concept-list">
            <li>Thermos flask: Trapped air insulates to keep drinks hot/cold</li>
            <li>Cooking pots: Metal conducts heat to food, plastic handle insulates</li>
            <li>Warm clothes: Trap air to insulate body heat</li>
          </ul>
        `
      }
    ]
  },

  'adaptations': {
    title: 'Adaptations',
    description: 'Living things have special features that help them survive in their environment.',
    sections: [
      {
        heading: 'Plant Adaptations',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Desert Plants (Cactus)</h4>
              <p>• Thick stem stores water<br>• Thorns instead of leaves reduce water loss<br>• Deep roots find water underground</p>
            </div>
            <div class="key-concept-card">
              <h4>Rainforest Plants</h4>
              <p>• Large leaves capture more sunlight<br>• Drip tips let water run off<br>• Aerial roots absorb moisture from air</p>
            </div>
            <div class="key-concept-card">
              <h4>Water Plants</h4>
              <p>• Hollow stems help float<br>• Waxy leaves repel water<br>• Flexible stems bend with current</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Animal Adaptations',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Polar Animals</h4>
              <p>• Thick fur/blubber for warmth<br>• White color for camouflage<br>• Small ears reduce heat loss</p>
            </div>
            <div class="key-concept-card">
              <h4>Desert Animals</h4>
              <p>• Active at night (cooler)<br>• Store water (camel's hump)<br>• Light colored to reflect heat</p>
            </div>
            <div class="key-concept-card">
              <h4>Aquatic Animals</h4>
              <p>• Gills to breathe underwater<br>• Fins/flippers for swimming<br>• Streamlined body</p>
            </div>
            <div class="key-concept-card">
              <h4>Birds</h4>
              <p>• Hollow bones (lighter)<br>• Feathers for flight<br>• Beaks shaped for diet</p>
            </div>
          </div>
        `
      }
    ]
  },

  'cells': {
    title: 'Cells',
    description: 'Cells are the basic building blocks of all living things.',
    sections: [
      {
        heading: 'Cell Structure',
        content: `
          <ul class="concept-list">
            <li><strong>Cell Membrane:</strong> Controls what enters and leaves the cell</li>
            <li><strong>Cytoplasm:</strong> Jelly-like substance where activities occur</li>
            <li><strong>Nucleus:</strong> Control center, contains genetic information (DNA)</li>
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
              <h4>Only Plant Cells Have</h4>
              <p>• Cell wall (rigid, gives shape)<br>• Chloroplasts (for photosynthesis)<br>• Large vacuole (stores water)</p>
            </div>
          </div>
        `
      },
      {
        heading: 'From Cells to Organisms',
        content: `
          <ul class="concept-list">
            <li><strong>Cells:</strong> Basic unit (muscle cell, nerve cell)</li>
            <li><strong>Tissues:</strong> Group of similar cells (muscle tissue)</li>
            <li><strong>Organs:</strong> Different tissues working together (heart, stomach)</li>
            <li><strong>Systems:</strong> Organs working together (digestive system)</li>
            <li><strong>Organism:</strong> Complete living thing</li>
          </ul>
        `
      }
    ]
  },

  'reproduction': {
    title: 'Reproduction in Plants',
    description: 'Plants reproduce through flowers and seeds.',
    sections: [
      {
        heading: 'Parts of a Flower',
        content: `
          <ul class="concept-list">
            <li><strong>Petals:</strong> Colorful, attract insects for pollination</li>
            <li><strong>Sepals:</strong> Protect flower bud</li>
            <li><strong>Stamen (male):</strong> Produces pollen (anther on top of filament)</li>
            <li><strong>Pistil (female):</strong> Contains ovary with ovules (eggs)</li>
          </ul>
        `
      },
      {
        heading: 'Process of Reproduction',
        content: `
          <div class="example-box">
            <strong>1. Pollination:</strong> Pollen transferred from anther to stigma (by wind, insects, birds)
          </div>
          <div class="example-box">
            <strong>2. Fertilization:</strong> Pollen joins with ovule in ovary
          </div>
          <div class="example-box">
            <strong>3. Seed Formation:</strong> Fertilized ovule becomes seed, ovary becomes fruit
          </div>
          <div class="example-box">
            <strong>4. Dispersal:</strong> Seeds spread by wind, water, animals, explosion
          </div>
          <div class="example-box">
            <strong>5. Germination:</strong> Seed grows into new plant (needs water, warmth, oxygen)
          </div>
        `
      },
      {
        heading: 'Seed Dispersal Methods',
        content: `
          <ul class="concept-list">
            <li><strong>Wind:</strong> Light seeds with wings (dandelion, maple)</li>
            <li><strong>Water:</strong> Waterproof, can float (coconut)</li>
            <li><strong>Animals:</strong> Hooks stick to fur, or eaten and dispersed in droppings</li>
            <li><strong>Explosion:</strong> Pods burst open (beans)</li>
          </ul>
        `
      }
    ]
  },

  'human-body': {
    title: 'Human Body Systems',
    description: 'Different organ systems work together to keep us alive and healthy.',
    sections: [
      {
        heading: 'Major Body Systems',
        content: `
          <div class="key-concepts">
            <div class="key-concept-card">
              <h4>Digestive System</h4>
              <p>Breaks down food into nutrients<br>Parts: Mouth → Esophagus → Stomach → Small Intestine → Large Intestine</p>
            </div>
            <div class="key-concept-card">
              <h4>Respiratory System</h4>
              <p>Takes in oxygen, removes carbon dioxide<br>Parts: Nose → Trachea → Lungs (bronchi, bronchioles, alveoli)</p>
            </div>
            <div class="key-concept-card">
              <h4>Circulatory System</h4>
              <p>Transports oxygen, nutrients, waste<br>Parts: Heart (pump), blood vessels, blood</p>
            </div>
            <div class="key-concept-card">
              <h4>Skeletal System</h4>
              <p>Supports body, protects organs, allows movement<br>Parts: Bones, joints</p>
            </div>
            <div class="key-concept-card">
              <h4>Muscular System</h4>
              <p>Produces movement<br>Muscles work in pairs (one contracts, one relaxes)</p>
            </div>
            <div class="key-concept-card">
              <h4>Nervous System</h4>
              <p>Controls and coordinates body<br>Parts: Brain, spinal cord, nerves</p>
            </div>
          </div>
        `
      },
      {
        heading: 'Digestion Process',
        content: `
          <ul class="concept-list">
            <li><strong>Mouth:</strong> Teeth break down food, saliva starts digestion</li>
            <li><strong>Stomach:</strong> Churns food, stomach acid breaks it down further</li>
            <li><strong>Small Intestine:</strong> Nutrients absorbed into blood</li>
            <li><strong>Large Intestine:</strong> Water absorbed, waste formed</li>
          </ul>
        `
      },
      {
        heading: 'Respiration and Circulation',
        content: `
          <div class="example-box">
            <strong>Breathing:</strong> Inhale oxygen → Lungs transfer to blood → Heart pumps blood → Cells use oxygen → Carbon dioxide returned → Exhale
          </div>
          <ul class="concept-list">
            <li>Heart beats about 70-80 times per minute</li>
            <li>Blood carries oxygen (red blood cells), fights disease (white blood cells)</li>
            <li>Arteries carry blood away from heart, veins return blood to heart</li>
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
