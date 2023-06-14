import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import { config } from "../config/config";
import { state } from "../store";

import { download } from "../assets";

import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import { Tab } from "../Components/Tab";
import { CustomButton } from "../Components/CustomButton";
import { ColorPicker } from "../Components/ColorPicker";
import { FilePicker } from "../Components/FilePicker";
import { AIPicker } from "../Components/AIPicker";

export const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilerTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShort: false,
  });

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // handle submit
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");
    try {
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  // handle Decals
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilerTab.FilterTabs[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  // handle active filter tab
  const handleActiveFilterTab = (tabname) => {
    switch (tabname) {
      case "logoShirt":
        state.isLogoTexture = !activeFilerTab[tabname];
        break;
      case "stylishShort":
        state.isFullTexture = !activeFilerTab[tabname];
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabname]: !prevState[tabname],
      };
    });
  };
  // read file
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilerTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
