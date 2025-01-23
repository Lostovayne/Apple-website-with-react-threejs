/* eslint-disable react-compiler/react-compiler */
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import playImg from "/assets/images/play.svg";
import pauseImg from "/assets/images/pause.svg";
import replayImg from "/assets/images/replay.svg";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "../hooks/use-mobile";

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const VideoCarousel = () => {
	const videoRef = useRef([]);
	const videoSpanRef = useRef([]);
	const videoDivRef = useRef([]);
	const isMobile = useIsMobile();
	const [video, setVideo] = useState({
		isEnd: false,
		startPlay: false,
		videoId: 0,
		isLastVideo: false,
		isPlaying: false
	});
	const [loadedData, setLoadedData] = useState([]);
	const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

	useGSAP(() => {
		gsap.to("#slider", { transform: `translateX(${-100 * videoId}%)`, duration: 1.5, ease: "power1.inOut" });
		gsap.to("#video", {
			scrollTrigger: { trigger: "#video", toggleActions: "restart none none none" },
			onComplete: () => {
				setVideo((pre) => ({ ...pre, startPlay: true, isPlaying: true }));
			}
		});
	}, [isEnd, videoId]);

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				videoRef.current[videoId].pause();
			} else {
				startPlay && videoRef.current[videoId].play();
			}
		}
	}, [startPlay, videoId, isPlaying, loadedData]);

	const handleLoadedMetadata = (i, e) => {
		setLoadedData((preData) => [...preData, e]);
	};

	useEffect(() => {
		let currentProgress = 0;
		let span = videoSpanRef.current;

		if (span[videoId]) {
			// animate the progress bar
			let anim = gsap.to(span[videoId], {
				onUpdate: () => {
					const progress = Math.ceil(anim.progress() * 100);
					if (progress != currentProgress) {
						currentProgress = progress;
						gsap.to(videoDivRef.current[videoId], { width: isMobile ? "10vw" : "4vw" });
						gsap.to(span[videoId], { width: `${currentProgress}%`, backgroundColor: "white" });
					}
				},
				onComplete: () => {
					if (isPlaying) {
						gsap.to(videoDivRef.current[videoId], { width: "12px" });
						gsap.to(span[videoId], { backgroundColor: "#afafaf" });
					}
				}
			});

			if (videoId === 0) {
				anim.restart();
			}

			const animateUpdate = () => anim.progress(videoRef.current[videoId].currentTime / videoRef.current[videoId].duration);
			isPlaying ? gsap.ticker.add(animateUpdate) : gsap.ticker.remove(animateUpdate);
		}
	}, [videoId, startPlay, isMobile]);

	const handleProcess = (type, i) => {
		switch (type) {
			case "video-end":
				setVideo((pre) => ({
					...pre,
					isEnd: true,
					videoId: i + 1
				}));
				break;

			case "video-last":
				setVideo((pre) => ({
					...pre,
					isLastVideo: true
				}));
				break;
			case "video-reset":
				setVideo((pre) => ({
					...pre,
					isLastVideo: false,
					videoId: 0
				}));
				break;
			case "play":
				setVideo((pre) => ({
					...pre,
					isPlaying: !pre.isPlaying
				}));
				break;
			default:
				return video;
		}
	};

	return (
		<>
			<div className="flex items-center">
				{hightlightsSlides.map((list, i) => (
					<div className=" pr-3 md:pr-6" id="slider" key={list.id}>
						<div className="video-carousel_container">
							<div className="size-full flex-center rounded-3xl overflow-hidden bg-black">
								<video
									ref={(el) => (videoRef.current[i] = el)}
									id="video"
									playsInline={true}
									preload="auto"
									muted
									className="object-cover size-full"
									onEnded={() => (i !== 3 ? handleProcess("video-end", i) : handleProcess("video-last"))}
									onPlay={() => {
										setVideo((preVideo) => ({
											...preVideo,
											isPlaying: true
										}));
									}}
									onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}>
									<source src={list.video} type="video/mp4" />
								</video>
							</div>

							<div className="absolute top-8 md:top-12 left-[5%] z-10 ">
								{list.textLists.map((text, index) => (
									<p key={index} className="text-white text-sm sm:text-lg md:text-2xl 2xl:text-3xl md:font-semibold">
										{text}
									</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="relative flex-center mt-10">
				<div className="flex-center py-4 md:py-5 px-5 md:px-7 bg-gray-300 backdrop-blur-sm rounded-full">
					{videoRef.current.map(
						(
							_,
							i // Verifica si videoRef.current está definido
						) => (
							<span
								key={i}
								ref={(el) => (videoDivRef.current[i] = el)}
								className="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer">
								<span className="absolute size-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
							</span>
						)
					)}
				</div>
				<button className=" max-sm:p-3 control-btn">
					<img
						src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
						alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
						onClick={
							isLastVideo
								? () => handleProcess("video-reset")
								: !isPlaying
								? () => handleProcess("play")
								: () => handleProcess("pause")
						}
						className="max-sm:size-5"
					/>
				</button>
			</div>
		</>
	);
};
