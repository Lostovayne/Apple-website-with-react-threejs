import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Navbar } from "./components/Navbar";

function App() {
	return (
		<main className="bg-black min-h-lvh md:min-h-dvh">
			<Navbar />
			<Hero />
			<Highlights />
		</main>
	);
}

export default App;
