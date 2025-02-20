import { Dice5, Users, Trophy, Zap } from "lucide-react";
import Button from "./ui/Button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-purple-900">
              Play Ludo Online with Friends
            </h1>
            <p className="text-xl text-gray-600">
              Experience the classic board game in a whole new way. Challenge
              friends, compete with players worldwide, and climb the
              leaderboard!
            </p>
            <div className="flex gap-4">
              <Button
                text="Play Now"
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
              />

              <Button
                text="Learn Rules"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 
                rounded-full font-semibold hover:bg-purple-50 transition-colors"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80"
              alt="Ludo Board"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Why Play With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8 text-purple-600" />}
              title="Multiplayer"
              description="Play with friends or match with players worldwide"
            />
            <FeatureCard
              icon={<Dice5 className="w-8 h-8 text-purple-600" />}
              title="Classic Rules"
              description="Enjoy the traditional Ludo experience you know and love"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8 text-purple-600" />}
              title="Tournaments"
              description="Compete in daily tournaments and win exciting prizes"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-purple-600" />}
              title="Quick Games"
              description="Fast-paced matches perfect for quick gaming sessions"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-purple-900 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Roll the Dice?
          </h2>
          <p className="text-purple-100 text-xl mb-8 max-w-2xl mx-auto">
            Join millions of players worldwide and experience the joy of Ludo
            online. Create your account now and start playing!
          </p>
          <Button
            className="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold 
            hover:bg-purple-50 transition-colors text-lg"
            text="Create Free Account"
          />
        </div>
      </div>
    </div>
  );
};

interface IFeatureCard {
  icon: any;
  title: string;
  description: string;
}
function FeatureCard({ icon, title, description }: IFeatureCard) {
  return (
    <div className="bg-purple-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage
