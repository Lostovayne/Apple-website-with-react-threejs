import {
	blackImg,
	blueImg,
	highlightFirstVideo,
	highlightFourthVideo,
	highlightSecondVideo,
	highlightThirdVideo,
	whiteImg,
	yellowImg
} from "../utils";

export const navLists = ["Store", "Mac", "iPhone", "Support"];

export const hightlightsSlides = [
	{
		id: 1,
		textLists: ["The first iPhone", "Designed with Apple Intelligence in mind", "Personal, private and powerful."],
		video: highlightFirstVideo,
		videoDuration: 5
	},
	{
		id: 2,
		textLists: ["New Camera Control", "Your talent flows like never before"],
		video: highlightSecondVideo,
		videoDuration: 5
	},
	{
		id: 3,
		textLists: ["4K Dolby Vision at 120 fps", "4 pro level microphones", "A studio in your pocket"],
		video: highlightThirdVideo,
		videoDuration: 5
	},
	{
		id: 4,
		textLists: ["The new A18 Pro chip has", "unstoppable performance and", "unmatched intelligence"],
		video: highlightFourthVideo,
		videoDuration: 5
	}
];

export const models = [
	{
		id: 1,
		title: "iPhone 15 Pro in Natural Titanium",
		color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
		img: yellowImg
	},
	{
		id: 2,
		title: "iPhone 15 Pro in Blue Titanium",
		color: ["#53596E", "#6395ff", "#21242e"],
		img: blueImg
	},
	{
		id: 3,
		title: "iPhone 15 Pro in White Titanium",
		color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
		img: whiteImg
	},
	{
		id: 4,
		title: "iPhone 15 Pro in Black Titanium",
		color: ["#454749", "#3b3b3b", "#181819"],
		img: blackImg
	}
];

export const sizes = [
	{ label: '6.1"', value: "small" },
	{ label: '6.7"', value: "large" }
];

export const footerLinks = ["Privacy Policy", "Terms of Use", "Sales Policy", "Legal", "Site Map"];
