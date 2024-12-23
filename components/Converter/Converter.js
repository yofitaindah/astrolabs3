const renderHTML = (htmlString) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

// Function to handle lists (bulleted/numbered)
const renderList = (text) => {
  if (text === null) {
    throw new Error("Text cannot be null");
  }
  const lines = text.split("\n");
  if (lines === null) {
    throw new Error("Lines cannot be null");
  }
  const isBulleted = lines.some((line) => line.startsWith("- ") || line.startsWith("* "));
  if (isBulleted === null) {
    throw new Error("IsBulleted cannot be null");
  }
  const listItems = lines.filter((line) => line.trim() !== "").map((line) => line.trim());
  if (listItems === null) {
    throw new Error("ListItems cannot be null");
  }
  return isBulleted ? (
    <ul>{listItems.map((item, index) => <li key={index}>{item}</li>)}</ul>
  ) : (
    <ol>{listItems.map((item, index) => <li key={index}>{item}</li>)}</ol>
  );
};

// Function to check if the response is a code block (HTML, CSS, JS)
const isCodeBlock = (text) => {
  return (
    text !== null &&
    typeof text === "string" &&
    (text.includes("<pre><code>") || text.includes("```"))
  );
};

export { renderHTML, renderList, isCodeBlock };
