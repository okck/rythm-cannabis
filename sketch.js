// https://docs.google.com/spreadsheets/d/1r2zMwTq1M4pom3TEXWgUoW0CDnPm-0TyQgbNB-9zirU/edit?usp=sharing

let sheetID = '1r2zMwTq1M4pom3TEXWgUoW0CDnPm-0TyQgbNB-9zirU';
let tabName = 'Sheet1';
let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

let logo = document.getElementById('logo');
let form = document.getElementById('form');
let select = document.getElementById('sort');
let indica = document.getElementById('indica');
let hybrid = document.getElementById('hybrid');
let sativa = document.getElementById('sativa');
let grid = document.getElementById('grid');
let gallery = document.getElementById('gallery');

let gridSlider = document.getElementById('gridSlider');
let gallerySlider = document.getElementById('gallerySlider');


let mockupsContainer = document.getElementById('mockupsContainer');
let labelGalleryContainer = document.getElementById('labelGalleryContainer');
let labelgridContainer = document.getElementById('labelGridContainer');
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', renderAll);
logo.addEventListener('click', function() {
  window.location.reload();
});

fetch(opensheet_uri)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    // console.log(data);
    let dataArr = [];
    let counter = 1;
    let counterdiv;
    for (let datapoint of data) {
      let dataName = datapoint.Name;
      let dataNoiseMax = parseFloat(datapoint.noiseMax);
      let dataTotalTHC = parseFloat(datapoint.TotalTHC);
      let dataImgMock = datapoint.IMG_mock_600;
      let dataImgLabel = datapoint.IMG_label;
      // let dataTerpines = datapoint.Terpines;
      // let dataAroma = datapoint.Aroma;

      dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, counter]);
      // dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, dataTerpines, dataAroma]);
      if (counter <= 9) {
        counterdiv = `<div>0${counter}</div>`;
      } else {
        counterdiv = `<div>${counter}</div>`;
      }

      let mockup = document.createElement('div');
      mockup.classList.add('mockup');
      mockup.classList.add('swiper-slide');
      mockup.innerHTML = `<img src=images/${dataImgMock}.png>${counterdiv}`;
      mockupsContainer.appendChild(mockup);
      counter++;
    }
  })
  .then(function() {
    let swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      // slidesPerView: 1,
      spaceBetween: 50,
      // Optional parameters
      loop: true,
      
      // autoplay: {
      //   // delay: 3200,
      //   delay: 3000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },
      initialSlide: 0 - 1,
      // initialSlide: -1,
      mousewheel: true,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
})
.catch(function (err) {
    console.log("Something went wrong!", err);
});







function renderAll() {
  fetch(opensheet_uri)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data);

      switch(select.value) {
        case '1':
          // sortByTHC(data);
          document.querySelector('.select-selected').style.backgroundColor = 'rgb(255, 0, 255)';
          break;
        case '2':
          document.querySelector('.select-selected').style.backgroundColor = 'transparent';
          sortByMaxTHC(data);
          break;
        case '3':
          document.querySelector('.select-selected').style.backgroundColor = 'transparent';
          sortByTHC(data);
          break;
        case '4':
          document.querySelector('.select-selected').style.backgroundColor = 'transparent';
          sortByNoiseMax(data);
          break;
        case'5':
        document.querySelector('.select-selected').style.backgroundColor = 'transparent';
          sortByMaxNoiseMax(data);
        }

      getRenderData(sortedArray);
      if (form.elements["display"].value == 'gallery' && select.value != '1') {

        let val = gallerySlider.value;
        gallerySlider.style.backgroundSize = (val - 200) * 100 / (500 - 200) + '% 100%';

        renderLabelGallery(dataArr);
        document.getElementById('galleryContainer').style.display = 'none';
        document.body.style.background = 'rgb(0, 0, 0)';
        document.getElementById('gallerySlider').style.display = 'block';

        document.querySelector('.label-grid-container-wrapper').style.display = 'none';
        document.querySelector('.label-gallery-container-wrapper').style.display = 'grid';
        
        document.querySelector('.header').style.background = 'linear-gradient( black,rgba(0, 0, 0, 0))';
        grid.style.border = '5px solid rgb(0, 0, 0)';
        gallery.style.border = '5px solid rgb(0, 0, 0)';
        indica.style.border = '5px solid rgb(0, 0, 0)';
        hybrid.style.border = '5px solid rgb(0, 0, 0)';
        sativa.style.border = '5px solid rgb(0, 0, 0)';

        let labelGalleries = document.querySelectorAll('.label-gallery-img');
        labelGalleries.forEach((labelGallery) => {
          labelGallery.style.width = `${val}px`;
        });
      };
      if (form.elements["display"].value == 'grid' && select.value != '1') {

        let val = gridSlider.value;
        gridSlider.style.backgroundSize = (val - 10) * 100 / (20 - 10) + '% 100%';

        renderLabelGrid(dataArr);
        document.getElementById('galleryContainer').style.display = 'none';
        document.body.style.background = 'rgb(0, 0, 0)';
        document.getElementById('gridSlider').style.display = 'block';

        document.querySelector('.label-gallery-container-wrapper').style.display = 'none';
        document.querySelector('.label-grid-container-wrapper').style.display = 'block';

        document.querySelector('.header').style.background = 'linear-gradient( black,rgba(0, 0, 0, 0))';
        grid.style.border = '5px solid rgb(0, 0, 0)';
        gallery.style.border = '5px solid rgb(0, 0, 0)';
        indica.style.border = '5px solid rgb(0, 0, 0)';
        hybrid.style.border = '5px solid rgb(0, 0, 0)';
        sativa.style.border = '5px solid rgb(0, 0, 0)';

        let labelGrids = document.querySelectorAll('.label-grid');
        labelGrids.forEach((labelGrid) => {
          labelGrid.style.width = `${val}%`;
        });
      };
    })
  .catch(function (err) {
      console.log("Something went wrong!", err);
  });
}



// sort by THC - lo to hi
function sortByTHC(data) {
  sortedArray = [];
  for (let strain of data) {
    sortedArray.push([strain.Name, parseFloat(strain.TotalTHC), parseFloat(strain.noiseMax), strain.IMG_mock_600, strain.IMG_label, strain.Strain]);
  }

  sortedArray.sort(function(a, b) {
    return a[1] - b[1];
  });
}
// sort by THC - hi to lo
function sortByMaxTHC(data) {
  sortedArray = [];
  for (let strain of data) {
    sortedArray.push([strain.Name, parseFloat(strain.TotalTHC), parseFloat(strain.noiseMax), strain.IMG_mock_600, strain.IMG_label, strain.Strain]);
  }

  sortedArray.sort(function(a, b) {
    return a[1] - b[1];
  });
  return sortedArray.reverse();
}
// sort by noiseMax - lo to hi
function sortByNoiseMax(data) {
  sortedArray = [];
  for (let strain of data) {
    sortedArray.push([strain.Name, parseFloat(strain.noiseMax), parseFloat(strain.TotalTHC), strain.IMG_mock_600, strain.IMG_label, strain.Strain]);
  }
  
  sortedArray.sort(function(a, b) {
    return a[1] - b[1];
  });
}
// sort by noiseMax - hi to lo
function sortByMaxNoiseMax(data) {
  sortedArray = [];
  for (let strain of data) {
    sortedArray.push([strain.Name, parseFloat(strain.noiseMax), parseFloat(strain.TotalTHC), strain.IMG_mock_600, strain.IMG_label, strain.Strain]);
  }
  
  sortedArray.sort(function(a, b) {
    return a[1] - b[1];
  });
  return sortedArray.reverse();
}
// get array to render
function getRenderData(sortedArray) {
  document.getElementById('mockupsContainer').innerHTML = '';
  dataArr = [];
  let counter = 1;
  // let counterdiv;
  for (let datapoint of sortedArray) {
    let dataName = datapoint[0];

    if (select.value === '2' || select.value === '3') {
      dataNoiseMax = parseFloat(datapoint[2]);
      dataTotalTHC = parseFloat(datapoint[1]);
    } else if (select.value === '4' || select.value === '5') {
      dataNoiseMax = parseFloat(datapoint[1]);
      dataTotalTHC = parseFloat(datapoint[2]);
    }

    let strain = datapoint[5];
    let dataImgMock = datapoint[3];
    let dataImgLabel = datapoint[4];

    // let dataTerpines = datapoint.Terpines;
    // let dataAroma = datapoint.Aroma;

    // dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, counter, strain]);
    // dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, dataTerpines, dataAroma]);



    if (indica.checked == true && strain == 'Indica') {
      console.log('yes indica');
      dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, dataImgLabel, counter]);
      console.log(counter);
      counter++;
    }
    if (hybrid.checked == true && strain == 'Hybrid') {
      console.log('yes hybrid');
      dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, dataImgLabel, counter]);
      console.log(counter);
      counter++;
    }
    if (sativa.checked == true && strain == 'Sativa') {
      console.log('yes sativa');
      dataArr.push([dataName, dataNoiseMax, dataTotalTHC, dataImgMock, dataImgLabel, counter]);
      console.log(counter);
      counter++;
    }
  }
}

function renderLabelGallery(dataArr) {
  labelGalleryContainer.innerHTML = '';
  for (let datapoint of dataArr) {
    if (datapoint[5] <= 9) {
      counterdiv = `<div>0${datapoint[5]}</div>`;
    } else {
      counterdiv = `<div>${datapoint[5]}</div>`;
    }

    let label = document.createElement('div');
    label.classList.add('label-gallery');
    label.innerHTML = `<img src=images/${datapoint[4]}.png class="label-gallery-img">${counterdiv}`;

    labelGalleryContainer.appendChild(label);
  }
}
function renderLabelGrid(dataArr) {
  labelGridContainer.innerHTML = '';
  for (let datapoint of dataArr) {
    if (datapoint[5] <= 9) {
      counterdiv = `<div>0${datapoint[5]}</div>`;
    } else {
      counterdiv = `<div>${datapoint[5]}</div>`;
    }

    let label = document.createElement('div');
    label.classList.add('label-grid');
    label.innerHTML = `<img src=images/${datapoint[4]}.png>${counterdiv}`;

    labelGridContainer.appendChild(label);
  }
}

function inputChangeGrid(e) {
  let target = e.target;
  console.log(target.value);

  // labelgridContainer.style.width = `${target.value}%`;
  let labelGrids = document.querySelectorAll('.label-grid');
  labelGrids.forEach((labelGrid) => {
    labelGrid.style.width = `${target.value}%`;
  });
  
  if (e.target.type !== 'range') {
    target = document.getElementById('gridSlider')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}
gridSlider.addEventListener('input', inputChangeGrid);

function inputChangeGallery(e) {
  let target = e.target;
  console.log(target.value);

  // labelgridContainer.style.width = `${target.value}%`;
  let labelGalleries = document.querySelectorAll('.label-gallery-img');
  labelGalleries.forEach((labelGallery) => {
    labelGallery.style.width = `${target.value}px`;
  });
  
  if (e.target.type !== 'range') {
    target = document.getElementById('gridSlider')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}
gallerySlider.addEventListener('input', inputChangeGallery);