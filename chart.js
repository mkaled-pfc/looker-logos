// chart.js
function drawViz(data, element) {
  // Clear
  element.innerHTML = '';
  // Prepare data
  const rows = data.tables.DEFAULT;
  // Group by Potentiel and Catégorie
  const grouped = {};
  rows.forEach(row => {
    const potentiel = row['Potentiel'];
    const categorie = row['Catégorie'];
    const club = row['Club'];
    const logo = row['LogoURL'];
    if (!grouped[potentiel]) grouped[potentiel] = {};
    if (!grouped[potentiel][categorie]) grouped[potentiel][categorie] = [];
    grouped[potentiel][categorie].push({ club, logo });
  });

  // Build chart
  const chart = document.createElement('div');
  chart.style.display = 'flex';
  chart.style.justifyContent = 'space-around';
  chart.style.alignItems = 'flex-end';
  chart.style.height = '400px';
  chart.style.background = '#181F36';
  chart.style.padding = '40px 20px 20px 20px';

  Object.entries(grouped).forEach(([potentiel, categories]) => {
    const barGroup = document.createElement('div');
    barGroup.style.display = 'flex';
    barGroup.style.flexDirection = 'column';
    barGroup.style.alignItems = 'center';

    Object.entries(categories).forEach(([categorie, clubs]) => {
      const bar = document.createElement('div');
      bar.style.display = 'flex';
      bar.style.flexDirection = 'column-reverse';
      bar.style.alignItems = 'center';
      bar.style.margin = '0 10px';

      // Bar height based on number of clubs
      bar.style.height = `${clubs.length * 60}px`;
      bar.style.width = '60px';
      bar.style.background = categorie === 'Ecole de football' ? '#bfc9d1' : (categorie === 'Préformation' ? '#5bc0de' : '#00bfff');
      bar.style.borderRadius = '8px 8px 0 0';
      bar.style.position = 'relative';

      // Logos
      clubs.forEach(clubInfo => {
        const logoImg = document.createElement('img');
        logoImg.src = clubInfo.logo;
        logoImg.title = clubInfo.club;
        logoImg.style.width = '40px';
        logoImg.style.height = '40px';
        logoImg.style.objectFit = 'contain';
        logoImg.style.margin = '2px auto';
        bar.appendChild(logoImg);
      });

      // Nombre
      const label = document.createElement('div');
      label.innerText = clubs.length;
      label.style.position = 'absolute';
      label.style.top = '-25px';
      label.style.left = '50%';
      label.style.transform = 'translateX(-50%)';
      label.style.color = '#fff';
      label.style.fontWeight = 'bold';
      label.style.fontSize = '18px';
      bar.appendChild(label);

      // Catégorie label
      const catLabel = document.createElement('div');
      catLabel.innerText = categorie;
      catLabel.style.color = '#fff';
      catLabel.style.fontSize = '12px';
      catLabel.style.marginTop = '5px';
      catLabel.style.textAlign = 'center';

      barGroup.appendChild(bar);
      barGroup.appendChild(catLabel);
    });

    // Potentiel label
    const potLabel = document.createElement('div');
    potLabel.innerText = `Potentiel ${potentiel}`;
    potLabel.style.color = '#fff';
    potLabel.style.fontWeight = 'bold';
    potLabel.style.marginTop = '10px';
    barGroup.appendChild(potLabel);

    chart.appendChild(barGroup);
  });

  element.appendChild(chart);
}

// Looker Studio API
const dscc = window.dscc;
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
