function search(query) {
	const url = `https://api.tvmaze.com/search/shows?q=${query}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => resultPrint(data));
}
window.onload = () => {
	const searchBar = document.getElementById('searchBar');
	searchBar.onkeyup = (event) => {
		search(searchBar.value);
	};
};

async function call(params) {}
function resultPrint(data) {
	let nameArr = data.map((element) => element.show.name);
	let imgArr = data.map((element) => element.show.image);
	let summaryArr = data.map((element) => element.show.summary);
	let ratingArr = data.map((element) => element.show.rating.average);
	let runtimeArr = data.map((element) => element.show.averageRuntime);
	let urlArr = data.map((element) => element.show.url);
	const list = document.getElementById('list');
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
