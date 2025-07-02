function parseInput(inputStr) {
  const cleaned = inputStr.replace(/[{}()\s]/g, '');
  const pairs = cleaned.split(',').reduce((acc, val, i, arr) => {
    if (i % 2 === 0) acc.push([val, arr[i + 1]]);
    return acc;
  }, []);
  return pairs.map(([a, b]) => [parseInt(a), parseInt(b)]);
}

function getElementsFromPairs(pairs) {
  const elements = new Set();
  pairs.forEach(([a, b]) => {
    elements.add(a);
    elements.add(b);
  });
  return Array.from(elements);
}

function isReflexive(pairs, elements) {
  return elements.every(e => pairs.some(([a, b]) => a === e && b === e));
}

function isSymmetric(pairs) {
  return pairs.every(([a, b]) => {
    return pairs.some(([x, y]) => x === b && y === a);
  });
}

function isTransitive(pairs) {
  const hasPair = (a, b) => pairs.some(([x, y]) => x === a && y === b);
  for (let [a, b] of pairs) {
    for (let [c, d] of pairs) {
      if (b === c && !hasPair(a, d)) {
        return false;
      }
    }
  }
  return true;
}

function checkProperties() {
  const input = document.getElementById('relationInput').value;
  const pairs = parseInput(input);
  const elements = getElementsFromPairs(pairs);

  const reflexive = isReflexive(pairs, elements);
  const symmetric = isSymmetric(pairs);
  const transitive = isTransitive(pairs);

  const output = `
    <p>Reflexive: ${reflexive ? '✅' : '❌'}</p>
    <p>Symmetric: ${symmetric ? '✅' : '❌'}</p>
    <p>Transitive: ${transitive ? '✅' : '❌'}</p>
  `;
  document.getElementById('resultsOutput').innerHTML = output;
}
function getReflexiveClosure(pairs, elements) {
  const closure = [...pairs];
  elements.forEach(e => {
    if (!closure.some(([a, b]) => a === e && b === e)) {
      closure.push([e, e]);
    }
  });
  return closure;
}

function getSymmetricClosure(pairs) {
  const closure = [...pairs];
  pairs.forEach(([a, b]) => {
    if (!closure.some(([x, y]) => x === b && y === a)) {
      closure.push([b, a]);
    }
  });
  return closure;
}

function getTransitiveClosure(pairs) {
  let closure = [...pairs];
  let added;
  do {
    added = false;
    for (let [a, b] of closure) {
      for (let [c, d] of closure) {
        if (b === c && !closure.some(([x, y]) => x === a && y === d)) {
          closure.push([a, d]);
          added = true;
        }
      }
    }
  } while (added);
  return closure;
}

function formatSet(pairs) {
  return `{ ${pairs.map(([a, b]) => `(${a},${b})`).join(', ')} }`;
}

// Placeholder for later
function generateClosures() {
  const input = document.getElementById('relationInput').value;
  const pairs = parseInput(input);
  const elements = getElementsFromPairs(pairs);

  const reflexiveClosure = getReflexiveClosure(pairs, elements);
  const symmetricClosure = getSymmetricClosure(pairs);
  const transitiveClosure = getTransitiveClosure(pairs);

  const output = `
    <p><strong>Reflexive Closure:</strong> ${formatSet(reflexiveClosure)}</p>
    <p><strong>Symmetric Closure:</strong> ${formatSet(symmetricClosure)}</p>
    <p><strong>Transitive Closure:</strong> ${formatSet(transitiveClosure)}</p>
  `;

  document.getElementById('resultsOutput').innerHTML = output;
}
