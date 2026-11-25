// Free-roam city definitions. `lat`/`lon` place each city on the globe; map data is in grid cells (north = small z).
// Every city's layout is a pure function of this data, so all players see the same streets.
const shift = (list, di, dj = 0) => list.map((e) => ({ ...e, i: e.i + di, j: e.j + dj }));

// The original downtown Singapore map sits inside the larger island, offset by (6, 0).
const SG_CORE_REGIONS = [
  { name: 'Marina Bay', i: 11, j: 2, kind: 'downtown' },
  { name: 'Raffles Place', i: 9, j: 5, kind: 'downtown' },
  { name: 'Civic District', i: 7, j: 3, kind: 'civic' },
  { name: 'Chinatown', i: 6, j: 7, kind: 'shophouse' },
  { name: 'Little India', i: 11, j: 8, kind: 'shophouse' },
  { name: 'Orchard Road', i: 3, j: 5, kind: 'mixed' },
  { name: 'Gardens by the Bay', i: 14, j: 3, kind: 'park' },
  { name: 'Tiong Bahru', i: 4, j: 12, kind: 'residential' },
  { name: 'Queenstown', i: 1, j: 10, kind: 'residential' },
  { name: 'East Coast', i: 16, j: 8, kind: 'residential' },
  { name: 'Changi', i: 18, j: 12, kind: 'mixed' },
  { name: 'Harbourfront', i: 5, j: 16, kind: 'mixed' },
  { name: 'Sentosa', i: 10, j: 18, kind: 'park' },
  { name: 'Kallang', i: 13, j: 12, kind: 'residential' }
];
const SG_CORE_LANDMARKS = [
  { id: 'mbs', i: 12, j: 1, face: 'N' }, { id: 'merlion', i: 9, j: 0, face: 'N' }, { id: 'esplanade', i: 10, j: 1, face: 'N' },
  { id: 'artscience', i: 13, j: 1, face: 'N' }, { id: 'flyer', i: 15, j: 1, face: 'N' },
  { id: 'supertrees', i: 13, j: 3, face: 'W' }, { id: 'flowerdome', i: 14, j: 3, face: 'S' }, { id: 'cloudforest', i: 15, j: 3, face: 'W' },
  { id: 'raffles', i: 8, j: 3, face: 'S' }, { id: 'standrews', i: 7, j: 2, face: 'W' }, { id: 'supremecourt', i: 7, j: 3, face: 'E' },
  { id: 'fullerton', i: 9, j: 2, face: 'W' }, { id: 'financial', i: 9, j: 5, face: 'N' }, { id: 'pinnacle', i: 10, j: 6, face: 'N' },
  { id: 'buddhatooth', i: 6, j: 7, face: 'S' }, { id: 'shophouses', i: 6, j: 8, face: 'N' }, { id: 'mariamman', i: 5, j: 8, face: 'E' },
  { id: 'sultan', i: 11, j: 9, face: 'N' }, { id: 'ion', i: 3, j: 5, face: 'E' }, { id: 'tangs', i: 4, j: 5, face: 'W' },
  { id: 'jewel', i: 18, j: 11, face: 'W' }, { id: 'changitower', i: 18, j: 12, face: 'W' },
  { id: 'sentosamerlion', i: 10, j: 18, face: 'N' }, { id: 'globe', i: 9, j: 18, face: 'W' }, { id: 'cablecar', i: 7, j: 17, face: 'W' },
  { id: 'ship', i: 10, j: 19, face: 'S' }
];

const SG_AVENUES = ['Marina Way', 'Shenton Way', 'Cantonment Rd', 'Neil Rd', 'Tanjong Pagar Rd', 'Havelock Rd', 'River Valley Rd',
  'Bukit Pasoh Rd', 'Outram Rd', 'Cecil St', 'Robinson Rd', 'Orchard Rd', 'Bras Basah Rd', 'Victoria St', 'Arab St',
  'Jalan Besar', 'Serangoon Rd', 'Geylang Rd', 'Changi Rd', 'Tampines Ave', 'East Coast Rd'];
const SG_STREETS = ['Marina Boulevard', 'Raffles Quay', 'Esplanade Dr', 'North Bridge Rd', 'Beach Rd', 'Nicoll Hwy', 'Rochor Rd',
  'Bencoolen St', 'Selegie Rd', 'Orchard Link', 'Scotts Rd', 'Newton Circus', 'Thomson Rd', 'Balestier Rd', 'Kim Seng Rd',
  'Alexandra Rd', 'Kampong Bahru Rd', 'Telok Blangah Rd', 'Harbour Dr', 'Sentosa Gateway', 'Keppel Rd'];

const defaultStyle = { lowrise: 'shophouse', residential: 'tower', downtownBoost: 24, sea: 0x4c93b5, park: 0x86a97d, pond: 0x4c93b5 };

export const CITIES = [
  {
    id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.283, lon: 103.86, drive: 'left', grid: 40,
    blurb: 'Garden city of Marina Bay, shophouses and the whole island',
    style: defaultStyle,
    regions: [
      ...shift(SG_CORE_REGIONS, 6),
      { name: 'Jurong East', i: 2, j: 9, kind: 'mixed' }, { name: 'Clementi', i: 3, j: 14, kind: 'residential' },
      { name: 'Bukit Timah', i: 7, j: 10, kind: 'park' }, { name: 'Holland Village', i: 8, j: 13, kind: 'mixed' },
      { name: 'Buona Vista', i: 4, j: 19, kind: 'mixed' }, { name: 'Pasir Panjang', i: 6, j: 24, kind: 'residential' },
      { name: 'Mount Faber', i: 14, j: 23, kind: 'park' }, { name: 'Toa Payoh', i: 17, j: 14, kind: 'residential' },
      { name: 'Novena', i: 14, j: 10, kind: 'mixed' }, { name: 'Ang Mo Kio', i: 19, j: 11, kind: 'residential' },
      { name: 'Bedok', i: 27, j: 14, kind: 'residential' }, { name: 'Tampines', i: 29, j: 10, kind: 'mixed' },
      { name: 'Pasir Ris', i: 30, j: 6, kind: 'residential' }, { name: 'Punggol', i: 25, j: 5, kind: 'residential' },
      { name: 'Woodlands', i: 12, j: 27, kind: 'residential' }, { name: 'Sembawang', i: 20, j: 26, kind: 'residential' },
      { name: 'Central Catchment', i: 16, j: 18, kind: 'park' }, { name: 'Jurong Lake', i: 1, j: 5, kind: 'park' }
    ],
    landmarks: shift(SG_CORE_LANDMARKS, 6),
    avenues: (line) => (line >= 6 && line - 6 < SG_AVENUES.length ? SG_AVENUES[line - 6] : ['Pan Island Expy', 'Jurong Rd', 'Bukit Timah Rd', 'Clementi Ave', 'Yishun Ave', 'Tampines Expy', 'Sims Ave', 'Upper Paya Lebar Rd'][line % 8]),
    streets: (line) => (line < SG_STREETS.length ? SG_STREETS[line] : ['Kranji Rd', 'Lornie Rd', 'Holland Rd', 'Commonwealth Ave', 'Ayer Rajah Expy', 'Bartley Rd', 'Upper Thomson Rd', 'Mandai Rd'][line % 8]),
    spawns: { downtown: [15, 5], marina: [17, 2], gardens: [20, 3], heritage: [12, 7], civic: [13, 3], changi: [24, 11], sentosa: [14, 17] }
  },
  {
    id: 'newyork', name: 'New York', country: 'United States', lat: 40.758, lon: -73.9855, drive: 'right', grid: 38,
    blurb: 'Manhattan avenues, brownstones and the skyline',
    style: { lowrise: 'brownstone', residential: 'lowrise', downtownBoost: 36, sea: 0x3d6f8f, park: 0x6f9a62, pond: 0x4a7f99 },
    regions: [
      { name: 'Financial District', i: 14, j: 3, kind: 'downtown' }, { name: 'Battery Park', i: 11, j: 1, kind: 'park' },
      { name: 'Tribeca', i: 8, j: 5, kind: 'shophouse' }, { name: 'SoHo', i: 9, j: 8, kind: 'shophouse' },
      { name: 'Greenwich Village', i: 6, j: 10, kind: 'shophouse' }, { name: 'Chelsea', i: 4, j: 13, kind: 'mixed' },
      { name: 'Flatiron', i: 12, j: 11, kind: 'mixed' }, { name: "Hell's Kitchen", i: 5, j: 16, kind: 'residential' },
      { name: 'Times Square', i: 10, j: 16, kind: 'downtown' }, { name: 'Midtown', i: 14, j: 15, kind: 'downtown' },
      { name: 'Upper East Side', i: 22, j: 20, kind: 'residential' }, { name: 'Central Park', i: 15, j: 23, kind: 'park' },
      { name: 'Harlem', i: 14, j: 28, kind: 'residential' }, { name: 'Brooklyn', i: 24, j: 6, kind: 'residential' },
      { name: 'Queens', i: 27, j: 14, kind: 'residential' }, { name: 'East Village', i: 17, j: 9, kind: 'shophouse' }
    ],
    landmarks: [
      { id: 'liberty', i: 11, j: 0, face: 'N' }, { id: 'wtc', i: 14, j: 2, face: 'W' }, { id: 'flatiron', i: 12, j: 10, face: 'E' },
      { id: 'empire', i: 14, j: 14, face: 'W' }, { id: 'timessq', i: 10, j: 15, face: 'E' }
    ],
    avenues: (line) => ['West End Ave', 'Riverside Dr', '12th Ave', '11th Ave', '10th Ave', '9th Ave', '8th Ave', '7th Ave', 'Broadway', '6th Ave', '5th Ave', 'Madison Ave', 'Park Ave', 'Lexington Ave', '3rd Ave', '2nd Ave', '1st Ave', 'Bowery', 'Canal St', 'FDR Dr'][line % 20],
    streets: (line) => (line < 22 ? `${['Battery Pl', 'Wall St', 'Pine St', 'Cedar St', 'Fulton St', 'Chambers St', 'Houston St', 'Bleecker St', '14th St', '23rd St', '28th St', '34th St', '38th St', '42nd St', '47th St', '50th St', '57th St', '59th St', '65th St', '72nd St', '79th St', '86th St'][line]}` : `${(line - 22) * 4 + 90}th St`),
    spawns: { 'ny-midtown': [11, 15], 'ny-harbor': [13, 3] }
  },
  {
    id: 'shanghai', name: 'Shanghai', country: 'China', lat: 31.2397, lon: 121.4998, drive: 'right', grid: 38,
    blurb: 'Lujiazui super-towers, the Bund and lilong lanes',
    style: { lowrise: 'lilong', residential: 'tower', downtownBoost: 40, sea: 0x6f8a78, park: 0x76a068, pond: 0x5f8f86 },
    regions: [
      { name: 'Lujiazui', i: 21, j: 6, kind: 'downtown' }, { name: 'Pudong', i: 25, j: 12, kind: 'mixed' },
      { name: 'The Bund', i: 12, j: 5, kind: 'civic' }, { name: 'Nanjing Road', i: 9, j: 8, kind: 'mixed' },
      { name: 'Old City', i: 8, j: 12, kind: 'shophouse' }, { name: 'French Concession', i: 5, j: 14, kind: 'shophouse' },
      { name: 'Xujiahui', i: 6, j: 20, kind: 'downtown' }, { name: 'Hongqiao', i: 2, j: 16, kind: 'residential' },
      { name: "Jing'an", i: 4, j: 9, kind: 'mixed' }, { name: 'Zhangjiang', i: 25, j: 22, kind: 'residential' },
      { name: 'Century Park', i: 20, j: 15, kind: 'park' }, { name: 'Yangpu', i: 14, j: 18, kind: 'residential' },
      { name: 'Xintiandi', i: 8, j: 16, kind: 'shophouse' }, { name: 'Gongqing Forest', i: 17, j: 26, kind: 'park' }
    ],
    landmarks: [
      { id: 'bund', i: 12, j: 5, face: 'E' }, { id: 'pearl', i: 19, j: 4, face: 'E' }, { id: 'shtower', i: 21, j: 5, face: 'W' },
      { id: 'jinmao', i: 20, j: 6, face: 'W' }, { id: 'swfc', i: 22, j: 6, face: 'E' }
    ],
    avenues: (line) => ['Zhongshan Rd', 'Yan’an Rd', 'Huaihai Rd', 'Xizang Rd', 'Henan Rd', 'Sichuan Rd', 'Yuyuan Rd', 'Changshou Rd', 'Zhaojiabang Rd', 'Yincheng Rd', 'Century Ave', 'Pudong Ave', 'Dongfang Rd', 'Zhangyang Rd', 'Lujiazui Ring Rd'][line % 15],
    streets: (line) => ['Nanjing Rd', 'Fuzhou Rd', 'Beijing Rd', 'Jiujiang Rd', 'Renmin Rd', 'Fuxing Rd', 'Jianguo Rd', 'Hengshan Rd', 'Wukang Rd', 'Xinle Rd', 'Maoming Rd', 'Dagu Rd', 'Weihai Rd', 'Changle Rd'][line % 14],
    spawns: { 'sh-pudong': [20, 7], 'sh-bund': [11, 5] }
  },
  {
    id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, drive: 'left', grid: 40,
    blurb: 'Neon crossings, Skytree and tight city lanes',
    style: { lowrise: 'tokyo', residential: 'lowrise', downtownBoost: 30, sea: 0x3f7fa8, park: 0x6e9d62, pond: 0x4a86a8 },
    regions: [
      { name: 'Shinjuku', i: 6, j: 8, kind: 'downtown' }, { name: 'Shibuya', i: 6, j: 16, kind: 'downtown' },
      { name: 'Marunouchi', i: 16, j: 10, kind: 'downtown' }, { name: 'Ginza', i: 18, j: 13, kind: 'mixed' },
      { name: 'Asakusa', i: 24, j: 6, kind: 'shophouse' }, { name: 'Akihabara', i: 20, j: 8, kind: 'mixed' },
      { name: 'Roppongi', i: 11, j: 17, kind: 'mixed' }, { name: 'Ueno Park', i: 22, j: 3, kind: 'park' },
      { name: 'Setagaya', i: 3, j: 24, kind: 'residential' }, { name: 'Ikebukuro', i: 10, j: 3, kind: 'mixed' },
      { name: 'Shinagawa', i: 16, j: 22, kind: 'mixed' }, { name: 'Koto', i: 26, j: 16, kind: 'residential' },
      { name: 'Sumida', i: 27, j: 8, kind: 'residential' }, { name: 'Yoyogi Park', i: 8, j: 12, kind: 'park' },
      { name: 'Odaiba', i: 25, j: 24, kind: 'mixed' }, { name: 'Nakano', i: 3, j: 9, kind: 'residential' }
    ],
    landmarks: [
      { id: 'tocho', i: 6, j: 8, face: 'W' }, { id: 'shibuya', i: 6, j: 16, face: 'E' }, { id: 'tokyotower', i: 13, j: 18, face: 'N' },
      { id: 'kaminarimon', i: 24, j: 6, face: 'S' }, { id: 'skytree', i: 27, j: 7, face: 'W' }
    ],
    avenues: (line) => ['Meiji-dori', 'Yamate-dori', 'Koshu Kaido', 'Aoyama-dori', 'Roppongi-dori', 'Sotobori-dori', 'Chuo-dori', 'Showa-dori', 'Kiyosubashi-dori', 'Kasuga-dori', 'Harumi-dori', 'Eitai-dori'][line % 12],
    streets: (line) => ['Ome Kaido', 'Shinjuku-dori', 'Inokashira-dori', 'Tamagawa-dori', 'Kannana-dori', 'Hibiya-dori', 'Sakurada-dori', 'Kokuritsu Rd', 'Uchibori-dori', 'Kuramae-dori', 'Kototoi-dori', 'Mejiro-dori', 'Shin-Ohashi-dori'][line % 13],
    spawns: { 'tk-shibuya': [7, 16], 'tk-skytree': [25, 6] }
  },
  {
    id: 'london', name: 'London', country: 'United Kingdom', lat: 51.5007, lon: -0.1246, drive: 'left', grid: 36,
    blurb: 'Big Ben, the Thames and terraced streets',
    style: { lowrise: 'terrace', residential: 'lowrise', downtownBoost: 8, sea: 0x4a6b7a, park: 0x6b9a58, pond: 0x56788a },
    regions: [
      { name: 'Westminster', i: 8, j: 12, kind: 'civic' }, { name: 'The City', i: 20, j: 10, kind: 'downtown' },
      { name: 'Canary Wharf', i: 26, j: 12, kind: 'downtown' }, { name: 'South Bank', i: 13, j: 14, kind: 'mixed' },
      { name: 'Soho', i: 12, j: 8, kind: 'shophouse' }, { name: 'Mayfair', i: 8, j: 6, kind: 'shophouse' },
      { name: 'Kensington', i: 3, j: 10, kind: 'residential' }, { name: 'Hyde Park', i: 6, j: 3, kind: 'park' },
      { name: 'Shoreditch', i: 22, j: 5, kind: 'mixed' }, { name: 'Greenwich', i: 24, j: 19, kind: 'residential' },
      { name: 'Camden', i: 11, j: 2, kind: 'residential' }, { name: 'Brixton', i: 10, j: 22, kind: 'residential' },
      { name: 'Richmond Park', i: 3, j: 22, kind: 'park' }, { name: 'Southwark', i: 17, j: 15, kind: 'mixed' }
    ],
    landmarks: [
      { id: 'bigben', i: 8, j: 12, face: 'E' }, { id: 'londoneye', i: 10, j: 14, face: 'N' }, { id: 'shard', i: 17, j: 14, face: 'W' },
      { id: 'towerbridge', i: 20, j: 13, face: 'N' }, { id: 'stpauls', i: 18, j: 10, face: 'S' }
    ],
    avenues: (line) => ['Kensington High St', 'Park Ln', 'Oxford St', 'Regent St', 'The Strand', 'Fleet St', 'Cannon St', 'Whitechapel Rd', 'Commercial Rd', 'Mile End Rd', 'Bow Rd', 'Westferry Rd', 'Marsh Wall'][line % 13],
    streets: (line) => ['Euston Rd', 'Marylebone Rd', 'Piccadilly', 'Pall Mall', 'Whitehall', 'Victoria Embankment', 'Lambeth Rd', 'Borough High St', 'Tooley St', 'Jamaica Rd', 'Old Kent Rd', 'Walworth Rd', 'Brixton Rd', 'Clapham Rd'][line % 14],
    spawns: { 'ld-westminster': [9, 12], 'ld-thames': [18, 13] }
  },
  {
    id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', lat: 25.1972, lon: 55.2744, drive: 'right', grid: 36,
    blurb: 'Burj Khalifa, Sheikh Zayed Road and the Gulf coast',
    style: { lowrise: 'villa', residential: 'lowrise', downtownBoost: 70, sea: 0x2f9db8, park: 0xc2b27e, pond: 0x3aa6c4 },
    regions: [
      { name: 'Downtown Dubai', i: 12, j: 10, kind: 'downtown' }, { name: 'Business Bay', i: 15, j: 8, kind: 'downtown' },
      { name: 'DIFC', i: 9, j: 8, kind: 'downtown' }, { name: 'Deira', i: 21, j: 5, kind: 'shophouse' },
      { name: 'Bur Dubai', i: 18, j: 4, kind: 'shophouse' }, { name: 'Jumeirah', i: 6, j: 5, kind: 'residential' },
      { name: 'Al Barsha', i: 4, j: 16, kind: 'residential' }, { name: 'Dubai Marina', i: 2, j: 13, kind: 'downtown' },
      { name: 'Creek Park', i: 19, j: 12, kind: 'park' }, { name: 'Al Quoz', i: 8, j: 18, kind: 'mixed' },
      { name: 'Zabeel Park', i: 10, j: 14, kind: 'park' }, { name: 'Mirdif', i: 24, j: 14, kind: 'residential' },
      { name: 'Satwa', i: 8, j: 3, kind: 'mixed' }, { name: 'Dubai Hills', i: 14, j: 21, kind: 'residential' }
    ],
    landmarks: [
      { id: 'burjalarab', i: 5, j: 0, face: 'N' }, { id: 'burj', i: 12, j: 9, face: 'W' }, { id: 'emirates', i: 10, j: 9, face: 'E' },
      { id: 'museum', i: 11, j: 11, face: 'N' }, { id: 'dubaiframe', i: 14, j: 13, face: 'W' }
    ],
    avenues: (line) => ['Al Wasl Rd', 'Jumeirah Beach Rd', 'Sheikh Zayed Rd', 'Al Khail Rd', 'Emirates Rd', 'Al Maktoum Rd', 'Al Rashidiya Rd', 'Baniyas Rd', 'Al Mina Rd', 'Trade Centre Rd'][line % 10],
    streets: (line) => ['Al Safa St', 'Al Satwa Rd', 'Financial Centre Rd', 'Mohammed Bin Rashid Blvd', 'Al Asayel St', 'Umm Suqeim St', 'Al Quoz St', 'Oud Metha Rd', 'Za’abeel Rd'][line % 9],
    spawns: { 'db-downtown': [13, 10], 'db-coast': [5, 1] }
  },
  // Pocket Planet Aurelia: one city wraps the whole surface (~2.2 km lap). From ~1 km up the whole world reads as a tiny planet.
  {
    id: 'circadia', name: 'Circadia', country: 'Planet Aurelia', lat: 18, lon: 42, drive: 'right', grid: 16,
    planet: true, wrap: true, world: 'aurelia',
    blurb: 'The only city on tiny Planet Aurelia — streets wrap the whole world with no edge',
    style: {
      lowrise: 'tokyo', residential: 'tower', downtownBoost: 48,
      sea: 0x1a2740, park: 0x5f9a72, pond: 0x3d7a9c, minimapSea: '#1a2740'
    },
    regions: [
      { name: 'Helix Core', i: 8, j: 8, kind: 'downtown' }, { name: 'Meridian Plaza', i: 7, j: 8, kind: 'downtown' },
      { name: 'Orbital Spire', i: 9, j: 8, kind: 'downtown' }, { name: 'Ring Gate', i: 6, j: 6, kind: 'civic' },
      { name: 'Crystal Forum', i: 10, j: 7, kind: 'civic' }, { name: 'Aurora Quarters', i: 5, j: 9, kind: 'residential' },
      { name: 'Solstice Ward', i: 11, j: 10, kind: 'residential' }, { name: 'Equinox Docks', i: 3, j: 5, kind: 'mixed' },
      { name: 'Zenith Market', i: 12, j: 4, kind: 'shophouse' }, { name: 'Nadir Lanes', i: 2, j: 12, kind: 'shophouse' },
      { name: 'Polar Gardens', i: 8, j: 2, kind: 'park' }, { name: 'Antipode Park', i: 8, j: 14, kind: 'park' },
      { name: 'Dawn Reach', i: 1, j: 8, kind: 'mixed' }, { name: 'Dusk Reach', i: 15, j: 8, kind: 'mixed' },
      { name: 'Horizon Observatory', i: 13, j: 13, kind: 'civic' }, { name: 'Unity Circle', i: 4, j: 3, kind: 'downtown' },
      { name: 'Loom District', i: 10, j: 2, kind: 'shophouse' }, { name: 'Vault Heights', i: 2, j: 10, kind: 'residential' },
      { name: 'Cascade Green', i: 14, j: 6, kind: 'park' }, { name: 'Echo Yards', i: 6, j: 14, kind: 'mixed' },
      { name: 'North Meridian', i: 8, j: 3, kind: 'downtown' }, { name: 'South Meridian', i: 8, j: 13, kind: 'downtown' },
      { name: 'West Belt', i: 2, j: 8, kind: 'residential' }, { name: 'East Belt', i: 14, j: 8, kind: 'residential' }
    ],
    landmarks: [
      { id: 'spire', i: 9, j: 8, face: 'W' }, { id: 'ringgate', i: 6, j: 6, face: 'N' },
      { id: 'crystal', i: 10, j: 7, face: 'E' }, { id: 'observatory', i: 13, j: 13, face: 'S' },
      { id: 'unityplaza', i: 4, j: 3, face: 'E' }, { id: 'polarbeacon', i: 8, j: 2, face: 'N' },
      { id: 'antipodolite', i: 8, j: 14, face: 'S' }, { id: 'helixcore', i: 8, j: 8, face: 'W' }
    ],
    avenues: (line) => [
      'Meridian Loop', 'Helix Avenue', 'Aurora Belt', 'Solstice Way', 'Equinox Road', 'Zenith Drive',
      'Nadir Crescent', 'Orbit Lane', 'Ring Road', 'Spire Boulevard', 'Crystal Way', 'Forum Avenue',
      'Dawn Highway', 'Dusk Expressway', 'Polar Arc', 'Antipode Street', 'Unity Parade', 'Loom Street'
    ][line % 18],
    streets: (line) => [
      'Circadia Ring', 'Aurelia Causeway', 'Pocket World Rd', 'No-Edge Lane', 'Full-Circle St', 'Wraparound Way',
      'Tinyterra Blvd', 'Horizon Path', 'Beacon Street', 'Cascade Road', 'Echo Lane', 'Vault Street',
      'North Cap Rd', 'South Cap Rd', 'West Seam', 'East Seam'
    ][line % 16],
    spawns: { 'au-helix': [8, 8], 'au-ring': [6, 6], 'au-polar': [8, 2] }
  }
];

export const CITY_BY_ID = Object.fromEntries(CITIES.map((c) => [c.id, c]));
export const EARTH_CITIES = CITIES.filter((c) => !c.planet);
export const PLANET_CITIES = CITIES.filter((c) => c.planet);
export const DEFAULT_CITY_ID = 'singapore';
