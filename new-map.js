const animateMap = () => {
  const map = document.getElementById('new-map-svg');
  if (!map) return;
  const timer =  map.dataset.autoplay;
  const arrZone = map.querySelectorAll('[id^="zone-"]');
  let zoneActive = 0;
  let timeOutId = null;
  const toogleZone = (num) => {
    arrZone[num].classList.add('is-active');
    timeOutId = setTimeout(()=> {
      arrZone[num].classList.remove('is-active');
      if (zoneActive < arrZone.length - 1) {
        zoneActive++;
      } else {
        zoneActive = 0;
      }
      toogleZone(zoneActive)
    }, timer);
  }
  toogleZone(zoneActive)
  map.addEventListener('mouseenter', () => {
    arrZone[zoneActive].classList.remove('is-active');
    clearTimeout(timeOutId)
  })
  map.addEventListener('mouseleave', () => {
    toogleZone(zoneActive)
  })
  arrZone.forEach(zone => {
    zone.querySelector('.contour').addEventListener('mouseenter', () => {
      zone.classList.add('is-active');
      arrZone.forEach(z => {
        if (z != zone ){
          z.classList.add('is-hide');
        }
      })
    })
    zone.addEventListener('mouseleave', () => {
      zone.classList.remove('is-active');
      arrZone.forEach(z => {
          z.classList.remove('is-hide');
      })
    })
  })
}
document.addEventListener("DOMContentLoaded", function(event) {
  animateMap()
});
