// components/TreatOurTeam.js
import React from "react";
import Heading from "../Components/Heading";
import ProfileCard from "./ProfileCard";

function TreatOurTeam() {
  const teamMembers = [
    {
      name: "Jalak Behera",
      role: "Chef",
      imgSrc: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      name: "Jalak Behera",
      role: "Chef",
      imgSrc: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    {
      name: "Jalak Behera",
      role: "Chef",
      imgSrc: "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    },
    
  ];

  return (
    <main>
        <h1 className="text-4xl font-bold text-center mb-8">
          Our Team
        </h1>
        <div className="grid grid-cols-3 gap-2 px-2 relative">
          {teamMembers.map((member,i) => (
            <ProfileCard key={i} member={member}/>
          ))}
        </div>
      
    </main>
  );
}

export default TreatOurTeam;
