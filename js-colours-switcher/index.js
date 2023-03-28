// function generateRandomColor() {
//   const hexCodes = '0123456789ABCDEF';
//   let color = '';
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return '#' + color;
// }

const collum = document.querySelectorAll('.collum');

document.addEventListener('keydown', changeColorBySpace);
document.addEventListener('click', lockColor);

function changeColorBySpace(event) {
  event.preventDefault();
  if (event.code.toLocaleLowerCase() === 'space') {
    setRandomColor();
  }
}

function lockColor(event) {
  const type = event.target.dataset.type;

  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClick(event.target.textContent);
  }
}

function copyToClick(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColor(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  collum.forEach((coll, index) => {
    const isLocked = coll.querySelector('i').classList.contains('fa-lock');

    const text = coll.querySelector('h2');
    const button = coll.querySelector('button');

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial ? (colors[index] ? colors[index] : chroma.random()) : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    coll.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map(col => {
      return col.toString().substring(1);
    })
    .join('-');
}

function getColorsFromHash(params) {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map(color => '#' + color);
  }
  return [];
}

setRandomColor(true);
