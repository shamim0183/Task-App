import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/TaskBoard";
import { TaskProvider } from "./context/TaskContext";

function App() {

  return (
    <TaskProvider>
      <div className="bg-[#191D26] font-[Inter] text-white">
        <Header />
        <HeroSection />
        <TaskBoard />
        <Footer />
      </div>
    </TaskProvider>
  );
}

export default App;
