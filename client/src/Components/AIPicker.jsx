import { CustomButton } from "./CustomButton";

export const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        rows={5}
        placeholder="Ask AI ..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title={"Ask AI ..."}
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type={"outline"}
              title={"AI Logo"}
              handleClick={() => handleSubmit("logo")}
              customStyles={"text-xs"}
            />

            <CustomButton
              type={"full"}
              title={"AI Full"}
              handleClick={() => handleSubmit("full")}
              customStyles={"text-xs"}
            />
          </>
        )}
      </div>
    </div>
  );
};
