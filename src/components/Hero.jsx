import { heroVideo, smallHeroVideo } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

export const Hero = () => {
	const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo);

	/**
	 * Sets the video source based on the window's inner width.
	 * If the window's inner width is less than 768, sets the video source to smallHeroVideo.
	 * If the window's inner width is greater than or equal to 768, sets the video source to heroVideo.
	 */
	const handleVideoSrcSet = () => {
		if (window.innerWidth < 768) {
			setVideoSrc(smallHeroVideo);
		} else {
			setVideoSrc(heroVideo);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleVideoSrcSet);
		return () => {
			window.removeEventListener("resize", handleVideoSrcSet);
		};
	}, []);

	useGSAP(() => {
		gsap.to("#hero", { opacity: 1, delay: 2, ease: "power1.inOut" });
		gsap.to("#cta", { opacity: 1, y: -50, delay: 2, ease: "power1.inOut" });
	}, []);

	return (
		<section className="w-full nav-height bg-black relative">
			<div className="h-5/6 w-gull flex-center flex-col">
				<p id="hero" className="hero-title min-2xl:mb-20 min-2xl:text-6xl">
					iPhone 15 Pro
				</p>
				<div className="w-10/12 h-auto mx-auto ">
					<video autoPlay muted key={videoSrc} playsInline={true} className=" object-cover pointer-events-none mx-auto ">
						<source src={videoSrc} type="video/mp4" />
					</video>
				</div>
			</div>
			<div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
				<a href="#highlights" className="btn min-2xl:text-6xl min-2xl:py-5 min-2xl:px-10 min-2xl:rounded-full">
					Buy
				</a>
				<p className="font-normal text-xl min-2xl:text-6xl">From $199/month or $999</p>
			</div>
		</section>
	);
};
