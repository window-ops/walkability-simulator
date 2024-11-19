const ctx = document.getElementById('walkabilityChart').getContext('2d');
let chart;
let defaultWeight = 1; // Default weight value

// Function to update the simulation based on current checkbox states and weight
function updateSimulation() {
  const bicyclePaths = document.getElementById('bicyclePaths').checked;
  const metroStations = document.getElementById('metroStations').checked;
  const trafficCalming = document.getElementById('trafficCalming').checked;
  const intersectionRetrofitting = document.getElementById('intersectionRetrofitting').checked;
  const treePlanting = document.getElementById('treePlanting').checked;
  const roadNarrowing = document.getElementById('roadNarrowing').checked;
  const sidewalkImprovements = document.getElementById('sidewalkImprovements').checked;
  const mixedUseDevelopment = document.getElementById('mixedUseDevelopment').checked;
  const trafficSignalOptimization = document.getElementById('trafficSignalOptimization').checked;
  const urbanGreenSpaces = document.getElementById('urbanGreenSpaces').checked;
  const pedestrianZones = document.getElementById('pedestrianZones').checked;
  const increaseLocalAmenities = document.getElementById('increaseLocalAmenities').checked;
  const improveDirectRoutes = document.getElementById('improveDirectRoutes').checked;
  const increaseDensity = document.getElementById('increaseDensity').checked;
  const enhanceAccessibility = document.getElementById('enhanceAccessibility').checked;
  const carSharePrograms = document.getElementById('carSharePrograms').checked;
  const publicTransitImprovements = document.getElementById('publicTransitImprovements').checked;
  const publicArtInitiatives = document.getElementById('publicArtInitiatives').checked;
  const communitySpaces = document.getElementById('communitySpaces').checked;
  const weight = parseInt(document.getElementById('weight').value) || defaultWeight; // Use defaultWeight if value is NaN

  simulateWalkability(
    bicyclePaths,
    metroStations,
    trafficCalming,
    intersectionRetrofitting,
    treePlanting,
    roadNarrowing,
    sidewalkImprovements,
    mixedUseDevelopment,
    trafficSignalOptimization,
    urbanGreenSpaces,
    pedestrianZones,
    increaseLocalAmenities,
    improveDirectRoutes,
    increaseDensity,
    enhanceAccessibility,
    carSharePrograms,
    publicTransitImprovements,
    publicArtInitiatives,
    communitySpaces,
    weight
  );
}

// Initial simulation run with default settings
updateSimulation();

// Event listeners for checkboxes and weight slider
document.querySelectorAll('.form-check-input').forEach(checkbox => {
  checkbox.addEventListener('change', updateSimulation);
});

document.getElementById('weight').addEventListener('input', updateSimulation);

// Your simulateWalkability function remains the same
function simulateWalkability(
  bike,
  metro,
  traffic,
  retrofit,
  tree,
  narrow,
  sidewalk,
  mixed,
  signal,
  green,
  pedestrian,
  localAmenities,
  directRoutes,
  density,
  accessibility,
  carShare,
  transit,
  art,
  spaces,
  weight
) {
  const years = 10;
  const walkabilityData = [];
  const carFlowData = [];
  const livabilityData = [];
  const distanceData = [];
  let walkability = 10;
  let carFlow = 90;
  let livability = 20;
  let distance = 100;

  for (let year = 0; year < years; year++) {
    if (year >= 2) {
      if (bike) walkability += weight * 2;
      if (metro) walkability += weight * 2;
      if (traffic) carFlow -= weight * 2;
      if (retrofit) walkability += weight * 2;
      if (tree) livability += weight * 1;
      if (narrow) carFlow -= weight * 2;
      if (sidewalk) walkability += weight * 2;
      if (mixed) livability += weight * 2;
      if (signal) carFlow -= weight * 1;
      if (green) livability += weight * 2;
      if (pedestrian) walkability += weight * 2;
      if (localAmenities) distance -= weight * 2;
      if (directRoutes) distance -= weight * 2;
      if (density) distance -= weight * 2;
      if (accessibility) distance -= weight * 2;
      if (carShare) carFlow -= weight * 1;
      if (transit) walkability += weight * 2;
      if (art) livability += weight * 1;
      if (spaces) livability += weight * 2;
    }
    // Random small oscillations
    walkability += Math.random() * 2 - 1;
    carFlow += Math.random() * 2 - 1;
    livability += Math.random() * 2 - 1;
    distance += Math.random() * 2 - 1;
    // Ensure values stay within bounds
    walkability = Math.max(0, Math.min(100, walkability));
    carFlow = Math.max(0, Math.min(100, carFlow));
    livability = Math.max(0, Math.min(100, livability));
    distance = Math.max(0, Math.min(100, distance));
    // Store data
    walkabilityData.push(walkability);
    carFlowData.push(carFlow);
    livabilityData.push(livability);
    distanceData.push(distance);
  }
  // Smooth the data
  smoothData(walkabilityData);
  smoothData(carFlowData);
  smoothData(livabilityData);
  smoothData(distanceData);
  // Create chart
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({
        length: years
      }, (v, k) => k + 1),
      datasets: [{
        label: 'Walkability',
        data: walkabilityData,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      }, {
        label: 'Car Flow',
        data: carFlowData,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      }, {
        label: 'Livability',
        data: livabilityData,
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      }, {
        label: 'Distance to Amenities',
        data: distanceData,
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Years'
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 100,
          title: {
            display: true,
            text: 'Percentage (%)'
          }
        }
      }
    }
  });
}

// Your smoothData function remains the same
function smoothData(data) {
  for (let i = 1; i < data.length - 1; i++) {
    data[i] = (data[i - 1] + data[i] + data[i + 1]) / 3; // Simple smoothing
  }
}