// Curated Real-map start points (geographic lat/lon), kept inside the ~1.5 km pack
// around each city's centre. Resolved to pack metres + nearest road on load.
export const REAL_STARTS = {
  singapore: [
    { id: 'sg-marina', name: 'Marina Bay', blurb: 'Bayfront skyline drive', lat: 1.2823, lon: 103.8598 },
    { id: 'sg-raffles', name: 'Raffles Place', blurb: 'Downtown CBD grid', lat: 1.2841, lon: 103.8513 },
    { id: 'sg-merlion', name: 'Merlion Park', blurb: 'Waterfront promenade', lat: 1.2868, lon: 103.8545 },
    { id: 'sg-chinatown', name: 'Chinatown', blurb: 'Temple Street lanes', lat: 1.2830, lon: 103.8455 },
    { id: 'sg-gardens', name: 'Gardens by the Bay', blurb: 'Supertree boulevard', lat: 1.2815, lon: 103.8638 },
    { id: 'sg-esplanade', name: 'Esplanade', blurb: 'Theatres on the Bay', lat: 1.2895, lon: 103.8558 }
  ],
  newyork: [
    { id: 'ny-times', name: 'Times Square', blurb: 'Midtown neon crossroads', lat: 40.7580, lon: -73.9855 },
    { id: 'ny-empire', name: 'Empire State', blurb: '34th Street canyon', lat: 40.7484, lon: -73.9857 },
    { id: 'ny-bryant', name: 'Bryant Park', blurb: 'Library lawn & Fifth Ave', lat: 40.7536, lon: -73.9832 },
    { id: 'ny-rock', name: 'Rockefeller Center', blurb: 'Midtown towers', lat: 40.7587, lon: -73.9787 },
    { id: 'ny-hells', name: "Hell's Kitchen", blurb: 'West Side avenues', lat: 40.7614, lon: -73.9940 }
  ],
  shanghai: [
    { id: 'sh-lujiazui', name: 'Lujiazui', blurb: 'Pudong super-towers', lat: 31.2397, lon: 121.4998 },
    { id: 'sh-bund', name: 'The Bund', blurb: 'Zhongshan riverfront', lat: 31.2404, lon: 121.4905 },
    { id: 'sh-pearl', name: 'Oriental Pearl', blurb: 'Century Avenue approach', lat: 31.2419, lon: 121.4950 },
    { id: 'sh-jinmao', name: 'Jinmao Tower', blurb: 'Lujiazui Ring Road', lat: 31.2365, lon: 121.5048 },
    { id: 'sh-swfc', name: 'SWFC', blurb: 'Pudong skyline loop', lat: 31.2345, lon: 121.5075 }
  ],
  tokyo: [
    { id: 'tk-harajuku', name: 'Harajuku', blurb: 'Meiji-dori crossings', lat: 35.6702, lon: 139.7026 },
    { id: 'tk-yoyogi', name: 'Yoyogi', blurb: 'Park-edge avenues', lat: 35.6712, lon: 139.6950 },
    { id: 'tk-shinjuku', name: 'Shinjuku South', blurb: 'Station approaches', lat: 35.6812, lon: 139.7000 },
    { id: 'tk-omotesando', name: 'Omotesando', blurb: 'Boutique boulevard', lat: 35.6650, lon: 139.7120 },
    { id: 'tk-shibuya-n', name: 'Shibuya North', blurb: 'Toward the scramble', lat: 35.6645, lon: 139.6985 }
  ],
  london: [
    { id: 'ld-westminster', name: 'Westminster', blurb: 'Big Ben & Whitehall', lat: 51.5007, lon: -0.1246 },
    { id: 'ld-eye', name: 'South Bank', blurb: 'London Eye waterfront', lat: 51.5033, lon: -0.1195 },
    { id: 'ld-trafalgar', name: 'Trafalgar Square', blurb: 'West End gateway', lat: 51.5080, lon: -0.1281 },
    { id: 'ld-covent', name: 'Covent Garden', blurb: 'Strand-side lanes', lat: 51.5120, lon: -0.1235 },
    { id: 'ld-bridge', name: 'Westminster Bridge', blurb: 'Thames crossing', lat: 51.5009, lon: -0.1215 }
  ],
  dubai: [
    { id: 'db-burj', name: 'Burj Khalifa', blurb: 'Downtown Dubai', lat: 25.1972, lon: 55.2744 },
    { id: 'db-fountain', name: 'Dubai Fountain', blurb: 'Boulevard plaza', lat: 25.1955, lon: 55.2750 },
    { id: 'db-difc', name: 'DIFC', blurb: 'Gate Village district', lat: 25.2105, lon: 55.2795 },
    { id: 'db-bay', name: 'Business Bay', blurb: 'Canal-side towers', lat: 25.1865, lon: 55.2740 },
    { id: 'db-szr', name: 'Sheikh Zayed Road', blurb: 'Skyline expressway', lat: 25.2040, lon: 55.2700 }
  ]
};

export function realStartsFor(cityId) {
  return REAL_STARTS[cityId] || [];
}
