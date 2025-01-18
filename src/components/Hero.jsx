import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { heroVideo, smallHeroVideo } from "@/utils";
import { useEffect } from "react";

export const Hero = () => {
	const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo);

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
		gsap.to("#hero", {
			opacity: 1,
			duration: 1,
			ease: "power1.inOut"
		});
	}, []);

	return (
		<section className="w-full nav-height bg-black relative">
			<div className="h-5/6 w-gull flex-center flex-col">
				<p id="hero" className="hero-title">
					iPhone 15 Pro
				</p>
				<div className="md:w-10/12 w-9/12">
					<video autoPlay muted className="w-full">
						<source src={videoSrc} type="video/webm" />
					</video>
				</div>
			</div>
			<div id="cta" className="flex flex-col items-center opacity-0 translate-y-20" />
		</section>
	);
};
