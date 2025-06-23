import React from 'react';


export interface CityInfo {
  id: string;
  name: string;
  imageSrc: string;
  link: string;
}

interface CityCommunitySectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  cities: CityInfo[];
}

const CityCommunitySection: React.FC<CityCommunitySectionProps> = ({ sectionTitle, sectionSubtitle, cities }) => {
  return (
    <section id="city-community" className="bg-black">
      <div className="text-center py-16 md:py-24 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{sectionTitle}</h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">{sectionSubtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <a key={city.id} href={city.link} target="_blank" rel="noopener noreferrer" className="relative group">
            <img src={city.imageSrc} alt={city.name} className="w-full h-auto" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default CityCommunitySection;
