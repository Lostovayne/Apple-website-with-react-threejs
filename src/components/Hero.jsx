import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { heroVideo, smallHeroVideo } from "@/utils";
import { useEffect } from "react";

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
				<p id="hero" className="hero-title">
					iPhone 15 Pro
				</p>
				<div className="md:w-10/12 w-9/12">
					<video autoPlay muted key={videoSrc} playsInline className="pointer-events-none">
						<source src={videoSrc} type="video/webm" />
					</video>
				</div>
			</div>
			<div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
				<a href="#highlights" className="btn">
					Buy
				</a>
				<p className="font-normal text-xl">From $199/month or $999</p>
			</div>
		</section>
	);
};
