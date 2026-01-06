import React, { useState } from "react";
import Layout from "@theme/Layout";
import SkillBrowser from "@site/src/components/SkillBrowser";
import HubHero from "@site/src/components/HubHero";

export default function Hub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <Layout
      title="Best Practices Hub"
      description="Modernizing engineering through the automated infusion of best practices"
    >
      <HubHero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <div id="hub-content" style={{ paddingTop: isSearchActive ? "0" : undefined }}>
        <SkillBrowser
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isSearchActive={isSearchActive}
        />
      </div>
    </Layout>
  );
}
