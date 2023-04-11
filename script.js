function search(query) {
	const url = `https://api.tvmaze.com/search/shows?q=${query}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => resultPrint(data));
}
function loadHome() {
	for (let i = 1; i < 101; i++) {
		let targetUrl = `https://api.tvmaze.com/shows/${i}`;
		fetch(targetUrl)
			.then((response) => response.json())
			.then((data) => renderElement(data));
	}
}
window.onload = () => {
	loadHome();
	const searchBar = document.getElementById('searchBar');
	searchBar.onkeyup = (event) => {
		search(searchBar.value);
	};
};
function renderElement(data) {
	const listH = document.getElementById('listH');
	let element = document.createElement('div');
	element.innerHTML = `
    <div class="card" onclick="window.location.href = '${data.url}';">
        <img src="${data.image.medium}"  alt="Movie Image">
        <div class="card-overlay">
          <h3 class="card-title">${data.name}</h3>
          <p class="card-desc">${data.summary}</p>
          <p class="card-duration">Duration: ${data.averageRuntime}</p>
          <p class="card-rating">Rating: ${data.rating.average}</p>
        </div>
    </div>`;
	element.style.display = 'flex';
	element.style.float = 'left';
	element.style.marginRight = '35px';
	element.style.cursor = 'pointer';
	listH.appendChild(element);
	// let element = document.createElement('div');
	// element.className = 'card';
	// let img = document.createElement('img');
	// img.src = data.image.medium;
	// element.appendChild(img);
	// let overlay = document.createElement('div');
	// overlay.className = 'card-overlay';
	// element.appendChild(overlay);

	// let sName = document.createElement('h3');
	// sName.className = 'card-title';
	// sName.innerText = data.name;
	// element.appendChild(sName);
	// let desc = document.createElement('p');
	// desc.className = 'card-desc';
	// desc.innerText = data.summary;
	// element.appendChild(desc);
	// let duration = document.createElement('p');
	// duration.className = 'card-duration';
	// duration.innerText = data.averageRuntime;
	// element.appendChild(duration);
	// let rating = document.createElement('p');
	// rating.className = 'card-rating';
	// rating.innerText = data.rating.average;
	// element.appendChild(rating);
	// list.appendChild(element);
}

function resultPrint(data) {
	const list = document.getElementById('list');
	let nameArr = data.map((element) => element.show.name);
	let imgArr = data.map((element) => element.show.image);
	let summaryArr = data.map((element) => element.show.summary);
	let ratingArr = data.map((element) => element.show.rating.average);
	let runtimeArr = data.map((element) => element.show.averageRuntime);
	let urlArr = data.map((element) => element.show.url);
	list.innerHTML = '';
	imgArr.forEach((image, i) => {
		// console.log(image);
		let element = document.createElement('div');
		element.style.display = 'flex';
		element.style.float = 'left';
		element.style.marginLeft = '10px';
		element.style.marginRight = '1rem';
		let img = document.createElement('img');
		img.src = image.medium;
		img.style.borderRadius = '10px';
		let title = document.createElement('p');
		title.innerText = nameArr[i];
		title.style.fontSize = '20px';
		title.style.alignSelf = 'center';

		const details = document.createElement('div');
		details.className = 'details';
		details.innerHTML = `
        <a id='headingMov' href=${urlArr[i]}>${nameArr[i]}</a>
        <p>${summaryArr[i]}</p>
        <p><b>Rating:</b> ${ratingArr[i]}</p>
        <p><b>Duration:</b> ${runtimeArr[i]} min</p>
    `;
		element.style.marginBottom = '30px';
		details.style.margin = '20px';
		details.style.display = 'inline';
		element.appendChild(img);
		element.appendChild(details);
		list.appendChild(element);
	});
}
