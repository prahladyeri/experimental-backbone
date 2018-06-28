/* Business Logic */
var redRoses = new SingleFlower({
	name: "Red Roses",
	price: 39.1,
	color: "Red",
	img: "img/redRoses.jpg",
	link: "redRose"
});

var rainbowRoses = new SingleFlower({
	name: "Rainbow Roses",
	price: 39.9,
	color: "orange",
	link: "rainbowRose"
});

var heirloomRoses = new SingleFlower({
	name: "Heirloom Roses",
	price: 19.9,
	img: "img/heirloomRoses.jpg",
	link: "heirloomRose"
});

console.log(redRoses.toJSON());
console.log(rainbowRoses.toJSON());
console.log(heirloomRoses.toJSON());

